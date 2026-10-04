// Technical indicators and ADE's observed-support rules, from daily candles.
// A candle is { t: epochSeconds, o, h, l, c, v }. Pure functions, no I/O.
//
// Support follows upstream/ade/.claude/skills/ade-support-resistance: it is only
// OBSERVED price history (swing lows and high-volume nodes). Moving averages, pivots,
// max pain and round numbers are never support.

const avg = xs => xs.reduce((a, b) => a + b, 0) / xs.length
const r2 = x => Math.round(x * 100) / 100
const isoDate = t => new Date(t * 1000).toISOString().slice(0, 10)

export const closes = candles => candles.map(c => c.c)

export function sma(values, n) {
  return values.length >= n ? avg(values.slice(-n)) : null
}

// Wilder's RSI.
export function rsi(values, n = 14) {
  if (values.length <= n) return null
  let gain = 0
  let loss = 0
  for (let i = 1; i <= n; i++) {
    const d = values[i] - values[i - 1]
    if (d >= 0) gain += d
    else loss -= d
  }
  gain /= n
  loss /= n
  for (let i = n + 1; i < values.length; i++) {
    const d = values[i] - values[i - 1]
    gain = (gain * (n - 1) + Math.max(d, 0)) / n
    loss = (loss * (n - 1) + Math.max(-d, 0)) / n
  }
  return loss === 0 ? 100 : 100 - 100 / (1 + gain / loss)
}

export function ema(values, n) {
  if (values.length < n) return []
  const k = 2 / (n + 1)
  const out = [avg(values.slice(0, n))]
  for (let i = n; i < values.length; i++) out.push(values[i] * k + out[out.length - 1] * (1 - k))
  return out // out[j] is the EMA at values index j + n - 1
}

// MACD(12,26,9): line, signal, histogram, and the sign of the histogram as the cross.
export function macd(values) {
  const e12 = ema(values, 12)
  const e26 = ema(values, 26)
  if (!e26.length) return null
  const line = e26.map((v, j) => e12[j + 14] - v) // align EMA12 (offset 11) to EMA26 (offset 25)
  const sig = ema(line, 9)
  if (!sig.length) return null
  const v = line[line.length - 1]
  const s = sig[sig.length - 1]
  const h = v - s
  return { v: r2(v), s: r2(s), h: r2(h), cross: h >= 0 ? 'bullish' : 'bearish' }
}

// Local minima with `side` lower-or-equal bars on each side, within the last `lookback`
// bars. `held` counts later bounces: a low within 2% above the level whose close stayed
// above it, at least 5 bars apart.
export function swingLows(candles, { lookback = 250, side = 10 } = {}) {
  const start = Math.max(side, candles.length - lookback)
  const found = []
  for (let i = start; i < candles.length - side; i++) {
    const low = candles[i].l
    let isMin = true
    for (let k = i - side; k <= i + side; k++) {
      if (k !== i && candles[k].l < low) { isMin = false; break }
    }
    if (!isMin) continue
    let held = 0
    let last = i
    for (let k = i + side + 1; k < candles.length; k++) {
      const { l, c } = candles[k]
      if (k - last >= 5 && l <= low * 1.02 && l >= low * 0.98 && c >= low * 0.99) { held++; last = k }
    }
    found.push({ price: r2(low), held, date: isoDate(candles[i].t) })
  }
  // Merge clusters within 1.5%: the strongest (most held, then most recent) represents them.
  found.sort((a, b) => a.price - b.price)
  const merged = []
  for (const s of found) {
    const prev = merged[merged.length - 1]
    if (prev && s.price <= prev.price * 1.015) {
      if (s.held > prev.held || (s.held === prev.held && s.date > prev.date)) merged[merged.length - 1] = { ...s, held: Math.max(s.held, prev.held) }
    } else merged.push(s)
  }
  return merged
}

// High-volume price levels: 1% bins of volume over the last `lookback` bars; local
// maxima holding at least 1.5x the average bin volume. Nodes never count as defended.
export function volumeNodes(candles, { lookback = 250 } = {}) {
  const recent = candles.slice(-lookback)
  if (recent.length < 20) return []
  const last = recent[recent.length - 1].c
  const binW = last * 0.01
  const bins = new Map()
  for (const c of recent) {
    const typical = (c.h + c.l + c.c) / 3
    const k = Math.round(typical / binW)
    bins.set(k, (bins.get(k) || 0) + c.v)
  }
  const keys = [...bins.keys()].sort((a, b) => a - b)
  const mean = avg([...bins.values()])
  const nodes = []
  for (const k of keys) {
    const v = bins.get(k)
    if (v >= mean * 1.5 && v >= (bins.get(k - 1) || 0) && v >= (bins.get(k + 1) || 0)) nodes.push({ price: r2(k * binW), volume: v })
  }
  return nodes
}

