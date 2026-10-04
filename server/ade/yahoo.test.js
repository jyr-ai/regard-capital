import { describe, expect, it } from 'vitest'
import { YahooError, createYahoo, normalizeSymbol, raw } from './yahoo.js'

const json = (body, status = 200, headers = {}) => new Response(JSON.stringify(body), { status, headers })

describe('normalizeSymbol', () => {
  it('uppercases and trims', () => expect(normalizeSymbol('  mu ')).toBe('MU'))
  it('allows class shares and dashes', () => {
    expect(normalizeSymbol('brk.b')).toBe('BRK.B')
    expect(normalizeSymbol('BF-B')).toBe('BF-B')
  })
  it.each(['', 'A B', 'A/B', '../etc', 'x'.repeat(20), '<script>'])('rejects %j', bad => {
    expect(() => normalizeSymbol(bad)).toThrow(YahooError)
  })
})

describe('chart', () => {
  const body = {
    chart: { result: [{ meta: { symbol: 'MU' }, timestamp: [1, 2, 3], indicators: { quote: [{ open: [1, null, 3], high: [2, 2, 4], low: [0.5, 1, 2], close: [1.5, 1.5, 3.5], volume: [10, 20, null] }] } }] },
  }

  it('drops candles with null prices (halted days) and zero-fills missing volume', async () => {
    const y = createYahoo({ fetchImpl: async () => json(body) })
    const { candles } = await y.chart('mu')
    expect(candles).toHaveLength(2)
    expect(candles[1]).toEqual({ t: 3, o: 3, h: 4, l: 2, c: 3.5, v: 0 })
  })

  it('maps 404 and empty results to a YahooError with status 404', async () => {
    const y = createYahoo({ fetchImpl: async () => json({ chart: { result: null } }, 404) })
    await expect(y.chart('NOPE')).rejects.toMatchObject({ name: 'YahooError', status: 404 })
    const y2 = createYahoo({ fetchImpl: async () => json({ chart: { result: [{ meta: {} }] } }) })
    await expect(y2.chart('NOPE')).rejects.toMatchObject({ status: 404 })
  })

  it('never builds a URL from unvalidated input', async () => {
    const urls = []
    const y = createYahoo({ fetchImpl: async u => { urls.push(u); return json(body) } })
    await expect(y.chart('MU/../../x')).rejects.toBeInstanceOf(YahooError)
    expect(urls).toHaveLength(0)
  })
})

describe('summary and the crumb', () => {
  function server({ crumbs = ['crumb-1'], rejectFirst = false } = {}) {
    const log = []
    let crumbIdx = 0
    let summaryHits = 0
    const fetchImpl = async url => {
      log.push(String(url))
      if (String(url).includes('fc.yahoo.com')) return new Response('', { status: 404, headers: { 'set-cookie': 'A3=abc; Path=/' } })
      if (String(url).includes('getcrumb')) return new Response(crumbs[Math.min(crumbIdx++, crumbs.length - 1)], { status: 200 })
      summaryHits++
      if (rejectFirst && summaryHits === 1) return json({}, 401)
      return json({ quoteSummary: { result: [{ financialData: { targetMeanPrice: { raw: 10 } } }] } })
    }
    return { fetchImpl, log }
  }

  it('fetches a crumb once and reuses it', async () => {
    const { fetchImpl, log } = server()
    const y = createYahoo({ fetchImpl })
    await y.summary('MU')
    await y.summary('NVDA')
    expect(log.filter(u => u.includes('getcrumb'))).toHaveLength(1)
    expect(log.find(u => u.includes('quoteSummary'))).toContain('crumb=crumb-1')
  })

  it('refreshes a rejected crumb once and retries', async () => {
    const { fetchImpl, log } = server({ crumbs: ['stale', 'fresh'], rejectFirst: true })
    const r = await createYahoo({ fetchImpl }).summary('MU')
    expect(raw(r.financialData.targetMeanPrice)).toBe(10)
    expect(log.filter(u => u.includes('getcrumb'))).toHaveLength(2)
    expect(log.filter(u => u.includes('quoteSummary')).pop()).toContain('crumb=fresh')
  })

  it('fails clearly when Yahoo returns an HTML page instead of a crumb', async () => {
    const fetchImpl = async url => (String(url).includes('getcrumb') ? new Response('<html>blocked</html>', { status: 200 }) : new Response('', { status: 404 }))
    await expect(createYahoo({ fetchImpl }).summary('MU')).rejects.toThrow(/crumb/)
  })
})

describe('host fallback', () => {
  const ok = { chart: { result: [{ meta: { symbol: 'MU' }, timestamp: [1], indicators: { quote: [{ open: [1], high: [2], low: [0.5], close: [1.5], volume: [10] }] } }] } }

  it.each([429, 403, 503])('tries the sibling host straight away when one answers %i', async status => {
    const urls = []
    const fetchImpl = async u => { urls.push(String(u)); return String(u).includes('query1') ? json({}, status) : json(ok) }
    const { candles } = await createYahoo({ fetchImpl }).chart('MU')
    expect(candles).toHaveLength(1)
    expect(urls.map(u => new URL(u).hostname)).toEqual(['query1.finance.yahoo.com', 'query2.finance.yahoo.com'])
  })

  it('gives up with a clear error when both hosts refuse', async () => {
    await expect(createYahoo({ fetchImpl: async () => json({}, 403) }).chart('MU')).rejects.toMatchObject({ name: 'YahooError', status: 403 })
  })

  it('does not retry a plain 404 on the other host', async () => {
    const urls = []
    await expect(createYahoo({ fetchImpl: async u => { urls.push(u); return json({}, 404) } }).chart('NOPE')).rejects.toMatchObject({ status: 404 })
    expect(urls).toHaveLength(1)
  })
})

describe('raw', () => {
  it('unwraps { raw, fmt } and passes plain values through', () => {
    expect(raw({ raw: 5, fmt: '5' })).toBe(5)
    expect(raw(7)).toBe(7)
    expect(raw(undefined)).toBeNull()
    expect(raw({})).toBeNull()
  })
})
