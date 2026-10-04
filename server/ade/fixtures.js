// Offline stand-ins for Yahoo, shared by the ADE server tests.
export const DAY = 86400

export function fakeCandles(seed = 1, n = 450) {
  const start = Date.UTC(2025, 0, 2) / 1000
  return Array.from({ length: n }, (_, i) => {
    const c = 100 + seed * 3 + i * 0.15 + Math.sin(i / 6 + seed) * 6
    return { t: start + i * DAY, o: c, h: c * 1.012, l: c * 0.988, c, v: 1_000_000 + ((i * 7919 + seed) % 400_000) }
  })
}

export function fakeYahoo({ unknown = [], noSummary = [], noOptions = [], noForward = [], instrument = {} } = {}) {
  const calls = { chart: [], summary: [] }
  let seed = 0
  return {
    calls,
    async chart(sym) {
      calls.chart.push(sym)
      if (unknown.includes(sym)) {
        const { YahooError } = await import('./yahoo.js')
        throw new YahooError(`Yahoo has no data for ${sym}`, { status: 404, symbol: sym })
      }
      seed++
      return { symbol: sym, meta: { instrumentType: instrument[sym] ?? 'EQUITY', longName: `${sym} Corp` }, candles: fakeCandles(seed) }
    },
    async summary(sym) {
      calls.summary.push(sym)
      if (noSummary.includes(sym)) throw new Error('summary down')
      return {
        price: { longName: `${sym} Corporation`, marketCap: { raw: 125e9 } },
        financialData: {
          targetMeanPrice: { raw: 230 }, targetHighPrice: { raw: 300 }, targetLowPrice: { raw: 150 }, recommendationKey: 'buy',
          numberOfAnalystOpinions: { raw: 30 }, revenueGrowth: { raw: 0.31 }, grossMargins: { raw: 0.7 }, operatingMargins: { raw: 0.2 },
          profitMargins: { raw: 0.15 }, returnOnEquity: { raw: 0.25 }, debtToEquity: { raw: 45 }, totalRevenue: { raw: 1000 }, freeCashflow: { raw: 200 },
        },
        summaryDetail: noForward.includes(sym) ? {} : { forwardPE: { raw: 24.3 } },
        assetProfile: { sector: 'Technology' },
        calendarEvents: { earnings: { earningsDate: [{ raw: 1798056000 }], earningsAverage: { raw: 1.23 } } },
      }
    },
    async options(sym, { date } = {}) {
      if (noOptions.includes(sym)) {
        const { YahooError } = await import('./yahoo.js')
        throw new YahooError(`${sym} has no listed options`, { status: 404, symbol: sym })
      }
      const E = [Date.UTC(2026, 9, 16) / 1000, Date.UTC(2026, 10, 20) / 1000]
      const mk = (k, oi) => ({ strike: k, openInterest: oi, impliedVolatility: 0.4, bid: 2, ask: 2.2, lastPrice: 2.1 })
      const px = 150
      return {
        expirations: E, price: px, expiry: date ?? E[0],
        calls: [mk(140, 400), mk(150, 900), mk(160, 300)], puts: [mk(140, 500), mk(150, 800), mk(160, 200)],
      }
    },
    async search() { return [{ symbol: 'NET', name: 'Cloudflare, Inc.', exchange: 'NYSE', type: 'EQUITY' }] },
  }
}
