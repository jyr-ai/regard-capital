// Applies live Yahoo snapshots to ADE's dashboard data, and injects tickers a user added.
// Pure functions over plain objects, so they are unit-tested without rendering anything.
//
// What is overlaid on ADE's own tickers: price, 52w range, YTD/1Y, analyst targets and
// consensus, forward P/E, rate sensitivity, next earnings date and EPS estimate, market cap, the
// support ladder and broken levels, moving averages, RSI/MACD, volume, fibs and pivots, and the
// verdict; plus the macro strip (overlayMacro). What is NOT: ADE's written text (news,
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

// "Nov 18, 2026 (TBC)" -> "Nov 18"; ADE writes catalyst dates this short way ("Nov 18", "Jul 22 \u2713").
const shortDate = str => { const m = /([A-Z][a-z]{2}) (\d{1,2})\b/.exec(String(str ?? '')); return m ? `${m[1]} ${Number(m[2])}` : null }

// Yahoo's next earnings date. It must still be ahead. It replaces ADE's when ADE's has no day ("Dec 2026"),
// is in the past or is marked TBC, or when Yahoo has the date confirmed. An estimate from Yahoo never overrides a
// date ADE wrote down, since Yahoo's estimates can be a week off. ADE's own catalyst entry for the same
// day moves with it, so the header and the calendar agree.
export function overlayEarnings(block, snap, date) {
  if (!snap.earningsDate) return
  const asOf = new Date(new Date(snap.asOf).toDateString())
  if (new Date(snap.earningsDate) < asOf) return
  // The consensus EPS is for the same upcoming report whichever date is right.
  if (snap.epsEst != null) { block.epsEst = snap.epsEst; block.epsEstDate = date }
  const old = String(block.earningsDate ?? '')
  const oldDay = /[A-Z][a-z]{2} \d{1,2},? \d{4}/.exec(old)
  const adeUsable = oldDay && new Date(oldDay[0]) >= asOf && !/TBC/i.test(old)
  if (adeUsable && snap.earningsEstimate) return
  const next = `${snap.earningsDate}${snap.earningsEstimate ? ' (TBC)' : ''}`
  const from = shortDate(old), to = shortDate(snap.earningsDate)
  if (from && to && from !== to) {
    for (const c of block.catalysts ?? []) if (shortDate(c.d) === from && c.i === 'high' && /earn|\bQ[1-4]\b/i.test(c.e) && !String(c.d).includes('\u2713')) c.d = to
  }
  block.earningsDate = next
}

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
  // Forward P/E and rate sensitivity: null is an answer ("n/a"), not a gap to fill with ADE's old number.
  block.fwdPE = snap.fwdPE ?? null
  block.fwdPENote = snap.fwdPENote ?? (snap.fwdPE == null ? 'n/a' : null)
  block.rateSens = snap.rateSens ?? null
  block.rateCorr = snap.rateCorr ?? null
  block.rateNote = snap.rateNote ?? null
  set(block, 'mktCap', snap.mktCap)
  overlayEarnings(block, snap, date)

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

const MACRO_FIELDS = ['spy', 'vix', 'dxy', 'oil', 'btc', 'gold', 'tnx', 'cpi', 'cpiPrior', 'fedFunds', 'rateOutlook', 'regime', 'color', 'note', 'macroDate']

// ADE's MACRO strip (S&P, VIX, dollar, oil, gold, bitcoin, CPI, Fed funds, regime and its note) is hand-typed
// text. Replace it field by field with the live strip; a field the sources could not give becomes null,
// which the dashboard shows as n/a, never ADE's old number. No live strip at all leaves ADE's untouched.
export function overlayMacro(MACRO, live) {
  if (!live) return false
  for (const k of MACRO_FIELDS) MACRO[k] = live[k] ?? null
  MACRO.regime ??= 'NO DATA'
  MACRO.color ??= '#9A8F82'
  MACRO.note ??= 'Live macro data was unavailable on the last refresh.'
  MACRO.macroDate ??= ''
  MACRO.rateOutlook ??= 'n/a'
  return true
}

