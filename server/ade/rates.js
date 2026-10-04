// How much a stock moves with the 10-year Treasury yield, measured, not hand-set: the Pearson
// correlation of daily stock returns with daily changes in the yield (^TNX) over up to two years.
// Negative means the stock falls when yields rise. ADE's own `rateSens` was a hand-typed 0-1 number.

const MIN_OBS = 150
const WINDOW = 500 // trading days

const day = t => new Date(t * 1000).toISOString().slice(0, 10)
const r2 = x => Math.round(x * 100) / 100
const sgn = x => (x < 0 ? '−' : '+') + Math.abs(x).toFixed(2)

function pearson(a, b) {
  const n = a.length
  const ma = a.reduce((s, x) => s + x, 0) / n
  const mb = b.reduce((s, x) => s + x, 0) / n
  let sab = 0, sa = 0, sb = 0
  for (let i = 0; i < n; i++) { sab += (a[i] - ma) * (b[i] - mb); sa += (a[i] - ma) ** 2; sb += (b[i] - mb) ** 2 }
  return sa && sb ? sab / Math.sqrt(sa * sb) : null
}

// |rho| above 2/sqrt(n) is significant at 95%; HIGH is about 1.7x that.
export const label = (rho, n) => {
  const a = Math.abs(rho)
  const sig = 2 / Math.sqrt(n)
  return a >= sig * 1.7 ? 'HIGH' : a >= sig ? 'MED' : 'LOW'
}

// stock and yield are candle arrays ({t, c}). Returns null when there is too little overlap.
export function rateSensitivity(stock, yields) {
  const y = new Map(yields.map(c => [day(c.t), c.c]))
  const pts = stock.map(c => ({ d: day(c.t), c: c.c })).filter(p => y.has(p.d) && p.c > 0).map(p => ({ ...p, y: y.get(p.d) })).slice(-(WINDOW + 1))
  const ret = [], dy = []
  for (let i = 1; i < pts.length; i++) { ret.push(Math.log(pts[i].c / pts[i - 1].c)); dy.push(pts[i].y - pts[i - 1].y) }
  if (ret.length < MIN_OBS) return null
  const rho = pearson(ret, dy)
  if (rho == null) return null
  const years = ret.length >= 400 ? '2y' : ret.length >= 200 ? '1y' : `${ret.length}d`
  const dir = rho < 0 ? 'falls when yields rise' : 'rises with yields'
  return { rateSens: r2(Math.abs(rho)), rateCorr: r2(rho), rateNote: `${label(rho, ret.length)} (${sgn(rho)} vs 10Y yield; ${dir}; ${years} daily)`, obs: ret.length }
}
