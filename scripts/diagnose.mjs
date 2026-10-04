#!/usr/bin/env node
// Runs the ADE live-data pipeline for real (Yahoo, and Upstash if its env vars are set), then
// the diagnostics, and prints a report. Exit code 1 when anything fails.
//
//   npm run diagnose                 full refresh of ADE's tickers, then diagnose
//   npm run diagnose -- --no-refresh diagnose whatever the store already holds
//   npm run diagnose -- --json
import { adeWatchlist } from '../adapters/ade.js'
import { createAdeService } from '../server/ade/service.js'
import { createNasdaq } from '../server/ade/nasdaq.js'
import { createYahoo } from '../server/ade/yahoo.js'
import { createStore } from '../server/lib/store.js'

const args = new Set(process.argv.slice(2))
const store = createStore()
const svc = createAdeService({ store, yahoo: createYahoo(), adeTickers: adeWatchlist, nasdaq: createNasdaq(), fetchImpl: fetch })

if (!args.has('--no-refresh')) {
  const t0 = Date.now()
  const meta = await svc.refreshAll()
  if (!args.has('--json')) console.log(`refreshed ${meta.count - meta.failed.length}/${meta.count} tickers in ${((Date.now() - t0) / 1000).toFixed(1)}s${meta.failed.length ? `, failed: ${meta.failed.map(f => `${f.symbol} (${f.error})`).join(', ')}` : ''}\n`)
}
const report = await svc.diagnose()

if (args.has('--json')) {
  console.log(JSON.stringify(report, null, 2))
} else {
  const icon = { pass: 'PASS', warn: 'WARN', fail: 'FAIL' }
  for (const s of report.stages) console.log(`${icon[s.status]}  ${s.name.padEnd(46)} ${String(s.ms).padStart(5)} ms  ${s.detail}`)
  console.log(`\nstatus: ${report.status.toUpperCase()}   store: ${store.kind}   env: ${report.environment}`)
  console.log('\nfield coverage across ADE tickers (% with a real value):')
  console.log('  ' + Object.entries(report.coverage.fields).map(([f, p]) => `${f} ${p}%`).join('   '))
  console.log('\nprovenance (field counts): ADE tickers ', JSON.stringify(report.provenance.existing), '\n                          added tickers', JSON.stringify(report.provenance.added))
}
process.exit(report.status === 'down' ? 1 : 0)
