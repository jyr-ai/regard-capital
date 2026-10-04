import { describe, expect, it } from 'vitest'
import { analyse, brokenSupports, fibs, macd, pivots, rsi, sma, supportLadder, swingLows, volumeNodes } from './indicators.js'

const DAY = 86400
// Build candles from closes; low/high a fixed 1% around the close.
const candlesFrom = (closes, { vol = 1000, start = Date.UTC(2025, 0, 2) / 1000 } = {}) =>
  closes.map((c, i) => ({ t: start + i * DAY, o: c, h: c * 1.01, l: c * 0.99, c, v: typeof vol === 'function' ? vol(i) : vol }))

describe('sma / rsi / macd', () => {
  it('sma averages the last n values and needs n values', () => {
    expect(sma([1, 2, 3, 4, 5], 3)).toBe(4)
    expect(sma([1, 2], 3)).toBeNull()
  })

  it('rsi is 100 on a pure uptrend, 0 on a pure downtrend, ~50 when flat-ish', () => {
    const up = Array.from({ length: 40 }, (_, i) => 100 + i)
    expect(rsi(up)).toBe(100)
    expect(rsi([...up].reverse())).toBeCloseTo(0, 5)
    const zig = Array.from({ length: 60 }, (_, i) => 100 + (i % 2 ? 1 : -1))
    expect(rsi(zig)).toBeGreaterThan(40)
    expect(rsi(zig)).toBeLessThan(60)
  })

  it('rsi matches a hand-checked Wilder value (Wilder\'s textbook series)', () => {
    // Classic worked example: 14-period RSI of this close series is ~70.46 on the 15th value.
    const c = [44.34, 44.09, 44.15, 43.61, 44.33, 44.83, 45.1, 45.42, 45.84, 46.08, 45.89, 46.03, 45.61, 46.28, 46.28]
    expect(rsi(c, 14)).toBeCloseTo(70.46, 1)
  })

  it('macd histogram is positive in an accelerating uptrend and negative in a downtrend', () => {
    const up = Array.from({ length: 120 }, (_, i) => 100 + i * i * 0.01)
    expect(macd(up).h).toBeGreaterThan(0)
    expect(macd(up).cross).toBe('bullish')
    const down = Array.from({ length: 120 }, (_, i) => 300 - i * i * 0.01) // accelerating decline
    expect(macd(down).h).toBeLessThan(0)
    expect(macd(down).cross).toBe('bearish')
    expect(macd([1, 2, 3])).toBeNull()
  })
})

describe('swingLows and held counts', () => {
  // 120 flat bars at 100, a dip to 80 and back, then price returns to test 80 twice.
  const series = () => {
    const c = Array.from({ length: 200 }, () => 100)
    for (let i = 60; i <= 70; i++) c[i] = 80 + Math.abs(65 - i) * 2 // V bottom at i=65
    for (let i = 120; i <= 130; i++) c[i] = 80.4 + Math.abs(125 - i) * 2 // second test, bounces
    return candlesFrom(c)
  }

  it('finds the V bottom as a swing low and counts the later bounce as held', () => {
    const lows = swingLows(series())
    const level = lows.find(s => s.price < 82)
    expect(level).toBeTruthy()
    expect(level.price).toBeCloseTo(79.2, 1)
    expect(level.held).toBeGreaterThanOrEqual(1)
  })

  it('merges swing lows within 1.5% into one level', () => {
    const lows = swingLows(series()).filter(s => s.price < 82)
    expect(lows).toHaveLength(1)
  })

  it('ignores the newest `side` bars, which cannot be confirmed yet', () => {
    const c = Array.from({ length: 100 }, () => 100)
    c[97] = 50
    expect(swingLows(candlesFrom(c)).some(s => s.price < 60)).toBe(false)
  })
})

