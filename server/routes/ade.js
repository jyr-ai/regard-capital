import express from 'express'
import { createAdeService } from '../ade/service.js'
import { createProse } from '../ade/prose.js'
import { createNasdaq } from '../ade/nasdaq.js'
import { YahooError, createYahoo } from '../ade/yahoo.js'
import { createStore } from '../lib/store.js'
import { setAddedHoldings } from '../../adapters/feeds.js'

let service
export function getAdeService() {
  service ??= createAdeService({ store: createStore(), yahoo: createYahoo(), prose: createProse(), nasdaq: createNasdaq(), fetchImpl: fetch })
  return service
}
export const setAdeService = s => { service = s } // tests

const router = express.Router()

function fail(res, err) {
  if (err instanceof YahooError) return res.status(err.status && err.status < 600 ? err.status : 502).json({ error: err.message })
  console.error('[ade]', err)
  return res.status(500).json({ error: 'internal error' })
}

// A user adding tickers costs Yahoo calls and a model call: keep it modest.
const adds = []
const ADDS_PER_10_MIN = 12

router.get('/live', async (_req, res) => {
  try {
    res.json(await getAdeService().live())
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
    const added = await svc.addTicker(req.body?.ticker)
    setAddedHoldings(await svc.addedHoldings()) // Monitor watchlist picks it up now, not in 15 s
    res.status(201).json(added)
  } catch (err) {
    fail(res, err)
  }
})

router.delete('/tickers/:ticker', async (req, res) => {
  try {
    const svc = getAdeService()
    await svc.removeTicker(req.params.ticker)
    setAddedHoldings(await svc.addedHoldings())
    res.json({ ok: true })
  } catch (err) {
    fail(res, err)
  }
})

export default router

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
