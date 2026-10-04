// Turns Yahoo data into (1) a compact snapshot that overlays ADE's existing tickers and
// (2) a complete ADE dashboard block for a ticker a user adds. The scoring is ADE's own
// (score.js, parity-tested against rank.py); numbers come from Yahoo, never from a model.

import { analyse } from './indicators.js'
import { rateSensitivity } from './rates.js'
import { band, scoreSetup } from './score.js'
import { forwardPE } from './valuation.js'
import { raw } from './yahoo.js'

// Verdict colours as they appear in the recoloured ADE file (sync/transforms/ade-colors.json).
const BAND_COLOR = { 'STRONG BUY': '#B266FF', BUY: '#3DBFA8', HOLD: '#FFBF00', 'TRIM/AVOID': '#E8643A' }

const money = x => `$${Number(x).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const n0 = x => `$${Math.round(x).toLocaleString('en-US')}`
const pct = (x, d = 1) => `${x >= 0 ? '+' : ''}${x.toFixed(d)}%`
const dateLong = d => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
const r1 = x => Math.round(x * 10) / 10

export function fmtMktCap(v) {
  if (!v) return null
  if (v >= 1e12) return `$${(v / 1e12).toFixed(2)}T`
  if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}B`
  return `$${Math.round(v / 1e6)}M`
}

const CONSENSUS = { strong_buy: 'Strong Buy', buy: 'Buy', hold: 'Hold', underperform: 'Sell', sell: 'Sell', strong_sell: 'Sell' }

// `nasdaq` (consensus EPS by fiscal year) and `yields` (^TNX candles) are optional extras: without them
// the forward P/E falls back to Yahoo alone and the rate sensitivity is simply absent.
export function buildSnapshot({ symbol, candles, meta, summary, options = null, nasdaq = null, yields = null }, { now = new Date() } = {}) {
  const a = analyse(candles)
  const fd = summary?.financialData ?? {}
  const sd = summary?.summaryDetail ?? {}
  const price = summary?.price ?? {}
  const avgPT = raw(fd.targetMeanPrice)
  const earningsTs = summary?.calendarEvents?.earnings?.earningsDate?.map(raw).filter(Boolean)?.[0]
  const fwd = forwardPE({ price: a.price, summaryDetail: sd, keyStats: summary?.defaultKeyStatistics, nasdaq, now })
  const rate = yields ? rateSensitivity(candles, yields) : null
  const revenue = raw(fd.totalRevenue)
  const fcf = raw(fd.freeCashflow)

  // Without analyst coverage there is no target: score the setup with zero upside and say so.
  const target = avgPT ?? a.price
  const scores = a.rsi == null || !a.macd
    ? null
    : scoreSetup({ price: a.price, target, ladder: a.support, swings: a.swings, rsi: a.rsi, macdH: a.macd.h, brokenCount: a.brokenSup.length })

  return {
    symbol,
    name: price.longName || price.shortName || meta?.longName || meta?.shortName || symbol,
    asOf: now.toISOString(),
    barDate: a.asOfBar,
    price: a.price,
    high52: a.high52,
    low52: a.low52,
    ytd: a.ytd,
    yr1: a.yr1,
    avgPT: avgPT == null ? null : Math.round(avgPT * 100) / 100,
    highPT: raw(fd.targetHighPrice),
    lowPT: raw(fd.targetLowPrice),
    analysts: raw(fd.numberOfAnalystOpinions),
    consensus: CONSENSUS[fd.recommendationKey] ?? null,
    fwdPE: fwd.pe,
    fwdPEBasis: fwd.basis,
    fwdPENote: fwd.note,
    ...(rate ? { rateSens: rate.rateSens, rateCorr: rate.rateCorr, rateNote: rate.rateNote } : {}),
    mktCap: fmtMktCap(raw(price.marketCap) ?? raw(sd.marketCap)),
    sector: summary?.assetProfile?.sector ?? null,
    earningsDate: earningsTs ? dateLong(earningsTs * 1000) : null,
    earningsEstimate: earningsTs ? Boolean(raw(summary?.calendarEvents?.earnings?.isEarningsDateEstimate)) : null,
    epsEst: raw(summary?.calendarEvents?.earnings?.earningsAverage),
    metrics: {
      revGrowth: raw(fd.revenueGrowth) == null ? null : Math.round(raw(fd.revenueGrowth) * 100),
      grossMargin: raw(fd.grossMargins) == null ? null : Math.round(raw(fd.grossMargins) * 100),
      opMargin: raw(fd.operatingMargins) == null ? null : Math.round(raw(fd.operatingMargins) * 100),
      netMargin: raw(fd.profitMargins) == null ? null : Math.round(raw(fd.profitMargins) * 100),
      fcfMargin: revenue && fcf != null ? r1((fcf / revenue) * 100) : null,
      roe: raw(fd.returnOnEquity) == null ? null : Math.round(raw(fd.returnOnEquity) * 100),
      debtEquity: raw(fd.debtToEquity) == null ? null : r1(raw(fd.debtToEquity) / 100),
    },
    options, // null when the ticker has no listed options or Yahoo failed: callers keep ADE's own values
    ma: a.ma,
    rsi: a.rsi,
    macd: a.macd,
    roc: a.roc,
    volume: a.volume,
    fibs: a.fibs,
    pivots: a.pivots,
    support: a.support,
    brokenSup: a.brokenSup,
    // The swing lows that matter for the DEFENDED score and the ladder; capped to keep the snapshot small.
    swings: a.swings.filter(s => s.price < a.price * 1.3).slice(-16),
    scores: scores && {
      tool: scores.tool.score,
      band: scores.band,
      defended: scores.defended?.score ?? null,
      defendedLevel: scores.defended?.level ?? null,
      defendedHeld: scores.defended?.held ?? null,
      noTarget: avgPT == null,
    },
  }
}

