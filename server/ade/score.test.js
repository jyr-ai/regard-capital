import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { band, score, scoreSetup } from './score.js'

const RANK_DIR = path.resolve(__dirname, '../../upstream/ade/tools')

// Deterministic pseudo-random inputs (no Math.random: failures must reproduce).
function* rng(seed) {
  let s = seed
  while (true) {
    s = (s * 1664525 + 1013904223) % 4294967296
    yield s / 4294967296
  }
}

describe('score parity with ADE\'s own rank.py', () => {
  it('matches rank.score() and rank.band() on 300 random setups', () => {
    const r = rng(7)
    const cases = Array.from({ length: 300 }, () => {
      const price = 5 + r.next().value * 1500
      return {
        price,
        target: price * (0.5 + r.next().value * 1.2),
        level: price * (0.3 + r.next().value * 0.69),
        held: Math.floor(r.next().value * 12),
        rsi: 10 + r.next().value * 85,
        macdH: (r.next().value - 0.5) * 8,
        broken: Math.floor(r.next().value * 8),
      }
    })
    const py = `
import sys, json
sys.path.insert(0, ${JSON.stringify(RANK_DIR)})
import rank
out = []
for c in json.load(sys.stdin):
    s, up, rr, dist = rank.score(c["price"], c["target"], c["level"], c["held"], c["rsi"], c["macdH"], c["broken"])
    out.append({"score": s, "band": rank.band(s), "up": up, "rr": rr, "dist": dist})
print(json.dumps(out))`
    // -B: never write __pycache__ into upstream/, which sync:check treats as a hand-added file.
    const res = spawnSync('python3', ['-B', '-c', py], { input: JSON.stringify(cases), encoding: 'utf8', env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' } })
    expect(res.status, res.stderr).toBe(0)
    const expected = JSON.parse(res.stdout)
    const mismatches = []
    cases.forEach((c, i) => {
      const got = score(c)
      if (got.score !== expected[i].score || band(got.score) !== expected[i].band) mismatches.push({ c, got: got.score, want: expected[i].score })
    })
    expect(mismatches).toEqual([])
  })
})

describe('band', () => {
  it.each([[85, 'STRONG BUY'], [84, 'BUY'], [69, 'BUY'], [68, 'HOLD'], [39, 'HOLD'], [38, 'TRIM/AVOID']])('%i is %s', (s, b) => {
    expect(band(s)).toBe(b)
  })
})

describe('scoreSetup', () => {
  const base = { price: 100, target: 130, rsi: 55, macdH: 1, brokenCount: 0 }

  it('scores TOOL from the nearest ladder level and DEFENDED from the best defended swing low', () => {
    const r = scoreSetup({
      ...base,
      ladder: [{ lvl: 99, held: 0 }],
      swings: [{ price: 80, held: 4, date: 'x' }, { price: 95, held: 0, date: 'y' }, { price: 120, held: 9, date: 'z' }],
    })
    expect(r.defended.level).toBe(80)
    expect(r.tool.score).toBeGreaterThan(r.defended.score) // an untested node 1% away flatters the tool score
  })

  it('reports no DEFENDED score when nothing below price was ever defended', () => {
    expect(scoreSetup({ ...base, ladder: [{ lvl: 90, held: 0 }], swings: [{ price: 90, held: 0, date: 'x' }] }).defended).toBeNull()
  })
})
