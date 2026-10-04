import { describe, expect, it } from 'vitest'
import { forwardPE } from './valuation.js'

const NOW = new Date('2026-10-04T12:00:00Z')
const yh = (pe, eps) => ({ summaryDetail: pe == null ? {} : { forwardPE: { raw: pe } }, keyStats: eps == null ? {} : { forwardEps: { raw: eps } } })
const fy = (label, end, eps) => ({ fiscalEnd: label, end: new Date(end), eps })

describe('forwardPE', () => {
  it('uses Yahoo\'s forward P/E when it has one', () => {
    expect(forwardPE({ price: 100, ...yh(24.34, 4.1), now: NOW })).toEqual({ pe: 24.3, basis: 'Yahoo consensus forward EPS', note: null })
  })

  it('derives it from Yahoo\'s forward EPS when the ratio itself is missing', () => {
    expect(forwardPE({ price: 100, ...yh(null, 4), now: NOW })).toMatchObject({ pe: 25, basis: 'Yahoo forward EPS' })
  })

  it('is n/a, never 0 and never negative, for a loss-making company', () => {
    const r = forwardPE({ price: 242.81, ...yh(-69.56, -3.49), now: NOW })
    expect(r.pe).toBeNull()
    expect(r.note).toBe('n/a, loss-making (forward EPS -$3.49)')
  })

  it('treats a multiple above 500 as not meaningful rather than printing 1369x', () => {
    const r = forwardPE({ price: 73.92, ...yh(1369.14, 0.054), now: NOW })
    expect(r.pe).toBeNull()
    expect(r.note).toMatch(/near zero/)
  })

  it('falls back to Nasdaq consensus for the first fiscal year that has not ended', () => {
    const nasdaq = [fy('Dec 2025', '2025-12-31', 0.9), fy('Dec 2026', '2026-12-31', 1.28), fy('Dec 2027', '2027-12-31', 1.84)]
    const r = forwardPE({ price: 188.75, ...yh(null, null), nasdaq, now: NOW })
    expect(r).toEqual({ pe: 147.5, basis: 'Nasdaq consensus EPS, FY Dec 2026', note: null })
  })

  it('does not ask Nasdaq to overrule a Yahoo loss', () => {
    const nasdaq = [fy('Dec 2026', '2026-12-31', 1.28)]
    expect(forwardPE({ price: 100, ...yh(-5, -1), nasdaq, now: NOW }).pe).toBeNull()
  })

  it('reports a Nasdaq loss as n/a too', () => {
    const r = forwardPE({ price: 89.62, ...yh(null, null), nasdaq: [fy('Dec 2026', '2026-12-31', -5.19)], now: NOW })
    expect(r.pe).toBeNull()
    expect(r.note).toBe('n/a, loss-making (FY Dec 2026 consensus EPS -$5.19)')
  })

  it('says so when no source has any estimate', () => {
    expect(forwardPE({ price: 10, ...yh(null, null), now: NOW })).toEqual({ pe: null, basis: null, note: 'n/a, no analyst estimates' })
  })
})