// ADE's ladder: up to 3 levels between 60% and 99% of price, nearest first, skipping any
// within 2% of one already chosen, padded with derived steps 7% below the last. A level
// closer than 1% is the bin price is sitting in, not support (and ADE's health check
// rejects levels at or above price).
export function supportLadder(price, swings, nodes) {
  const cand = [
    ...swings.map(s => ({ lvl: s.price, held: s.held, kind: 'swing', date: s.date })),
    ...nodes.map(n => ({ lvl: n.price, held: 0, kind: 'node' })),
  ]
    .filter(c => c.lvl <= price * 0.99 && c.lvl > price * 0.6)
    .sort((a, b) => b.lvl - a.lvl)
  const out = []
  for (const c of cand) {
    if (out.length === 3) break
    if (out.some(o => Math.abs(o.lvl - c.lvl) / o.lvl < 0.02)) continue
    out.push(c)
  }
  const ladder = out.map(c => ({
    lvl: c.lvl,
    held: c.held,
    label: c.kind === 'swing'
      ? `Swing low ${c.date} — held ${c.held}x`
      : `Volume node — ${(((price - c.lvl) / price) * 100).toFixed(1)}% below`,
  }))
  while (ladder.length < 3) {
    const base = ladder.length ? ladder[ladder.length - 1].lvl : price
    ladder.push({ lvl: r2(base * 0.93), held: 0, label: 'Step below — derived' })
  }
  return ladder
}

// Former supports now above price: resistance. Nearest first, at most 6.
export function brokenSupports(price, swings) {
  return swings
    .filter(s => s.price > price * 1.005)
    .sort((a, b) => a.price - b.price)
    .slice(0, 6)
    .map(s => ({ lvl: s.price, held: s.held, date: s.date }))
}

export function fibs(high52, low52) {
  const at = f => r2(low52 + (high52 - low52) * f)
  return [
    { r: '0%', p: low52, l: '52w low' },
    { r: '38.2%', p: at(0.382), l: 'Shallow' },
    { r: '50%', p: at(0.5), l: 'Midpoint' },
    { r: '61.8%', p: at(0.618), l: 'Deep' },
    { r: '100%', p: high52, l: '52w high' },
  ]
}

// Classic pivots from the last completed bar.
export function pivots(bar) {
  const pp = (bar.h + bar.l + bar.c) / 3
  const range = bar.h - bar.l
  return { r2: r2(pp + range), r1: r2(2 * pp - bar.l), p: r2(pp), s1: r2(2 * pp - bar.h), s2: r2(pp - range) }
}

const fmtVol = v => (v >= 1e9 ? `${r2(v / 1e9)}B` : v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : `${Math.round(v / 1e3)}K`)

export function volumeStats(candles) {
  const vols = candles.map(c => c.v)
  const a50 = avg(vols.slice(-50))
  const recent = avg(vols.slice(-5))
  const lastBar = candles[candles.length - 1]
  // OBV direction over the last 20 bars.
  let obv = 0
  const obvSeries = [0]
  for (let i = 1; i < candles.length; i++) {
    obv += candles[i].c > candles[i - 1].c ? candles[i].v : candles[i].c < candles[i - 1].c ? -candles[i].v : 0
    obvSeries.push(obv)
  }
  const obvDelta = obvSeries[obvSeries.length - 1] - obvSeries[Math.max(0, obvSeries.length - 21)]
  // Accumulation/distribution: where the last 20 closes sit inside their daily ranges.
  const clv = candles.slice(-20).map(c => (c.h === c.l ? 0 : (c.c - c.l - (c.h - c.c)) / (c.h - c.l)))
  const ad = avg(clv)
  return {
    avg: fmtVol(a50),
    recent: fmtVol(recent),
    ratio: r2(recent / a50),
    obv: obvDelta > 0 ? 'rising' : 'falling',
    accDist: ad > 0.15 ? 'accumulation' : ad < -0.15 ? 'distribution' : 'neutral',
    lastDay: fmtVol(lastBar.v),
    lastDayX: r2(lastBar.v / a50),
    volDate: new Date(lastBar.t * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }),
  }
}

// Everything the ADE dashboard's tech/support fields need, from candles.
export function analyse(candles) {
  if (candles.length < 60) throw new Error(`need at least 60 daily candles, got ${candles.length}`)
  const cl = closes(candles)
  const price = cl[cl.length - 1]
  const year = candles.slice(-252)
  const high52 = Math.max(...year.map(c => c.h))
  const low52 = Math.min(...year.map(c => c.l))
  const swings = swingLows(candles)
  const nodes = volumeNodes(candles)
  const d50 = sma(cl, 50)
  const d100 = sma(cl, 100)
  const d200 = sma(cl, 200)
  const d400 = sma(cl, 400)
  const m = macd(cl)
  const rsi14 = rsi(cl)
  const yearStart = candles.find(c => new Date(c.t * 1000).getUTCFullYear() === new Date(candles[candles.length - 1].t * 1000).getUTCFullYear())
  const roc = cl.length > 10 ? ((price - cl[cl.length - 11]) / cl[cl.length - 11]) * 100 : 0
  return {
    price: r2(price),
    high52: r2(high52),
    low52: r2(low52),
    ytd: yearStart ? Math.round(((price - yearStart.o) / yearStart.o) * 100) : null,
    yr1: year.length >= 200 ? Math.round(((price - year[0].c) / year[0].c) * 100) : null,
    ma: { d50: d50 && Math.round(d50), d100: d100 && Math.round(d100), d200: d200 && Math.round(d200), d400: d400 && Math.round(d400) },
    rsi: rsi14 === null ? null : Math.round(rsi14 * 10) / 10,
    macd: m,
    roc: Math.round(roc * 10) / 10,
    swings,
    nodes,
    support: supportLadder(price, swings, nodes),
    brokenSup: brokenSupports(price, swings),
    fibs: fibs(r2(high52), r2(low52)),
    pivots: pivots(candles[candles.length - 2] || candles[candles.length - 1]),
    volume: volumeStats(candles),
    asOfBar: isoDate(candles[candles.length - 1].t),
  }
}
