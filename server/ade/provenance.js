// Where every field of an ADE ticker block comes from, for ADE's own tickers (overlaid with live
// data) and for tickers a user adds. server/ade/provenance.test.js fails if a field exists that is
// not classified here, so a made-up default cannot slip in unlabelled.
//
//   live         a number Yahoo returned, shown as-is
//   computed     derived by us from live Yahoo data (indicators, support, scores, option metrics)
//   stale        ADE's published value, not refreshed: true when ADE wrote it, may be old
//   ai           drafted by Claude from live numbers, marked unverified
//   generated    text templated from live numbers (same style as ADE's own playbooks)
//   empty        nothing is shown: Yahoo has no source and we do not invent one
//   placeholder  a neutral value the dashboard needs to render; NOT real data (see `note`)

export const FIELDS = {
  name:            { existing: 'stale',    added: 'live',        note: 'company name' },
  price:           { existing: 'live',     added: 'live',        note: 'last daily close' },
  avgPT:           { existing: 'live',     added: 'live',        note: 'mean analyst target; placeholder (= price) when Yahoo has none, flagged "PT ESTIMATED"' },
  highPT:          { existing: 'live',     added: 'live' },
  lowPT:           { existing: 'live',     added: 'live' },
  ptDate:          { existing: 'computed', added: 'computed',    note: 'date of the refresh' },
  ptVerified:      { existing: 'computed', added: 'computed',    note: 'true only when Yahoo returned a target' },
  high52:          { existing: 'computed', added: 'computed',    note: 'from daily candles' },
  low52:           { existing: 'computed', added: 'computed' },
  fwdPE:           { existing: 'live',     added: 'placeholder', note: 'Yahoo returns none for loss-making companies; added tickers show 0.0x' },
  mktCap:          { existing: 'live',     added: 'live' },
  ytd:             { existing: 'computed', added: 'computed' },
  yr1:             { existing: 'computed', added: 'computed' },
  consensus:       { existing: 'live',     added: 'live',        note: 'n/a when Yahoo has none' },
  earningsDate:    { existing: 'stale',    added: 'live',        note: 'ADE keeps its own wording ("Dec 2026 (Q1 FY27)")' },
  epsEst:          { existing: 'stale',    added: 'live' },
  epsEstDate:      { existing: 'stale',    added: 'computed' },
  sector:          { existing: 'stale',    added: 'live' },
  userAdded:       { existing: 'stale',    added: 'computed',    note: 'marks a user-added ticker' },
  support:         { existing: 'computed', added: 'computed',    note: "swing lows + volume nodes from candles, ADE's rules" },
  supportDate:     { existing: 'computed', added: 'computed' },
  brokenSup:       { existing: 'computed', added: 'computed' },
  supportVerified: { existing: 'computed', added: 'computed' },
  supportAnchor:   { existing: 'computed', added: 'computed' },
  techVerified:    { existing: 'computed', added: 'computed' },
  techDate:        { existing: 'computed', added: 'computed' },
  supportNote:     { existing: 'computed', added: 'computed' },
  rateSens:        { existing: 'stale',    added: 'empty',       note: 'ADE hand-sets it; Yahoo has no such field, so added tickers get none (it feeds ADE\'s score, so a made-up value would distort it)' },
  news:            { existing: 'stale',    added: 'empty',       note: 'no news feed: ADE\'s news is hand-written; Monitor shows live headlines separately' },
  options:         { existing: 'computed', added: 'computed',    note: 'from Yahoo option chains; IV rank/percentile null until 20 daily IV readings exist; placeholders (spot, today) when a ticker has no listed options, flagged ESTIMATED' },
  optionsDate:     { existing: 'computed', added: 'computed' },
  optionsVerified: { existing: 'computed', added: 'computed' },
  tech:            { existing: 'computed', added: 'computed',    note: 'MAs, RSI, MACD, volume, fibs, pivots, verdict score from candles' },
  fundVerified:    { existing: 'stale',    added: 'computed',    note: 'false for added tickers: narrative is unverified' },
  fundDate:        { existing: 'stale',    added: 'computed' },
  fund:            { existing: 'stale',    added: 'ai',          note: 'margins/growth/ROE are live (Yahoo financialData); story, drivers, risks are Claude-drafted and unverified, or a placeholder without an API key' },
  catalysts:       { existing: 'stale',    added: 'live',        note: 'added tickers: the next earnings date only' },
  peers:           { existing: 'stale',    added: 'empty' },
  // Irregular fields that exist on only 1-3 of ADE's tickers. Hand-written, not refreshed.
  consensusNote:   { existing: 'stale',    added: 'empty' },
  flow:            { existing: 'stale',    added: 'empty' },
  bull:            { existing: 'stale',    added: 'empty' },
  bear:            { existing: 'stale',    added: 'empty' },
  watch:           { existing: 'stale',    added: 'empty' },
  thesisDate:      { existing: 'stale',    added: 'empty' },
  valDate:         { existing: 'stale',    added: 'empty' },
  riskDate:        { existing: 'stale',    added: 'empty' },
  metrics:         { existing: 'stale',    added: 'empty',       note: 'legacy top-level copy on one ticker; added tickers carry live margins under fund.metrics' },
  maxPain:         { existing: 'stale',    added: 'empty',       note: 'legacy top-level duplicates on one ticker; the dashboard reads the live options.* values' },
  maxPainExp:      { existing: 'stale',    added: 'empty' },
  maxPainDTE:      { existing: 'stale',    added: 'empty' },
  maxPainOI:       { existing: 'stale',    added: 'empty' },
  maxPainNear:     { existing: 'stale',    added: 'empty' },
  maxPainNearExp:  { existing: 'stale',    added: 'empty' },
  maxPainNearDTE:  { existing: 'stale',    added: 'empty' },
  playbook:        { existing: 'stale',    added: 'generated',   note: 'added tickers: text templated from live numbers; ADE\'s own playbooks quote the numbers they were written with' },
}

// Fields overlaid onto ADE's own tickers by adapters/ade-overlay.js (everything else stays as ADE published it).
export const OVERLAID = Object.entries(FIELDS).filter(([, v]) => v.existing === 'live' || v.existing === 'computed').map(([k]) => k)

export const summary = () => {
  const count = side => Object.values(FIELDS).reduce((a, f) => ({ ...a, [f[side]]: (a[f[side]] ?? 0) + 1 }), {})
  return { existing: count('existing'), added: count('added') }
}
