import { describe, expect, it } from 'vitest'
import { label, rateSensitivity } from './rates.js'

const DAY = 86400
const START = Date.UTC(2025, 0, 2) / 1000
// A deterministic pseudo-random walk so the tests need no network and no flakiness.
const rng = seed => () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296) - 0.5

function series(n, seed) {
  const r = rng(seed)
  let y = 4
  const yields = [], dy = []
  for (let i = 0; i < n; i++) { const d = r() * 0.1; y += d; dy.push(d); yields.push({ t: START + i * DAY, c: y }) }
  return { yields, dy, r: rng(seed + 99) }
}
const stockFrom = (dy, f) => {
  let p = 100
  return dy.map((d, i) => { p *= Math.exp(f(d, i)); return { t: START + i * DAY, c: p } })
}

describe('rateSensitivity', () => {
  it('finds a stock that falls when yields rise', () => {
    const { yields, dy, r } = series(400, 3)
    const res = rateSensitivity(stockFrom(dy, d => -0.4 * d + r() * 0.002), yields)
    expect(res.rateCorr).toBeLessThan(-0.7)
    expect(res.rateSens).toBe(Math.abs(res.rateCorr))
    expect(res.rateNote).toMatch(/^HIGH \(−\d\.\d\d vs 10Y yield; falls when yields rise; 1y daily\)$/)
  })

  it('finds a stock that rises with yields', () => {
    const { yields, dy, r } = series(400, 5)
    const res = rateSensitivity(stockFrom(dy, d => 0.4 * d + r() * 0.002), yields)
    expect(res.rateCorr).toBeGreaterThan(0.7)
    expect(res.rateNote).toMatch(/rises with yields/)
  })

  it('calls an unrelated stock LOW', () => {
    const { yields } = series(500, 7)
    const noise = rng(1234)
    const res = rateSensitivity(stockFrom(Array(500).fill(0), () => noise() * 0.03), yields)
    expect(Math.abs(res.rateCorr)).toBeLessThan(0.15)
    expect(res.rateNote).toMatch(/^(LOW|MED)/)
    expect(res.rateNote).toMatch(/2y daily/)
  })

  it('returns null rather than a number from too little overlap', () => {
    const { yields, dy } = series(60, 9)
    expect(rateSensitivity(stockFrom(dy, d => -d), yields)).toBeNull()
    expect(rateSensitivity(stockFrom(dy, d => -d), [])).toBeNull()
  })

  it('only compares days both series traded', () => {
    const { yields, dy } = series(300, 11)
    const stock = stockFrom(dy, d => -0.4 * d).filter((_, i) => i % 7 !== 0) // holidays on one side
    expect(rateSensitivity(stock, yields).obs).toBeGreaterThan(150)
  })
})

describe('label', () => {
  it('uses the 95% significance line as the MED threshold', () => {
    const n = 500 // 2/sqrt(500) = 0.089
    expect(label(0.05, n)).toBe('LOW')
    expect(label(-0.1, n)).toBe('MED')
    expect(label(-0.16, n)).toBe('HIGH')
  })
})
