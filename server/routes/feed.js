import express from 'express'
import { categoryKeys, getAllFeeds, listCategories } from '../../adapters/feeds.js'

const router = express.Router()

function parseLimit(raw, fallback) {
  const n = Number.parseInt(raw, 10)
  return Number.isFinite(n) ? Math.min(Math.max(n, 1), 60) : fallback
}

// GET /api/feed/categories
router.get('/categories', (_req, res) => {
  res.json({ categories: listCategories() })
})

// GET /api/feed/all?limit=30&category=MARKETS
router.get('/all', async (req, res) => {
  const limit = parseLimit(req.query.limit, 30)
  const category = req.query.category ? String(req.query.category) : null
  if (category && !categoryKeys().includes(category)) {
    return res.status(400).json({ error: `unknown category: ${category}` })
  }
  try {
    res.json(await getAllFeeds({ limit, category }))
  } catch (err) {
    console.error('[feed] getAllFeeds failed:', err)
    res.status(502).json({ status: 'degraded', source: 'rss', items: [], error: 'feed fetch failed' })
  }
})

export default router
