// ADE's 0-100 timing score. A direct port of score() and band() in
// upstream/ade/tools/rank.py (mirrored from computeSignal() in the dashboard).
// server/ade/score.test.js checks it against rank.py itself on the same inputs, so a
// change to ADE's formula fails the sync PR instead of silently diverging.

export function band(score) {
  return score > 84 ? 'STRONG BUY' : score >= 69 ? 'BUY' : score >= 39 ? 'HOLD' : 'TRIM/AVOID'
}

const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x))

// Python's round() is banker's rounding; JS Math.round is half-up. Match Python.
function pyRound(x) {
  const f = Math.floor(x)
  const d = x - f
  if (Math.abs(d - 0.5) < 1e-12) return f % 2 === 0 ? f : f + 1
  return Math.round(x)
}

export function score({ price, target, level, held, rsi, macdH, broken }) {
  const upside = ((target - price) / price) * 100
  const rr = (target - price) / Math.max(price - level, price * 0.03)
  const dist = ((price - level) / price) * 100
  const supq = clamp(((30 - Math.min(30, dist)) / 30) * 0.6 + (Math.min(6, held) / 6) * 0.4, 0, 1)
  const mom = clamp(((70 - rsi) / 35) * 0.65 + (macdH > 0 ? 0.35 : 0), 0, 1)
  const struct = clamp(1 - broken * 0.2, 0, 1)
  const raw = clamp(upside / 50, -1, 1) * 0.3 + Math.min(1, rr / 6) * 0.28 + supq * 0.17 + mom * 0.15 + struct * 0.1
  return { score: pyRound(raw * 100), upside, rr, dist }
}

// TOOL score (nearest ladder level) and DEFENDED score (best defended swing low).
export function scoreSetup({ price, target, ladder, swings, rsi, macdH, brokenCount }) {
  const first = ladder[0]
  const tool = score({ price, target, level: first.lvl, held: first.held, rsi, macdH, broken: brokenCount })

  let best = null
  let bestQ = -1
  for (const s of swings) {
    if (s.price >= price || s.held < 1) continue
    const dist = ((price - s.price) / price) * 100
    const q = Math.max(0, (30 - Math.min(30, dist)) / 30) * 0.6 + (Math.min(6, s.held) / 6) * 0.4
    if (q > bestQ) { bestQ = q; best = s }
  }
  const defended = best
    ? { ...score({ price, target, level: best.price, held: best.held, rsi, macdH, broken: brokenCount }), level: best.price, held: best.held }
    : null
  return { tool, defended, band: band(tool.score) }
}
