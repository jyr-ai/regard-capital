// The macro strip the ADE dashboard shows (S&P 500, VIX, dollar, oil, gold, bitcoin, 10-year yield,
// CPI, Fed funds), from real sources instead of ADE's hand-typed `MACRO` object:
//   Yahoo Finance charts   index and futures closes          (same endpoint as the stock candles)
//   NY Fed                 effective fed funds rate and the FOMC target range
//   BLS public API         CPI-U, year over year             (no key, 25 requests a day: we make one)
// Each source fails alone. A missing piece is null and listed in `sources`; nothing is invented.

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

const YAHOO = { spy: '^GSPC', vix: '^VIX', tnx: '^TNX', dxy: 'DX-Y.NYB', oil: 'CL=F', gold: 'GC=F', btc: 'BTC-USD' }
const COLOR = { 'RISK-ON': '#3DBFA8', NEUTRAL: '#FFBF00', 'RISK-OFF': '#E8643A' } // verdict colours of the recoloured dashboard

const r2 = x => Math.round(x * 100) / 100
const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const dayLabel = ts => new Date(ts * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

// CPI-U index values -> [{ year, month, yoy }] newest first.
export function cpiYoY(data) {
  const idx = new Map(data.map(d => [`${d.year}-${d.period}`, Number(d.value)]))
  return data
    .map(d => ({ year: +d.year, month: +d.period.slice(1), now: Number(d.value), before: idx.get(`${+d.year - 1}-${d.period}`) }))
    .filter(d => d.period !== 'M13' && d.before && Number.isFinite(d.now))
    .map(d => ({ year: d.year, month: d.month, yoy: r2((d.now / d.before - 1) * 100) }))
    .sort((a, b) => b.year - a.year || b.month - a.month)
}

// RISK-ON: calm and trending up. RISK-OFF: fear or a broken trend. Everything else is NEUTRAL.
export function regime({ vix, spy, spyMa200 }) {
  if (vix == null) return null
  const below = spy != null && spyMa200 != null && spy < spyMa200
  if (vix > 25 || (below && vix > 20)) return 'RISK-OFF'
  if (vix < 20 && !below) return 'RISK-ON'
  return 'NEUTRAL'
}

export async function buildMacro({ yahoo, fetchImpl = fetch, now = new Date() }) {
  const sources = []
  const ok = (name, detail) => sources.push({ name, ok: true, detail })
  const fail = (name, e) => sources.push({ name, ok: false, error: e.message })

  const q = {}
  await Promise.all(Object.entries(YAHOO).map(async ([key, sym]) => {
    try {
      const { candles } = await yahoo.chart(sym, { range: key === 'spy' ? '1y' : '1mo' })
      const last = candles.at(-1), prev = candles.at(-2)
      const closes = candles.map(c => c.c)
      q[key] = {
        value: last.c,
        changePct: prev ? r2((last.c / prev.c - 1) * 100) : null,
        ts: last.t,
        ma200: key === 'spy' && closes.length >= 200 ? closes.slice(-200).reduce((a, b) => a + b, 0) / 200 : null,
      }
      ok(sym, dayLabel(last.t))
    } catch (e) { fail(sym, e) }
  }))

  let fed = null
  try {
    const res = await fetchImpl('https://markets.newyorkfed.org/api/rates/unsecured/effr/last/1.json', { headers: { 'User-Agent': UA, Accept: 'application/json' }, signal: AbortSignal.timeout(8000) })
    if (!res.ok) throw new Error(`NY Fed ${res.status}`)
    const r = (await res.json())?.refRates?.[0]
    if (r?.percentRate == null) throw new Error('NY Fed returned no rate')
    fed = { effr: r.percentRate, from: r.targetRateFrom, to: r.targetRateTo, date: r.effectiveDate }
    ok('NY Fed EFFR', r.effectiveDate)
  } catch (e) { fail('NY Fed EFFR', e) }

  let cpi = null
  try {
    const year = now.getUTCFullYear()
    const res = await fetchImpl(`https://api.bls.gov/publicAPI/v2/timeseries/data/CUUR0000SA0?startyear=${year - 2}&endyear=${year}`, { headers: { 'User-Agent': UA, Accept: 'application/json' }, signal: AbortSignal.timeout(10000) })
    if (!res.ok) throw new Error(`BLS ${res.status}`)
    const json = await res.json()
    if (json.status !== 'REQUEST_SUCCEEDED') throw new Error(`BLS: ${(json.message ?? []).join(' ') || json.status}`)
    const rows = cpiYoY(json.Results.series[0].data)
    if (!rows.length) throw new Error('BLS returned no CPI rows')
    cpi = { yoy: rows[0].yoy, prior: rows[1]?.yoy ?? null, month: `${MONTH[rows[0].month - 1]} ${rows[0].year}` }
    ok('BLS CPI-U', cpi.month)
  } catch (e) { fail('BLS CPI-U', e) }

  const reg = regime({ vix: q.vix?.value, spy: q.spy?.value, spyMa200: q.spy?.ma200 })
  // Bitcoin trades every day; the equity close is the date the strip is "as of".
  const asOfTs = q.spy?.ts ?? Math.max(0, ...Object.values(q).map(x => x.ts))
  const px = (k, d = 0) => (q[k] ? q[k].value.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }) : null)
  const chg = k => (q[k]?.changePct == null ? '' : ` (${q[k].changePct >= 0 ? '+' : ''}${q[k].changePct}%)`)

  const parts = [
    q.spy && `S&P 500 ${px('spy')}${chg('spy')}${q.spy.ma200 ? `, ${q.spy.value >= q.spy.ma200 ? 'above' : 'below'} its 200-day average` : ''}`,
    q.vix && `VIX ${px('vix', 1)}`,
    q.tnx && `10-year yield ${px('tnx', 2)}%`,
    q.dxy && `dollar index ${px('dxy', 1)}`,
    q.oil && `WTI oil $${px('oil', 2)}`,
    q.gold && `gold $${px('gold')}`,
    q.btc && `bitcoin $${px('btc')}`,
  ].filter(Boolean)
  const note = asOfTs ? `${dayLabel(asOfTs)} closes, Yahoo Finance: ${parts.join('; ')}.` : null

  return {
    asOf: asOfTs ? new Date(asOfTs * 1000).toISOString() : null,
    macroDate: asOfTs ? dayLabel(asOfTs) : null,
    spy: q.spy ? Math.round(q.spy.value) : null,
    vix: q.vix ? r2(q.vix.value) : null,
    tnx: q.tnx ? r2(q.tnx.value) : null,
    dxy: q.dxy ? r2(q.dxy.value) : null,
    oil: q.oil ? r2(q.oil.value) : null,
    gold: q.gold ? Math.round(q.gold.value) : null,
    btc: q.btc ? Math.round(q.btc.value) : null,
    cpi: cpi?.yoy ?? null,
    cpiPrior: cpi?.prior ?? null,
    cpiMonth: cpi?.month ?? null,
    fedFunds: fed?.effr ?? null,
    rateOutlook: fed ? `target range ${fed.from.toFixed(2)}-${fed.to.toFixed(2)}%, effective ${fed.effr.toFixed(2)}% (NY Fed, ${fed.date})` : null,
    regime: reg,
    color: reg ? COLOR[reg] : null,
    note,
    sources,
  }
}
