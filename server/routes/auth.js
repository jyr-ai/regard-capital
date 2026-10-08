import express from 'express'
import { COOKIE_NAME, SESSION_TTL_MS, createSession, normalizeProfile, passwordMatches } from '../lib/session.js'

const router = express.Router()

// POST /api/auth/login  { password, profile? }  profile = watchlist name (default "default")
router.post('/login', express.json({ limit: '2kb' }), async (req, res) => {
  const APP_PASSWORD = process.env.APP_PASSWORD || 'regard'
  const SESSION_SECRET = process.env.SESSION_SECRET || 'regard-capital-session-secret-default-key-32ch'
  if (!(await passwordMatches(req.body?.password, APP_PASSWORD))) {
    return res.status(401).json({ error: 'wrong password' })
  }
  const profile = normalizeProfile(req.body?.profile)
  res.cookie(COOKIE_NAME, await createSession(SESSION_SECRET, Date.now(), profile), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_TTL_MS,
    path: '/',
  })
  res.json({ ok: true, profile })
})

// POST /api/auth/logout
router.post('/logout', (_req, res) => {
  res.clearCookie(COOKIE_NAME, { path: '/' })
  res.json({ ok: true })
})

export default router
