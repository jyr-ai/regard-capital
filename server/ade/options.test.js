import { describe, expect, it } from 'vitest'
import { atmIV, buildOptions, impliedMove, ivStats, maxPain, MIN_OBS, recordIV, skew } from './options.js'

const opt = (strike, oi, extra = {}) => ({ strike, openInterest: oi, impliedVolatility: 0.4, bid: 1, ask: 1.2, lastPrice: 1.1, ...extra })

describe('maxPain', () => {
  it('picks the strike where option holders are paid least', () => {
    // Calls and puts all piled on 100: expiring at 100 pays nobody anything.
    const calls = [opt(90, 10), opt(100, 500), opt(110, 10)]
    const puts = [opt(90, 10), opt(100, 500), opt(110, 10)]
    expect(maxPain(calls, puts)).toBe(100)
  })

  it('is pulled toward the side with more open interest', () => {
    const calls = [opt(100, 1000)]
    const puts = [opt(100, 10), opt(90, 10)]
    expect(maxPain(calls, puts)).toBeLessThanOrEqual(100)
    expect(maxPain([opt(100, 10)], [opt(100, 1000), opt(110, 1)])).toBeGreaterThanOrEqual(100)
  })

  it('returns null for an empty chain', () => expect(maxPain([], [])).toBeNull())
})

describe('atmIV and impliedMove', () => {
  const calls = [opt(95, 1, { impliedVolatility: 0.5 }), opt(100, 1, { impliedVolatility: 0.3, bid: 4, ask: 4.2 })]
  const puts = [opt(100, 1, { impliedVolatility: 0.34, bid: 3.8, ask: 4 }), opt(105, 1, { impliedVolatility: 0.6 })]

  it('averages the call and put IV at the strike nearest the money, in percent', () => {
    expect(atmIV(calls, puts, 101)).toBe(32)
  })

  it('ignores contracts with no usable IV (Yahoo returns ~0 for dead strikes)', () => {
    expect(atmIV([opt(100, 1, { impliedVolatility: 0 })], [], 100)).toBeNull()
  })

  it('expresses the ATM straddle as a percent of price', () => {
    expect(impliedMove(calls, puts, 100)).toBe(8) // (4.1 + 3.9) / 100
  })
})

// Fake chains keyed by expiry epoch. NOW = 2026-10-05; expiries chosen so the 3rd Fridays are Oct 16 and Nov 20.
const NOW = Date.UTC(2026, 9, 5)
const ep = (y, m, d) => Date.UTC(y, m - 1, d) / 1000
const EXP = { weekly: ep(2026, 10, 7), oct16: ep(2026, 10, 16), oct30: ep(2026, 10, 30), nov20: ep(2026, 11, 20) }
const chainFor = (expiry, oi) => ({
  expirations: Object.values(EXP), price: 100, expiry,
  calls: [opt(100, oi, { impliedVolatility: 0.3 }), opt(110, oi)], puts: [opt(100, oi * 2, { impliedVolatility: 0.34 }), opt(90, oi)],
})
const fakeYahoo = (heavyExpiry) => ({
  options: async (_s, { date } = {}) => chainFor(date ?? EXP.weekly, (date ?? EXP.weekly) === heavyExpiry ? 5000 : 100),
})