describe('volumeNodes', () => {
  it('finds the price where most volume traded', () => {
    const closes = Array.from({ length: 200 }, (_, i) => (i < 100 ? 80 : 120))
    const nodes = volumeNodes(candlesFrom(closes, { vol: i => (i < 100 ? 5000 : 500) }))
    expect(nodes.some(n => Math.abs(n.price - 80) < 3)).toBe(true)
  })
})

describe('supportLadder (ADE rules)', () => {
  const swings = [
    { price: 90, held: 3, date: '2026-06-01' },
    { price: 89, held: 1, date: '2026-05-01' }, // within 2% of 90: skipped
    { price: 70, held: 0, date: '2026-04-01' },
    { price: 40, held: 9, date: '2026-01-01' }, // below 60% of price: not a candidate
    { price: 105, held: 2, date: '2026-03-01' }, // above price: not support
  ]

  it('takes up to 3 levels between 60% and 100% of price, nearest first, skipping near-duplicates', () => {
    const l = supportLadder(100, swings, [{ price: 80, volume: 1 }])
    expect(l.map(x => x.lvl)).toEqual([90, 80, 70])
    expect(l[0].label).toBe('Swing low 2026-06-01 — held 3x')
    expect(l[1].label).toBe('Volume node — 20.0% below')
    expect(l[1].held).toBe(0)
  })

  it('ignores levels within 1% of price: that is the bin price sits in, not support', () => {
    const l = supportLadder(100, [{ price: 99.6, held: 4, date: 'x' }, { price: 92, held: 1, date: 'y' }], [{ price: 100, volume: 1 }])
    expect(l[0].lvl).toBe(92)
  })

  it('pads with derived steps 7% below the last level', () => {
    const l = supportLadder(100, [], [])
    expect(l.map(x => x.lvl)).toEqual([93, 86.49, 80.44])
    expect(l.every(x => x.label === 'Step below — derived')).toBe(true)
  })

  it('never puts a moving average, pivot or round number in the ladder', () => {
    const l = supportLadder(100, [], [])
    expect(l.every(x => /Swing low|Volume node|Step below/.test(x.label))).toBe(true)
  })
})

describe('brokenSupports, fibs, pivots', () => {
  it('lists former supports now above price, nearest first', () => {
    const b = brokenSupports(100, [{ price: 130, held: 2, date: 'a' }, { price: 110, held: 5, date: 'b' }, { price: 90, held: 1, date: 'c' }])
    expect(b.map(x => x.lvl)).toEqual([110, 130])
  })

  it('computes retracements between the 52w low and high', () => {
    const f = fibs(200, 100)
    expect(f.map(x => x.p)).toEqual([100, 138.2, 150, 161.8, 200])
  })

  it('computes classic pivots', () => {
    expect(pivots({ h: 110, l: 90, c: 100 })).toEqual({ r2: 120, r1: 110, p: 100, s1: 90, s2: 80 })
  })
})

describe('analyse', () => {
  const trend = Array.from({ length: 450 }, (_, i) => 50 + i * 0.2 + Math.sin(i / 7) * 4)

  it('returns every field the dashboard overlay needs', () => {
    const a = analyse(candlesFrom(trend, { vol: i => 1_000_000 + (i % 9) * 50_000 }))
    expect(a.price).toBeGreaterThan(0)
    expect(a.ma.d400).toBeGreaterThan(0)
    expect(a.support).toHaveLength(3)
    expect(a.support.every(s => s.lvl < a.price)).toBe(true)
    expect(a.rsi).toBeGreaterThan(0)
    expect(['bullish', 'bearish']).toContain(a.macd.cross)
    expect(a.fibs).toHaveLength(5)
    expect(a.volume.avg).toMatch(/[MK]$/)
    expect(a.asOfBar).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('rejects a ticker with too little history', () => {
    expect(() => analyse(candlesFrom([1, 2, 3]))).toThrow(/at least 60/)
  })

  it('omits the 400-day average when history is shorter, instead of inventing it', () => {
    const a = analyse(candlesFrom(trend.slice(0, 120)))
    expect(a.ma.d400).toBeNull()
  })
})
