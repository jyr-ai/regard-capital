// Turns the synced ADE dashboard into two small JSON files the app imports.
//
//   watchlist.json  [{ ticker, name }]                      feeds the Monitor watchlist tab
//   verdicts.json   { asOf, tickers: { MU: { ... } } }      ADE's own per-ticker verdict
//
// ADE's tools/rank.py would recompute scores, but it needs data/tickers.json, which ADE
// git-ignores. The dashboard already embeds the result of that scoring in every ticker
// block (`verdict:{score:77,label:"BUY ..."}`), so we read it from there: the number shown
// here is exactly the one ADE's dashboard shows.
//
// The dashboard is JSX, not data, so this is a regex reader. sync/contracts/ade.test.js
// fails the sync PR if the shapes it relies on go away.

import fs from 'node:fs'
import path from 'node:path'

const FILE = 'src/ade-portfolio-v6.jsx'
const BANDS = ['STRONG BUY', 'BUY', 'HOLD', 'TRIM/AVOID']

// ADE writes em dashes as the literal six characters — inside string literals.
const DASH = ' \\u2014'

// Ticker blocks inside `const S={ ... }` start at line start: `MU:{name:"Micron Technology",`.
// Lower-case keys (`pattern:{name:`, `self:{name:`) are nested objects, not tickers.
export function tickerBlocks(src) {
  const sStart = src.indexOf('const S={')
  const sEnd = src.search(/\n(?:export )?const LC=/)
  if (sStart < 0 || sEnd < 0) throw new Error('ADE: could not find `const S={` .. `const LC=` in the dashboard')
  const body = src.slice(sStart, sEnd)
  const starts = [...body.matchAll(/\n([A-Z][A-Z0-9_]{0,9}):\{name:"([^"]*)"/g)]
  return starts.map((m, i) => ({
    ticker: m[1],
    name: m[2],
    text: body.slice(m.index, i + 1 < starts.length ? starts[i + 1].index : body.length),
  }))
}

const num = (text, re) => {
  const m = text.match(re)
  return m ? Number(m[1]) : null
}

export function derive(adeDir) {
  const src = fs.readFileSync(path.join(adeDir, FILE), 'utf8')
  const blocks = tickerBlocks(src)

  const lc = {}
  const lcMatch = src.match(/\n(?:export )?const LC=\{([^}]*)\}/)
  if (lcMatch) for (const m of lcMatch[1].matchAll(/([A-Z][A-Z0-9_]*):(-?[\d.]+)/g)) lc[m[1]] = Number(m[2])

  const asOf = (src.match(/\nconst BANNER_DATE="(\d{4}-\d{2}-\d{2})"/) || [])[1] || null

  const tickers = {}
  for (const { ticker, name, text } of blocks) {
    const price = lc[ticker] ?? num(text, /[,{]price:(-?[\d.]+)/)
    const avgPT = num(text, /[,{]avgPT:(-?[\d.]+)/)
    const v = text.match(/verdict:\{score:(-?\d+),label:"([^"]*)"/)
    if (!v) continue
    const label = v[2]
    const band = label.split(DASH)[0].trim()
    const support = text.match(/support:\[\{lvl:([\d.]+),label:"([^"]*)"/)
    tickers[ticker] = {
      name,
      sector: (text.match(/[,{]sector:"([^"]*)"/) || [])[1] || null,
      price,
      avgPT,
      upsidePct: price && avgPT ? Math.round(((avgPT - price) / price) * 1000) / 10 : null,
      score: Number(v[1]),
      band,
      nearestSupport: support ? Number(support[1]) : null,
    }
  }

  const watchlist = blocks.map(({ ticker, name }) => ({ ticker, name }))
  return {
    'watchlist.json': JSON.stringify(watchlist, null, 2) + '\n',
    'verdicts.json': JSON.stringify({ asOf, tickers }, null, 2) + '\n',
  }
}

export { BANDS }