// ---- ADE-style generated text (numbers only; same shape as ADE's own drivers/playbook) ----

function alignOf(price, ma) {
  if (ma.d50 && ma.d200) {
    if (price > ma.d50 && price > ma.d200 && ma.d50 > ma.d200) return 'bullish'
    if (price < ma.d50 && price < ma.d200) return 'bearish'
  }
  return 'mixed'
}

const rsiZone = rsi => (rsi > 70 ? 'overbought' : rsi < 35 ? 'oversold' : 'neutral')

export function verdictFor(s) {
  const sc = s.scores?.tool ?? 0
  const b = s.scores?.band ?? band(sc)
  const first = s.support[0]
  const dist = ((s.price - first.lvl) / s.price) * 100
  const aboveBelow = (p, d) => (p ? `${s.price >= p ? 'above' : 'below'} ${d} ${n0(p)} (${pct(((s.price - p) / p) * 100)})` : null)
  const drivers = [
    money(s.price) + '.',
    [aboveBelow(s.ma.d50, '50d'), aboveBelow(s.ma.d200, '200d')].filter(Boolean).join(', ').replace(/^./, c => c.toUpperCase()) + '.',
    s.rsi != null ? `RSI ${s.rsi} ${rsiZone(s.rsi)}.` : null,
    s.macd ? `MACD histogram ${s.macd.h >= 0 ? '+' : ''}${s.macd.h.toFixed(2)} (${s.macd.cross === 'bullish' ? 'improving' : 'weakening'}).` : null,
    `Nearest observed support ${money(first.lvl)}, ${dist.toFixed(1)}% below${first.held ? `, held ${first.held}x` : ''}.`,
    s.earningsDate ? `Next earnings ${s.earningsDate}.` : null,
  ].filter(Boolean).join(' ')
  return { score: sc, label: `${b} — ${s.macd?.h >= 0 ? 'MACD+' : 'MACD-'}`, c: 'y', drivers }
}

const HORIZONS = ['1 WEEK', '1 MONTH', '3 MONTHS', '6 MONTHS', '1 YEAR']

function playbook(s) {
  const v = verdictFor(s)
  const b = s.scores?.band ?? 'HOLD'
  const first = s.support[0]
  const dist = (((s.price - first.lvl) / s.price) * 100).toFixed(1)
  const up = s.avgPT ? pct(((s.avgPT - s.price) / s.price) * 100, 0) : 'no analyst target'
  const base = `${s.symbol} ${n0(s.price)} — ${b} (${v.score}). Nearest support ${money(first.lvl)}, ${dist}% below, held ${first.held}x. ${up}${s.avgPT ? ` to ${n0(s.avgPT)} consensus` : ''}. RSI ${s.rsi ?? 'n/a'}.`
  return HORIZONS.map(h => ({
    h,
    bias: base,
    color: BAND_COLOR[b],
    thesis: `${s.symbol} ${n0(s.price)} (${b} ${v.score}). ${v.drivers}`,
    action: `${b} (${v.score}). Watch ${money(first.lvl)}, ${dist}% below${first.held ? `, held ${first.held}x` : ' (never defended)'}. ${s.scores?.defended != null ? `Defended-level score ${s.scores.defended}.` : 'No defended level below price.'}`,
  }))
}

// The Options view does arithmetic on these, so they must be numbers. With no listed options we
// anchor everything to the stock price and today, and optionsVerified:false marks the panel unverified.
function optionsBlock(s, asOf) {
  if (s.options) return { ...s.options, lastEarnMove: null, flow: [] }
  const today = new Date(asOf).toISOString().slice(0, 10)
  return {
    ivRank: null, ivPctl: null, impliedMove: null, skew: null, lastEarnMove: null, pcRatio: null, flow: [],
    maxPain: Math.round(s.price), maxPainExp: today, maxPainDTE: 0, maxPainOI: 0,
    maxPainNear: Math.round(s.price), maxPainNearExp: today, maxPainNearDTE: 0,
    atmIV: 0, atmIVExp: today, ivObs: 0,
  }
}

const NOTE = 'Added from Yahoo Finance data. ADE’s written analysis covers only its tracked names, so this entry has scores and levels but no narrative.'

