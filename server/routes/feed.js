import express from 'express'
import { categoryKeys, getAllFeeds, listCategories, setAddedHoldings } from '../../adapters/feeds.js'
import { getAdeService } from './ade.js'

const router = express.Router()

// Pick up tickers added in the ADE System tab, at most every 15 s (instances do not share memory).
let lastCheck = 0
async function syncWatchlist() {
  if (Date.now() - lastCheck < 15_000) return
  lastCheck = Date.now()
  try {
    setAddedHoldings(await getAdeService().addedHoldings())
  } catch (err) {
    console.warn('[feed] could not read added tickers:', err.message) // the static watchlist still works
  }
}

function parseLimit(raw, fallback) {
  const n = Number.parseInt(raw, 10)
  return Number.isFinite(n) ? Math.min(Math.max(n, 1), 60) : fallback
}

// GET /api/feed/categories
router.get('/categories', async (_req, res) => {
  await syncWatchlist()
  res.json({ categories: listCategories() })
})

// GET /api/feed/all?limit=30&category=MARKETS
router.get('/all', async (req, res) => {
  const limit = parseLimit(req.query.limit, 30)
  const category = req.query.category ? String(req.query.category) : null
  if (category && !categoryKeys().includes(category)) {
    return res.status(400).json({ error: `unknown category: ${category}` })
  }
  await syncWatchlist()
  try {
    res.json(await getAllFeeds({ limit, category }))
  } catch (err) {
    console.error('[feed] getAllFeeds failed:', err)
    res.status(502).json({ status: 'degraded', source: 'rss', items: [], error: 'feed fetch failed' })
  }
})

export default router
