// Minimal Yahoo Finance client: daily candles, analyst/fundamental summary and symbol search.
// No API key. `chart` and `search` are open; `quoteSummary` needs a cookie + crumb, which
// this fetches and caches. `fetchImpl` is injectable so tests never touch the network.

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
const TIMEOUT_MS = 12_000
const CRUMB_TTL_MS = 60 * 60 * 1000

export class YahooError extends Error {
  constructor(message, { status, symbol } = {}) {
    super(message)
    this.name = 'YahooError'
    this.status = status
    this.symbol = symbol
  }
}

const SYMBOL = /^[A-Za-z0-9.\-^=]{1,15}$/
export function normalizeSymbol(input) {
  const s = String(input ?? '').trim().toUpperCase()
  if (!SYMBOL.test(s)) throw new YahooError(`"${input}" does not look like a ticker`, { status: 400 })
  return s
}

export function createYahoo({ fetchImpl = fetch, now = () => Date.now() } = {}) {
  let session = null // { crumb, cookie, at }

  async function get(url, { headers = {}, retries = 1 } = {}) {
    for (let attempt = 0; ; attempt++) {
      const res = await fetchImpl(url, { headers: { 'User-Agent': UA, Accept: '*/*', ...headers }, signal: AbortSignal.timeout(TIMEOUT_MS) })
      if (res.status === 429 && attempt < retries) {
        await new Promise(r => setTimeout(r, 800 * (attempt + 1)))
        continue
      }
      return res
    }
  }

  async function getSession(force = false) {
    if (!force && session && now() - session.at < CRUMB_TTL_MS) return session
    const home = await get('https://fc.yahoo.com', { retries: 0 }) // answers 404 but sets the cookie
    const cookie = (home.headers.getSetCookie?.() ?? []).map(c => c.split(';')[0]).join('; ')
    const res = await get('https://query1.finance.yahoo.com/v1/test/getcrumb', { headers: { Cookie: cookie } })
    const crumb = (await res.text()).trim()
    if (!res.ok || !crumb || crumb.includes('<')) throw new YahooError('could not get a Yahoo crumb', { status: res.status })
    session = { crumb, cookie, at: now() }
    return session
  }

  async function chart(symbol, { range = '2y' } = {}) {
    const sym = normalizeSymbol(symbol)
    const res = await get(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?range=${range}&interval=1d&includePrePost=false`)
    if (res.status === 404) throw new YahooError(`Yahoo has no data for ${sym}`, { status: 404, symbol: sym })
    if (!res.ok) throw new YahooError(`Yahoo chart ${res.status} for ${sym}`, { status: res.status, symbol: sym })
    const json = await res.json()
    const result = json?.chart?.result?.[0]
    if (!result?.timestamp) throw new YahooError(`Yahoo has no price history for ${sym}`, { status: 404, symbol: sym })
    const q = result.indicators.quote[0]
    const candles = []
    result.timestamp.forEach((t, i) => {
      // Yahoo returns nulls for halted or partial days.
      if ([q.open[i], q.high[i], q.low[i], q.close[i]].some(x => x == null)) return
      candles.push({ t, o: q.open[i], h: q.high[i], l: q.low[i], c: q.close[i], v: q.volume[i] ?? 0 })
    })
    return { symbol: sym, meta: result.meta, candles }
  }

  async function summary(symbol) {
    const sym = normalizeSymbol(symbol)
    const modules = 'financialData,defaultKeyStatistics,summaryDetail,price,assetProfile,calendarEvents'
    for (let attempt = 0; attempt < 2; attempt++) {
      const s = await getSession(attempt > 0)
      const res = await get(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(sym)}?modules=${modules}&crumb=${encodeURIComponent(s.crumb)}`, { headers: { Cookie: s.cookie } })
      if (res.status === 401 || res.status === 403) continue // stale crumb: refresh once
      if (res.status === 404) throw new YahooError(`Yahoo has no profile for ${sym}`, { status: 404, symbol: sym })
      if (!res.ok) throw new YahooError(`Yahoo summary ${res.status} for ${sym}`, { status: res.status, symbol: sym })
      const result = (await res.json())?.quoteSummary?.result?.[0]
      if (!result) throw new YahooError(`Yahoo returned no profile for ${sym}`, { status: 404, symbol: sym })
      return result
    }
    throw new YahooError('Yahoo rejected the session crumb twice', { status: 401, symbol: sym })
  }

  // One expiry's chain (the nearest when `date` is omitted) plus the list of all expiry dates.
  async function options(symbol, { date } = {}) {
    const sym = normalizeSymbol(symbol)
    for (let attempt = 0; attempt < 2; attempt++) {
      const s = await getSession(attempt > 0)
      const q = `crumb=${encodeURIComponent(s.crumb)}${date ? `&date=${Number(date)}` : ''}`
      const res = await get(`https://query2.finance.yahoo.com/v7/finance/options/${encodeURIComponent(sym)}?${q}`, { headers: { Cookie: s.cookie } })
      if (res.status === 401 || res.status === 403) continue
      if (!res.ok) throw new YahooError(`Yahoo options ${res.status} for ${sym}`, { status: res.status, symbol: sym })
      const r = (await res.json())?.optionChain?.result?.[0]
      const chain = r?.options?.[0]
      if (!r || !chain) throw new YahooError(`${sym} has no listed options`, { status: 404, symbol: sym })
      return { expirations: r.expirationDates ?? [], price: r.quote?.regularMarketPrice ?? null, expiry: chain.expirationDate, calls: chain.calls ?? [], puts: chain.puts ?? [] }
    }
    throw new YahooError('Yahoo rejected the session crumb twice', { status: 401, symbol: sym })
  }

  async function search(query) {
    const res = await get(`https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=6&newsCount=0`)
    if (!res.ok) throw new YahooError(`Yahoo search ${res.status}`, { status: res.status })
    const json = await res.json()
    return (json.quotes || []).filter(q => q.quoteType === 'EQUITY' || q.quoteType === 'ETF').map(q => ({ symbol: q.symbol, name: q.longname || q.shortname, exchange: q.exchDisp, type: q.quoteType }))
  }

  return { chart, summary, options, search }
}

// Yahoo wraps most numbers as { raw, fmt }.
export const raw = v => (v && typeof v === 'object' ? v.raw ?? null : v ?? null)
