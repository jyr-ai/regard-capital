import express from 'express'
import { liveStreamsRouter } from '../adapters/server.js'
import authRouter from './routes/auth.js'
import feedRouter from './routes/feed.js'
import { COOKIE_NAME, readCookie, verifySession } from './lib/session.js'

const app = express()
app.disable('x-powered-by')

app.get('/api/health', (_req, res) => res.json({ ok: true }))
app.use('/api/auth', authRouter)

// Second line of the auth gate (the first is middleware.js at the edge).
app.use('/api', async (req, res, next) => {
  const token = readCookie(req.headers.cookie, COOKIE_NAME)
  if (await verifySession(token, process.env.SESSION_SECRET)) return next()
  res.status(401).json({ error: 'unauthorized' })
})

app.use('/api/feed', feedRouter)
app.use('/api/live-streams', liveStreamsRouter)

app.use('/api', (_req, res) => res.status(404).json({ error: 'not found' }))

// Last-resort handler: one failing route answers "degraded" instead of crashing the function.
app.use((err, _req, res, _next) => {
  console.error('[api] unhandled:', err)
  res.status(500).json({ status: 'degraded', error: 'internal error' })
})

export default app
