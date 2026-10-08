import express from 'express'
import { WatchlistError, createAdeService } from '../ade/service.js'
import { createLlm } from '../ade/llm.js'
import { createNews } from '../ade/news.js'
import { createNasdaq } from '../ade/nasdaq.js'
import { YahooError, createYahoo } from '../ade/yahoo.js'
import { createStore } from '../lib/store.js'
import { setAddedHoldings } from '../../adapters/feeds.js'

let service
let llm
function getLlm() {
  llm ??= createLlm({ store: createStore() })
  return llm
}
export function getAdeService() {
  service ??= createAdeService({ store: createStore(), yahoo: createYahoo(), nasdaq: createNasdaq(), fetchImpl: fetch, news: createNews(), llm: getLlm() })
  return service
}
export const setAdeService = s => { service = s } // tests
export const setLlm = l => { llm = l } // tests

const router = express.Router()

function fail(res, err) {
  if (err instanceof WatchlistError || err?.expose) return res.status(err.status ?? 500).json({ error: err.message })
  if (err instanceof YahooError) return res.status(err.status && err.status < 600 ? err.status : 502).json({ error: err.message })
  console.error('[ade]', err)
  return res.status(500).json({ error: 'internal error' })
}

// A user adding tickers costs Yahoo calls and a model call: keep it modest.
const adds = []
const ADDS_PER_10_MIN = 12

router.get('/live', async (req, res) => {
  try {
    res.json(await getAdeService().live(req.profile))
  } catch (err) {
    fail(res, err)
  }
})

router.get('/diagnose', async (_req, res) => {
  try {
    res.json(await getAdeService().diagnose())
  } catch (err) {
    fail(res, err)
  }
})

router.get('/search', async (req, res) => {
  const q = String(req.query.q ?? '').trim()
  if (q.length < 1 || q.length > 40) return res.json({ results: [] })
  try {
    res.json({ results: await getAdeService().search(q) })
  } catch (err) {
    fail(res, err)
  }
})

router.post('/tickers', express.json({ limit: '1kb' }), async (req, res) => {
  const cutoff = Date.now() - 10 * 60 * 1000
  while (adds.length && adds[0] < cutoff) adds.shift()
  if (adds.length >= ADDS_PER_10_MIN) return res.status(429).json({ error: 'Too many tickers added just now. Try again in a few minutes.' })
  adds.push(Date.now())
  try {
    const svc = getAdeService()
    const added = await svc.addTicker(req.body?.ticker, req.profile)
    setAddedHoldings(await svc.addedHoldings()) // Monitor watchlist picks it up now, not in 15 s
    res.status(201).json(added)
  } catch (err) {
    fail(res, err)
  }
})

router.delete('/tickers/:ticker', async (req, res) => {
  try {
    const svc = getAdeService()
    const r = await svc.removeTicker(req.params.ticker, req.profile)
    setAddedHoldings(await svc.addedHoldings())
    res.json({ ok: true, ...r })
  } catch (err) {
    fail(res, err)
  }
})

// Intel (Claude-written text for the 9 tabs). The page calls POST /intel/refresh in a loop until
// `remaining` is 0; each call rewrites a few tickers so it fits one serverless invocation.
router.get('/intel', async (_req, res) => {
  try { res.json(await getAdeService().intelStatus()) } catch (err) { fail(res, err) }
})
router.post('/intel/refresh', express.json({ limit: '2kb' }), async (req, res) => {
  try {
    const symbols = Array.isArray(req.body?.symbols) ? req.body.symbols.slice(0, 10) : null
    res.json(await getAdeService().refreshIntel({ limit: 3, symbols, force: Boolean(req.body?.force && symbols) }))
  } catch (err) { fail(res, err) }
})

export default router

// Settings: the LLM API keys (Anthropic and Gemini) that power intel. Stored encrypted; never sent back (only last 4).
export const settingsRouter = express.Router()
settingsRouter.get('/', async (_req, res) => {
  try {
    const llm = getLlm()
    res.json({
      anthropic: await llm.status('anthropic'),
      gemini: await llm.status('gemini'),
      active: await llm.status(),
    })
  } catch (err) { fail(res, err) }
})
settingsRouter.put('/anthropic', express.json({ limit: '2kb' }), async (req, res) => {
  try { res.json({ anthropic: await getLlm().saveAnthropic(req.body?.key) }) } catch (err) { fail(res, err) }
})
settingsRouter.delete('/anthropic', async (_req, res) => {
  try { res.json({ anthropic: await getLlm().clearAnthropic() }) } catch (err) { fail(res, err) }
})
settingsRouter.put('/gemini', express.json({ limit: '2kb' }), async (req, res) => {
  try { res.json({ gemini: await getLlm().saveGemini(req.body?.key) }) } catch (err) { fail(res, err) }
})
settingsRouter.delete('/gemini', async (_req, res) => {
  try { res.json({ gemini: await getLlm().clearGemini() }) } catch (err) { fail(res, err) }
})

// Vercel cron (GET, Authorization: Bearer $CRON_SECRET). Mounted outside the session gate.
export const cronRouter = express.Router()
cronRouter.get('/refresh-ade', async (req, res) => {
  const secret = process.env.CRON_SECRET
  if (!secret || req.headers.authorization !== `Bearer ${secret}`) return res.status(401).json({ error: 'unauthorized' })
  try {
    const meta = await getAdeService().refreshAll()
    // A non-2xx makes the failed run visible in Vercel's cron log instead of passing silently.
    res.status(meta.ok ? 200 : 502).json(meta)
  } catch (err) {
    fail(res, err)
  }
})

// Scheduled intel job (.github/workflows/refresh-intel.yml calls this in a loop). Each call rewrites up to
// 3 tickers' intel, stalest first, and reports how many are still due.
cronRouter.post('/refresh-intel', async (req, res) => {
  const secret = process.env.CRON_SECRET
  if (!secret || req.headers.authorization !== `Bearer ${secret}`) return res.status(401).json({ error: 'unauthorized' })
  try {
    res.json(await getAdeService().refreshIntel({ limit: 3 }))
  } catch (err) {
    fail(res, err)
  }
})

// Same checks as /api/ade/diagnose, for an uptime monitor: Authorization: Bearer $CRON_SECRET.
cronRouter.get('/diagnose', async (req, res) => {
  const secret = process.env.CRON_SECRET
  if (!secret || req.headers.authorization !== `Bearer ${secret}`) return res.status(401).json({ error: 'unauthorized' })
  try {
    const report = await getAdeService().diagnose()
    res.status(report.status === 'down' ? 503 : 200).json(report)
  } catch (err) {
    fail(res, err)
  }
})