// A complete ADE ticker block. `prose` (optional) is model-drafted narrative; without it
// the narrative fields hold an honest placeholder. Nothing here is marked verified.
export function buildBlock(s, prose = null, { today = new Date() } = {}) {
  const asOf = dateLong(today)
  const first = s.support[0]
  const v = verdictFor(s)
  const m = s.metrics
  return {
    name: s.name,
    price: s.price,
    avgPT: s.avgPT ?? s.price,
    highPT: s.highPT ?? s.avgPT ?? s.price,
    ptDate: asOf,
    ptVerified: s.avgPT != null,
    lowPT: s.lowPT ?? s.avgPT ?? s.price,
    high52: s.high52,
    low52: s.low52,
    fwdPE: s.fwdPE ?? null,
    fwdPENote: s.fwdPENote ?? null,
    ...(s.rateNote ? { rateSens: s.rateSens, rateCorr: s.rateCorr, rateNote: s.rateNote } : {}),
    mktCap: s.mktCap ?? 'n/a',
    ytd: s.ytd ?? 0,
    yr1: s.yr1 ?? 0,
    consensus: s.consensus ?? 'n/a',
    earningsDate: s.earningsDate ? `${s.earningsDate}${s.earningsEstimate ? ' (TBC)' : ''}` : 'TBC',
    epsEst: s.epsEst ?? null,
    epsEstDate: asOf,
    sector: s.sector ?? 'Unclassified',
    userAdded: true,
    support: s.support.map(({ lvl, label }) => ({ lvl, label })),
    supportDate: asOf,
    brokenSup: s.brokenSup,
    supportVerified: true,
    supportAnchor: `${money(first.lvl)} observed levels, nearest first, ${asOf}`,
    techVerified: true,
    techDate: asOf,
    supportNote: `Nearest observed support ${money(first.lvl)}, ${(((s.price - first.lvl) / s.price) * 100).toFixed(1)}% below ${money(s.price)}. Swing lows and volume nodes from Yahoo daily candles, ${asOf}.`,
    news: [],
    options: optionsBlock(s, asOf),
    optionsDate: s.options ? asOf : 'n/a',
    optionsVerified: Boolean(s.options),
    tech: {
      ma: {
        ...s.ma,
        align: alignOf(s.price, s.ma),
        brk: [['50d', s.ma.d50], ['100d', s.ma.d100], ['200d', s.ma.d200]].filter(([, p]) => p).map(([d, p]) => ({
          ma: d, p, above: `Above ${d}. Trend intact on this horizon.`, below: `Below ${d}. Momentum cooling on this horizon.`,
        })),
      },
      momentum: { rsi: s.rsi ?? 50, rsiZone: rsiZone(s.rsi ?? 50), macd: s.macd ?? { v: 0, s: 0, h: 0, cross: 'bullish' }, roc: s.roc },
      volume: s.volume,
      levels: { fibs: s.fibs, pivots: s.pivots },
      pattern: {
        name: alignOf(s.price, s.ma) === 'bullish' ? 'Uptrend' : alignOf(s.price, s.ma) === 'bearish' ? 'Downtrend' : 'Mixed trend',
        target: s.avgPT ?? s.price,
        dir: s.avgPT && s.avgPT < s.price ? 'down' : 'up',
        note: `${money(s.price)}. RSI ${s.rsi ?? 'n/a'}, ${s.price >= (s.ma.d50 ?? 0) ? 'above' : 'below'} 50d, ${s.price >= (s.ma.d200 ?? 0) ? 'above' : 'below'} 200d.`,
      },
      verdict: v,
    },
    fundVerified: false,
    fundDate: asOf,
    fund: {
      story: prose?.story ?? NOTE,
      drivers: prose?.drivers ?? [],
      flow: prose?.flow ?? { inst: 'n/a', retail: 'n/a', short: 'n/a' },
      bull: { path: prose?.bull ?? 'No narrative drafted.', price: s.avgPT ? `${n0(s.avgPT)}-${n0(s.highPT ?? s.avgPT)}` : 'n/a' },
      bear: { path: prose?.bear ?? 'No narrative drafted.', price: `${n0(s.lowPT ?? first.lvl)}-${n0(first.lvl)}` },
      activeRisks: prose?.risks ?? [],
      killer: prose?.killer ?? 'Not set. Write a company-specific falsifier before acting (docs/DECISION-LOG.md).',
      revMix: [],
      compPos: { xLabel: '', yLabel: '', peers: [] },
      mgmt: { beats: 0, misses: 0, streak: 'n/a', note: 'No earnings history loaded.' },
      metrics: { ...Object.fromEntries(Object.entries(m).filter(([, x]) => x != null)), lastQ: 'Yahoo Finance, trailing' },
      watchlist: prose?.watchlist ?? [],
      thesisDate: asOf, techDate: asOf, valDate: asOf, ptDate: asOf, riskDate: asOf,
    },
    catalysts: s.earningsDate ? [{ d: s.earningsDate, e: `${s.symbol} earnings`, i: 'high', iv: 'med', hm: 'N/A' }] : [],
    peers: [],
    playbook: playbook(s),
  }
}
