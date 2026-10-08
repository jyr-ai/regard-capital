import express from 'express'
import { liveStreamsRouter } from '../adapters/server.js'
import authRouter from './routes/auth.js'
import adeRouter, { cronRouter, settingsRouter } from './routes/ade.js'
import feedRouter from './routes/feed.js'
import { COOKIE_NAME, readCookie, verifySession } from './lib/session.js'

const app = express()
app.disable('x-powered-by')

app.get('/api/health', (_req, res) => res.json({ ok: true }))
app.use('/api/auth', authRouter)
app.use('/api/cron', cronRouter) // bearer-token auth (CRON_SECRET), not the session cookie

// Second line of the auth gate (the first is middleware.js at the edge).
app.use('/api', async (req, res, next) => {
  const token = readCookie(req.headers.cookie, COOKIE_NAME)
  const sessionSecret = process.env.SESSION_SECRET || 'regard-capital-session-secret-default-key-32ch'
  const profile = await verifySession(token, sessionSecret)
  if (profile) { req.profile = profile; return next() }
  res.status(401).json({ error: 'unauthorized' })
})

app.use('/api/feed', feedRouter)
app.use('/api/ade', adeRouter)
app.use('/api/settings', settingsRouter)
app.get('/api/me', (req, res) => res.json({ profile: req.profile }))
app.use('/api/live-streams', liveStreamsRouter)

app.use('/api', (_req, res) => res.status(404).json({ error: 'not found' }))

// Last-resort handler: one failing route answers "degraded" instead of crashing the function.
app.use((err, _req, res, _next) => {
  console.error('[api] unhandled:', err)
  res.status(500).json({ status: 'degraded', error: 'internal error' })
})

export default app
