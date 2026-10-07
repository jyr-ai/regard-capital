// Pipeline diagnostics: runs every stage of the ADE live-data pipeline against the real services
// and reports pass / warn / fail with timings, so a production problem (Yahoo blocking the host,
// no persistent store, a missing secret, a stalled cron) is visible instead of silent.
//
//   GET /api/ade/diagnose            (signed in)        GET /api/cron/diagnose  (Bearer CRON_SECRET)
//   npm run diagnose                 (local, real Yahoo)

import { buildSnapshot } from './build.js'
import { buildOptions } from './options.js'
import { summary as provenanceSummary } from './provenance.js'
import { raw } from './yahoo.js'

const HOUR = 3600_000
const FIELDS = ['avgPT', 'highPT', 'lowPT', 'consensus', 'fwdPE', 'rateSens', 'mktCap', 'sector', 'earningsDate', 'ytd', 'yr1', 'options', 'scores']
// A forward P/E that is null with a stated reason ("n/a, loss-making") is an answer, not a gap.
const covered = (snap, f) => snap[f] != null || (f === 'fwdPE' && snap.fwdPENote != null)

export async function runDiagnostics({ yahoo, store, adeTickers, published = {}, adeAsOf = null, nasdaq = null, intel = null, env = process.env, now = new Date(), probe = 'AAPL', live = true }) {
  const stages = []
  const stage = async (id, name, fn) => {
    const t0 = Date.now()
    try {
      const r = await fn()
      stages.push({ id, name, status: r?.warn ? 'warn' : 'pass', ms: Date.now() - t0, detail: r?.detail ?? r?.warn ?? 'ok' })
      return r
    } catch (err) {
      stages.push({ id, name, status: 'fail', ms: Date.now() - t0, detail: err.message })
      return null
    }
  }
  const onVercel = Boolean(env.VERCEL)

  // ---- 1. The three Yahoo endpoints, on a probe ticker ----
  let chart = null
  let summary = null
  if (live) {
    chart = await stage('yahoo.chart', `Yahoo daily candles (${probe})`, async () => {
      const c = await yahoo.chart(probe)
      if (c.candles.length < 400) throw new Error(`only ${c.candles.length} candles (need 400 for the 400-day average)`)
      const last = c.candles.at(-1)
      const ageDays = (now - last.t * 1000) / (24 * HOUR)
      if (ageDays > 5) throw new Error(`newest candle is ${ageDays.toFixed(1)} days old`)
      const drift = Math.abs(last.c - c.meta.regularMarketPrice) / c.meta.regularMarketPrice
      if (drift > 0.03) throw new Error(`last candle ${last.c} disagrees with Yahoo's quote ${c.meta.regularMarketPrice}`)
      return Object.assign(c, { detail: `${c.candles.length} candles, newest ${new Date(last.t * 1000).toISOString().slice(0, 10)}` })
    })
    summary = await stage('yahoo.summary', `Yahoo crumb + fundamentals (${probe})`, async () => {
      const s = await yahoo.summary(probe)
      const missing = ['targetMeanPrice', 'recommendationKey'].filter(k => raw(s.financialData?.[k]) == null && s.financialData?.[k] == null)
      if (missing.length) throw new Error(`no ${missing.join(', ')}`)
      return Object.assign(s, { detail: `target $${raw(s.financialData.targetMeanPrice)}, ${s.financialData.numberOfAnalystOpinions?.raw ?? '?'} analysts` })
    })
    await stage('yahoo.options', `Yahoo option chains (${probe})`, async () => {
      const o = await buildOptions(yahoo, probe, { now: now.getTime() })
      if (o.maxPain == null || o.atmIV == null) throw new Error('chain parsed but max pain / ATM IV missing')
      return { detail: `max pain ${o.maxPain} (${o.maxPainExp}), ATM IV ${o.atmIV}%, put/call ${o.pcRatio}` }
    })
    if (nasdaq) {
      await stage('nasdaq.estimates', `Nasdaq consensus EPS (${probe}), the forward P/E fallback`, async () => {
        try {
          const rows = await nasdaq.yearlyEps(probe)
          const next = rows.find(r => r.end >= now) ?? rows.at(-1)
          if (!next) throw new Error('no fiscal-year rows')
          return { detail: `FY ${next.fiscalEnd} consensus EPS ${next.eps}, ${next.analysts ?? '?'} analysts` }
        } catch (e) {
          return { warn: `${e.message}: tickers Yahoo has no forward EPS for will show n/a instead of a Nasdaq-based P/E` }
        }
      })
    }
    if (chart && summary) {
      await stage('snapshot.build', 'Indicators, support levels and ADE score', async () => {
        const snap = buildSnapshot({ symbol: probe, candles: chart.candles, meta: chart.meta, summary }, { now })
        if (!snap.scores) throw new Error('no ADE score could be computed')
        if (snap.support.length !== 3 || snap.support.some(l => l.lvl >= snap.price)) throw new Error('support ladder is not 3 levels below price')
        return { detail: `${probe} ${snap.scores.band} (${snap.scores.tool}), nearest support ${snap.support[0].lvl}` }
      })
    }
  }

  // ---- 2. Infrastructure ----
  await stage('store.roundtrip', `Store (${store.kind})`, async () => {
    const key = 'ade:diag'
    const value = { at: now.toISOString() }
    await store.set(key, value)
    const back = await store.get(key)
    await store.del(key)
    if (back?.at !== value.at) throw new Error('wrote a value and read back something else')
    if (store.kind === 'memory') {
      const msg = 'in-memory store: added tickers and snapshots are lost on every cold start and differ per serverless instance. Connect Upstash Redis.'
      if (onVercel) throw new Error(msg)
      return { warn: msg }
    }
    return { detail: 'write, read and delete work' }
  })

  await stage('config', 'Environment', async () => {
    const need = ['APP_PASSWORD', 'SESSION_SECRET', 'CRON_SECRET'].filter(k => !env[k])
    const notes = []
    if (need.length) {
      if (onVercel) throw new Error(`missing ${need.join(', ')}`)
      notes.push(`not set locally: ${need.join(', ')}`)
    }
    if (!env.ANTHROPIC_API_KEY) notes.push('no ANTHROPIC_API_KEY: added tickers get placeholder narratives')
    return notes.length ? { warn: notes.join('; ') } : { detail: 'all set' }
  })

  // ---- 3. State of the data ----
  const meta = await store.get('ade:meta').catch(() => null)
  await stage('refresh.recency', 'Last refresh', async () => {
    if (!meta) throw new Error('never refreshed: the first page load will trigger one, or call /api/cron/refresh-ade')
    const age = (now - new Date(meta.refreshedAt)) / HOUR
    const what = `${age.toFixed(1)} h ago, ${meta.count - meta.failed.length}/${meta.count} tickers`
    if (meta.ok === false) throw new Error(`last refresh mostly failed (${what}): ${meta.failed.slice(0, 3).map(f => `${f.symbol}: ${f.error}`).join('; ')}`)
    if (age > 78) throw new Error(`stale: ${what} (the cron runs weekdays 21:30 UTC)`)
    if (age > 30 || meta.failed.length) return { warn: `${what}${meta.failed.length ? `; failed: ${meta.failed.map(f => f.symbol).join(', ')}` : ''}` }
    return { detail: what }
  })

  // The macro strip (S&P, VIX, 10-year yield, CPI, Fed funds) refreshed with the tickers.
  await stage('macro', 'Macro strip (Yahoo indices, NY Fed, BLS)', async () => {
    const m = await store.get('ade:macro').catch(() => null)
    if (!m) return { warn: "no macro strip stored: ADE's own hand-typed macro text is still on the page. NY Fed or BLS may be blocking this host, or no refresh has run yet." }
    const down = (m.sources ?? []).filter(x => !x.ok)
    const bits = [m.vix != null && `VIX ${m.vix}`, m.tnx != null && `10Y ${m.tnx}%`, m.cpi != null && `CPI ${m.cpi}% (${m.cpiMonth})`, m.fedFunds != null && `fed funds ${m.fedFunds}%`].filter(Boolean)
    const age = m.asOf ? (now - new Date(m.asOf)) / (24 * HOUR) : null
    if (down.length) return { warn: `${down.map(x => `${x.name}: ${x.error}`).join('; ')}. Those fields show n/a.` }
    if (age != null && age > 5) return { warn: `macro closes are ${age.toFixed(1)} days old` }
    return { detail: `${bits.join(', ')}; closes ${m.macroDate}` }
  })

  // The Claude-written intel for the 9 tabs (intel.js), refreshed by the scheduled intel job.
  if (intel) {
    await stage('intel', 'Intel for the 9 tabs (RSS headlines + Claude)', async () => {
      if (!intel.llm.configured) return { warn: "no Anthropic API key (Settings, or ANTHROPIC_API_KEY): the tabs show ADE's last published text" }
      const what = `${intel.fresh}/${intel.total} tickers written in the last 20 h (key from ${intel.llm.source === 'user' ? 'Settings' : 'ANTHROPIC_API_KEY'})`
      if (intel.fresh === 0) return { warn: `${what}. Run the intel job: the "Refresh intel" button or .github/workflows/refresh-intel.yml` }
      return intel.fresh < intel.total ? { warn: what } : { detail: what }
    })
  }

  // ADE's own prose (news, theses, risk cards, market themes) is not refreshed by us: it changes when ADE publishes.
  await stage('ade.text', "ADE's written analysis", async () => {
    if (!adeAsOf) return { warn: 'unknown publish date' }
    const days = (now - new Date(`${adeAsOf}T12:00:00Z`)) / (24 * HOUR)
    const what = `published ${adeAsOf}, ${Math.max(0, Math.round(days))} day${Math.round(days) === 1 ? '' : 's'} old; it updates when ADE publishes (sync checks every 6 hours)`
    return days > 4 ? { warn: `${what}. The numbers beside it are live, the words are not.` } : { detail: what }
  })

  const coverage = { tickers: {}, fields: {} }
  await stage('snapshots', 'Stored snapshots for ADE\'s tickers', async () => {
    let have = 0
    const stale = []
    const diverged = []
    for (const { ticker } of adeTickers) {
      const snap = await store.get(`ade:snap:${ticker}`)
      if (!snap) { coverage.tickers[ticker] = null; continue }
      have++
      const ageDays = (now - new Date(snap.asOf)) / (24 * HOUR)
      if (ageDays > 4) stale.push(`${ticker} (${ageDays.toFixed(0)}d)`)
      const was = published[ticker]?.price
      if (was && Math.abs(snap.price - was) / was > 0.35) diverged.push(`${ticker} ${snap.price} vs ADE ${was}`)
      coverage.tickers[ticker] = Object.fromEntries(FIELDS.map(f => [f, covered(snap, f)]))
    }
    for (const f of FIELDS) {
      const present = Object.values(coverage.tickers).filter(Boolean)
      coverage.fields[f] = present.length ? Math.round((present.filter(t => t[f]).length / present.length) * 100) : 0
    }
    if (have < adeTickers.length * 0.8) throw new Error(`only ${have}/${adeTickers.length} tickers have a snapshot`)
    const issues = []
    if (have < adeTickers.length) issues.push(`${adeTickers.length - have} missing`)
    if (stale.length) issues.push(`stale: ${stale.join(', ')}`)
    if (diverged.length) issues.push(`price far from ADE's published (split or wrong ticker?): ${diverged.join(', ')}`)
    const thin = FIELDS.filter(f => coverage.fields[f] < 80)
    if (thin.length) issues.push(`thin coverage: ${thin.map(f => `${f} ${coverage.fields[f]}%`).join(', ')}`)
    // Name individual gaps (a 96% average hides which ticker has no value).
    const gaps = Object.entries(coverage.tickers).flatMap(([t, c]) => (c ? FIELDS.filter(f => !c[f]).map(f => `${t}.${f}`) : []))
    coverage.gaps = gaps
    if (gaps.length) issues.push(`no Yahoo value for: ${gaps.slice(0, 12).join(', ')}${gaps.length > 12 ? ` (+${gaps.length - 12} more)` : ''}`)
    return issues.length ? { warn: issues.join('; ') } : { detail: `${have}/${adeTickers.length} fresh, every field covered` }
  })

  const failed = stages.filter(s => s.status === 'fail')
  const warned = stages.filter(s => s.status === 'warn')
  return {
    status: failed.length ? 'down' : warned.length ? 'degraded' : 'ok',
    generatedAt: now.toISOString(),
    environment: onVercel ? `vercel:${env.VERCEL_ENV ?? '?'}` : 'local',
    stages,
    coverage,
    provenance: provenanceSummary(),
  }
}