describe('buildOptions', () => {
  it('uses the heaviest monthly for max pain and the nearest expiry for "near"', async () => {
    const o = await buildOptions(fakeYahoo(EXP.nov20), 'XYZ', { now: NOW })
    expect(o.maxPainExp).toBe('2026-11-20')
    expect(o.maxPainNearExp).toBe('2026-10-07')
    expect(o.maxPainNearDTE).toBe(2)
  })

  it('never anchors heavy max pain to a sub-7-day expiry', async () => {
    const o = await buildOptions(fakeYahoo(EXP.weekly), 'XYZ', { now: NOW }) // the weekly has the most OI
    expect(o.maxPainDTE).toBeGreaterThanOrEqual(7)
  })

  it('takes ATM IV from the expiry closest to 30 days', async () => {
    const o = await buildOptions(fakeYahoo(EXP.oct16), 'XYZ', { now: NOW })
    expect(o.atmIV).toBe(32)
  })

  it('computes the earnings straddle only when earnings fall inside the listed expiries', async () => {
    expect((await buildOptions(fakeYahoo(EXP.oct16), 'XYZ', { now: NOW, earningsEpoch: ep(2026, 10, 20) })).impliedMove).toBeGreaterThan(0)
    expect((await buildOptions(fakeYahoo(EXP.oct16), 'XYZ', { now: NOW })).impliedMove).toBeNull()
  })

  it('leaves IV rank and percentile null (no history from Yahoo) but computes skew from the chain', async () => {
    const o = await buildOptions(fakeYahoo(EXP.oct16), 'XYZ', { now: NOW })
    expect([o.ivRank, o.ivPctl]).toEqual([null, null])
    expect(o.ivObs).toBe(0)
    expect(typeof o.skew).toBe('number')
  })

  it('fails on an empty chain so the caller can fall back, instead of inventing numbers', async () => {
    await expect(buildOptions({ options: async () => ({ expirations: [], price: 100, expiry: 1, calls: [], puts: [] }) }, 'X', { now: NOW })).rejects.toThrow(/empty/)
  })

  it('survives one monthly expiry failing to load', async () => {
    const y = { options: async (_s, { date } = {}) => { if (date === EXP.nov20) throw new Error('boom'); return chainFor(date ?? EXP.weekly, 100) } }
    await expect(buildOptions(y, 'XYZ', { now: NOW })).resolves.toMatchObject({ maxPainExp: '2026-10-16' })
  })
})

describe('skew', () => {
  const calls = [opt(105, 1, { impliedVolatility: 0.3 }), opt(110, 1, { impliedVolatility: 0.32 }), opt(120, 1, { impliedVolatility: 0.4 })]
  const puts = [opt(80, 1, { impliedVolatility: 0.5 }), opt(90, 1, { impliedVolatility: 0.42 }), opt(95, 1, { impliedVolatility: 0.38 })]

  it('is call IV minus put IV at +-10%, in points (positive = calls bid over puts)', () => {
    expect(skew(calls, puts, 100)).toBe(-10) // 32 - 42
    expect(skew(puts, calls, 100)).toBeNull() // no usable wing strikes on either side
  })

  it('is null when a wing has no real quote', () => {
    expect(skew(calls, [opt(90, 1, { impliedVolatility: 0 })], 100)).toBeNull()
  })
})

describe('IV history', () => {
  const hist = n => Array.from({ length: n }, (_, i) => ({ d: `2026-09-${String(i + 1).padStart(2, '0')}`, iv: 30 + i }))

  it(`stays null until ${MIN_OBS} observations exist, but reports how many there are`, () => {
    expect(ivStats(hist(MIN_OBS - 1), 40)).toEqual({ ivRank: null, ivPctl: null, ivObs: MIN_OBS - 1 })
  })

  it('computes rank and percentile once there is enough history', () => {
    const r = ivStats(hist(20), 39.5) // history spans 30..49
    expect(r.ivRank).toBe(50)
    expect(r.ivPctl).toBe(50)
    expect(r.ivObs).toBe(20)
  })

  it('handles a flat history without dividing by zero', () => {
    expect(ivStats(Array.from({ length: 25 }, (_, i) => ({ d: String(i), iv: 40 })), 40).ivRank).toBe(50)
  })

  it('records one reading per date and ignores a missing IV', () => {
    let h = recordIV([], '2026-10-05', 40)
    h = recordIV(h, '2026-10-05', 41)
    expect(h).toEqual([{ d: '2026-10-05', iv: 41 }])
    expect(recordIV(h, '2026-10-06', null)).toBe(h)
  })

  it('keeps at most 260 readings', () => {
    expect(recordIV(hist(300), '2027-01-01', 50)).toHaveLength(260)
  })
})
