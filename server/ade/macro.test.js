import { describe, expect, it } from 'vitest'
import { fakeCandles } from './fixtures.js'
import { buildMacro, cpiYoY, regime } from './macro.js'

const NOW = new Date('2026-10-04T12:00:00Z')
const cpiRows = (() => {
  const rows = []
  for (const [year, base] of [[2025, 100], [2026, 103.4]]) for (let m = 1; m <= 8; m++) rows.push({ year: String(year), period: `M${String(m).padStart(2, '0')}`, value: String(base) })
  rows.push({ year: '2026', period: 'M13', value: '999' }) // BLS annual average row
  return rows.reverse()
})()

describe('cpiYoY', () => {
  it('compares each month with the same month a year earlier, newest first, and skips the annual row', () => {
    const rows = cpiYoY(cpiRows)
    expect(rows[0]).toEqual({ year: 2026, month: 8, yoy: 3.4 })
    expect(rows).toHaveLength(8)
  })
})

describe('regime', () => {
  it.each([
    [{ vix: 15, spy: 110, spyMa200: 100 }, 'RISK-ON'],
    [{ vix: 27, spy: 110, spyMa200: 100 }, 'RISK-OFF'],
    [{ vix: 22, spy: 90, spyMa200: 100 }, 'RISK-OFF'],
    [{ vix: 17, spy: 90, spyMa200: 100 }, 'NEUTRAL'],
    [{ vix: 22, spy: 110, spyMa200: 100 }, 'NEUTRAL'],
    [{ vix: null, spy: 110, spyMa200: 100 }, null],
  ])('%j is %s', (input, want) => expect(regime(input)).toBe(want))
})

function fakes({ fail = [] } = {}) {
  const yahoo = {
    async chart(sym) {
      if (fail.includes(sym)) throw new Error(`no ${sym}`)
      const candles = fakeCandles(1, 260)
      const level = { '^VIX': 15.3, '^GSPC': 100, '^TNX': 5.28 }[sym] ?? 50
      // every symbol closes at `level`, except the S&P, which ends above its 200-day average
      return { symbol: sym, candles: candles.map((c, i) => ({ ...c, c: sym === '^GSPC' ? level + i * 0.1 : level })) }
    },
  }
  const fetchImpl = async url => {
    if (url.includes('newyorkfed')) {
      if (fail.includes('fed')) return { ok: false, status: 503 }
      return { ok: true, json: async () => ({ refRates: [{ effectiveDate: '2026-10-01', percentRate: 3.88, targetRateFrom: 3.75, targetRateTo: 4 }] }) }
    }
    if (fail.includes('bls')) return { ok: true, json: async () => ({ status: 'REQUEST_NOT_PROCESSED', message: ['daily threshold reached'] }) }
    return { ok: true, json: async () => ({ status: 'REQUEST_SUCCEEDED', Results: { series: [{ data: cpiRows }] } }) }
  }
  return { yahoo, fetchImpl }
}

describe('buildMacro', () => {
  it('assembles the strip from Yahoo, the NY Fed and BLS', async () => {
    const m = await buildMacro({ ...fakes(), now: NOW })
    expect(m).toMatchObject({ vix: 15.3, tnx: 5.28, cpi: 3.4, cpiPrior: 3.4, cpiMonth: 'Aug 2026', fedFunds: 3.88, regime: 'RISK-ON', color: '#3DBFA8' })
    expect(m.rateOutlook).toBe('target range 3.75-4.00%, effective 3.88% (NY Fed, 2026-10-01)')
    expect(m.note).toMatch(/closes, Yahoo Finance: S&P 500 .*above its 200-day average; VIX 15\.3; 10-year yield 5\.28%/)
    expect(m.sources.every(s => s.ok)).toBe(true)
  })

  it('dates the strip by the equity close, not by bitcoin\'s 24-hour tape', async () => {
    const f = fakes()
    const chart = f.yahoo.chart
    f.yahoo.chart = async sym => {
      const r = await chart(sym)
      return sym === 'BTC-USD' ? { ...r, candles: r.candles.map(c => ({ ...c, t: c.t + 5 * 86400 })) } : r
    }
    const m = await buildMacro({ ...f, now: NOW })
    const spy = (await chart('^GSPC')).candles.at(-1).t
    expect(m.asOf).toBe(new Date(spy * 1000).toISOString())
  })

  it('leaves a failed source null and names it, without inventing a number', async () => {
    const m = await buildMacro({ ...fakes({ fail: ['bls', 'DX-Y.NYB'] }), now: NOW })
    expect(m.cpi).toBeNull()
    expect(m.dxy).toBeNull()
    expect(m.vix).toBe(15.3)
    expect(m.sources.filter(s => !s.ok).map(s => s.name).sort()).toEqual(['BLS CPI-U', 'DX-Y.NYB'])
    expect(m.sources.find(s => s.name === 'BLS CPI-U').error).toMatch(/daily threshold/)
    expect(m.note).not.toMatch(/dollar/)
  })

  it('has no regime without a VIX', async () => {
    const m = await buildMacro({ ...fakes({ fail: ['^VIX'] }), now: NOW })
    expect(m.regime).toBeNull()
    expect(m.color).toBeNull()
  })
})