// The line the dashboard prints above every ticker. It replaces ADE's hand-written "REFRESHED <date>" banner,
// which describes one day's numbers and is wrong the day after.
export function liveBanner({ refreshedAt, macroLive, adeAsOf, intelAt = null, now = new Date() }) {
  const t = new Date(refreshedAt)
  const when = Number.isNaN(+t) ? 'recently' : t.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
  const days = adeAsOf ? Math.max(0, Math.round((now - new Date(`${adeAsOf}T12:00:00Z`)) / 864e5)) : null
  const written = adeAsOf ? `ADE's written analysis (news, theses, risk cards) is from ${new Date(`${adeAsOf}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}${days > 0 ? `, ${days} day${days === 1 ? '' : 's'} ago` : ''}` : "ADE's written analysis is as ADE last published it"
  const intel = intelAt ? `News, playbooks, risks and catalysts written by Claude from dated headlines, ${new Date(intelAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}` : null
  return `LIVE · Yahoo Finance · refreshed ${when}. Prices, targets, support, indicators, options and scores update every weekday after the US close${macroLive ? '; so does the macro strip' : ''}. ${intel ?? written}.`
}

// Replaces ADE's "WHAT'S TRUSTED / WHAT'S ESTIMATED" footer, which describes the owner's brokerage
// screenshots and estimated technicals: neither is true of this app.
export const LEGEND = 'LIVE from Yahoo Finance, refreshed every weekday after the US close: prices, 52-week range, analyst targets and consensus, '
  + 'forward P/E (Nasdaq consensus when Yahoo has none), market cap, next earnings date, support levels, moving averages, RSI and MACD, volume, '
  + 'options (max pain, implied volatility, put/call, skew, implied move), rate sensitivity, verdict scores and the macro strip. IV rank and percentile fill in after 20 daily readings. '
  + 'WRITTEN BY CLAUDE from dated Google News and Yahoo Finance headlines plus the live numbers, refreshed daily: news (each item names its source and date), playbooks, risk cards, '
  + 'the fundamentals story and catalysts. A ticker with no intel yet shows ADE\'s last published text. NOT REFRESHED: ADE\'s peer tables and market themes. '
  + 'Ratings (STRONG BUY to AVOID) are ADE\'s formula over live data, never written by a model.'

// Claude-written intel (server/ade/intel.js) replaces ADE's hand-written text for one ticker: news feed,
// playbook, risk cards, fundamentals story and catalysts. Numbers, ratings and ADE's peer tables are untouched.
export function applyIntel(block, rec) {
  if (!rec?.intel) return false
  const it = rec.intel
  const date = stamp(rec.generatedAt)
  block.news = it.news.map(n => ({ ...n }))
  block.playbook = it.playbook.map(p => ({ ...p }))
  block.catalysts = it.catalysts.map(c => ({ ...c }))
  block.fund ??= {}
  const f = block.fund
  f.story = it.story
  f.drivers = it.drivers
  f.bull = { ...(f.bull ?? {}), path: it.bull }
  f.bear = { ...(f.bear ?? {}), path: it.bear }
  f.killer = it.killer
  f.activeRisks = it.risks
  f.watchlist = it.watchlist
  f.thesisDate = date
  f.riskDate = date
  block.fundDate = date
  block.fundVerified = false // model-written: the FUND badge stays amber
  block.intelBy = `Claude, from ${rec.headlineCount} dated headlines, ${date}`
  return true
}

// Tickers a profile hid are moved out of S (and back when shown again), so every view, count and the
// catalyst calendar skip them. ADE's data itself is never changed.
const HIDDEN = { S: {}, LC: {}, order: null }
function applyHidden(S, LC, hidden = []) {
  HIDDEN.order ??= Object.keys(S).filter(k => !S[k].userAdded) // ADE's own tab order, captured before anything is hidden
  let restored = false
  for (const k of Object.keys(HIDDEN.S)) if (!hidden.includes(k)) { S[k] = HIDDEN.S[k]; LC[k] = HIDDEN.LC[k]; delete HIDDEN.S[k]; delete HIDDEN.LC[k]; restored = true }
  if (restored) {
    // Re-insert in ADE's order (object keys keep insertion order, and the dashboard's tabs follow it).
    const rank = k => { const i = HIDDEN.order.indexOf(k); return i < 0 ? Infinity : i }
    for (const k of Object.keys(S).sort((a, b) => rank(a) - rank(b))) { const v = S[k]; delete S[k]; S[k] = v }
  }
  for (const k of hidden) if (S[k] && !S[k].userAdded) { HIDDEN.S[k] = S[k]; HIDDEN.LC[k] = LC[k]; delete S[k]; delete LC[k] }
  return Object.keys(HIDDEN.S)
}

// S and LC are ADE's module-level objects (exported by a sync transform). Idempotent: tickers
// injected by an earlier call that are no longer in `live.added` are removed first.
export function applyLive(S, LC, live, { MACRO = null, adeAsOf = null, now = new Date() } = {}) {
  applyHidden(S, LC, []) // restore every hidden ticker first, so it is overlaid with today's data too
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
  const withIntel = []
  for (const [sym, rec] of Object.entries(live.intel ?? {})) if (S[sym] && applyIntel(S[sym], rec)) withIntel.push(sym)
  const hidden = applyHidden(S, LC, live.hidden)
  const intelAt = withIntel.length ? Object.values(live.intel).map(r => r.generatedAt).sort().at(-1) : null
  const macro = MACRO ? overlayMacro(MACRO, live.macro) : false
  // Read by the dashboard through a sync transform (globalThis, so the app does not import a name ADE could rename).
  globalThis.__ADE_LIVE__ = {
    banner: liveBanner({ refreshedAt: live.refreshedAt, macroLive: macro, adeAsOf, intelAt, now }),
    legend: LEGEND,
    adeDate: adeAsOf ? new Date(`${adeAsOf}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : null,
  }
  return { overlaid, missing, injected, macro, hidden, withIntel }
}
