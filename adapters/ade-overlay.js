// Applies live Yahoo snapshots to ADE's dashboard data, and injects tickers a user added.
// Pure functions over plain objects, so they are unit-tested without rendering anything.
//
// What is overlaid on ADE's own tickers: price, 52w range, YTD/1Y, analyst targets and
// consensus, forward P/E, market cap, the support ladder and broken levels, moving averages,
// RSI/MACD, volume, fibs and pivots, and the verdict. What is NOT: ADE's written text (news,
// playbooks, risk cards, narrative). That text keeps the numbers it was written with, so it can
// disagree with the live figures until ADE's owner refreshes it. The dashboard shows a banner.

import { verdictFor } from '../server/ade/build.js'

const set = (obj, key, value) => { if (value !== null && value !== undefined) obj[key] = value }

function stamp(asOf) {
  return new Date(asOf).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const alignOf = (price, ma) =>
  ma.d50 && ma.d200 && price > ma.d50 && price > ma.d200 && ma.d50 > ma.d200 ? 'bullish'
    : ma.d50 && ma.d200 && price < ma.d50 && price < ma.d200 ? 'bearish' : 'mixed'

export function overlayTicker(block, snap) {
  const date = stamp(snap.asOf)
  set(block, 'price', snap.price)
  set(block, 'high52', snap.high52)
  set(block, 'low52', snap.low52)
  set(block, 'ytd', snap.ytd)
  set(block, 'yr1', snap.yr1)
  if (snap.avgPT != null) {
    block.avgPT = snap.avgPT
    set(block, 'highPT', snap.highPT)
    set(block, 'lowPT', snap.lowPT)
    block.ptDate = date
    block.ptVerified = true
  }
  set(block, 'consensus', snap.consensus)
  set(block, 'fwdPE', snap.fwdPE)
  set(block, 'mktCap', snap.mktCap)

  block.support = snap.support.map(({ lvl, label }) => ({ lvl, label }))
  block.brokenSup = snap.brokenSup
  block.supportDate = date
  block.supportVerified = true
  const first = snap.support[0]
  block.supportAnchor = `$${first.lvl.toFixed(2)} (${(((snap.price - first.lvl) / snap.price) * 100).toFixed(1)}%) nearest observed level, ${date}`
  block.supportNote = `Nearest observed support $${first.lvl.toFixed(2)}, ${(((snap.price - first.lvl) / snap.price) * 100).toFixed(1)}% below $${snap.price.toFixed(2)}. Swing lows and volume nodes from Yahoo daily candles, ${date}.`
  block.techVerified = true
  block.techDate = date

  block.tech ??= {}
  const t = block.tech
  t.ma ??= {}
  for (const k of ['d50', 'd100', 'd200', 'd400']) set(t.ma, k, snap.ma[k])
  t.ma.align = alignOf(snap.price, snap.ma)
  for (const b of t.ma.brk ?? []) set(b, 'p', snap.ma[`d${parseInt(b.ma, 10)}`])
  t.momentum ??= {}
  set(t.momentum, 'rsi', snap.rsi)
  if (snap.rsi != null) t.momentum.rsiZone = snap.rsi > 70 ? 'overbought' : snap.rsi < 35 ? 'oversold' : 'neutral'
  set(t.momentum, 'macd', snap.macd)
  set(t.momentum, 'roc', snap.roc)
  // Options: Yahoo's numbers replace ADE's computed ones; ADE-only fields (lastEarnMove, flow) stay.
  // Where Yahoo has nothing (no listed options, or a failed call) ADE's own options data is kept.
  if (snap.options) {
    block.options = { ...(block.options ?? {}), ...Object.fromEntries(Object.entries(snap.options).filter(([, v]) => v !== null)) }
    block.optionsDate = date
    block.optionsVerified = true
  }
  t.volume = { ...(t.volume ?? {}), ...snap.volume }
  t.levels = { ...(t.levels ?? {}), fibs: snap.fibs, pivots: snap.pivots }
  if (snap.scores) t.verdict = { ...(t.verdict ?? {}), ...verdictFor(snap) }
  return block
}

// S and LC are ADE's module-level objects (exported by a sync transform). Idempotent: tickers
// injected by an earlier call that are no longer in `live.added` are removed first.
export function applyLive(S, LC, live) {
  for (const k of Object.keys(S)) if (S[k].userAdded && !(k in live.added)) { delete S[k]; delete LC[k] }
  const overlaid = []
  const missing = []
  for (const [sym, snap] of Object.entries(live.overlay)) {
    if (!S[sym]) continue
    overlayTicker(S[sym], snap)
    LC[sym] = snap.price
    overlaid.push(sym)
  }
  for (const sym of Object.keys(S)) if (!S[sym].userAdded && !(sym in live.overlay)) missing.push(sym)
  const injected = []
  for (const [sym, { block, snapshot }] of Object.entries(live.added)) {
    S[sym] = block
    LC[sym] = snapshot.price
    injected.push(sym)
  }
  return { overlaid, missing, injected }
}
