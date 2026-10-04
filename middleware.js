// Vercel Routing Middleware: the private-app gate.
// No valid session cookie: pages redirect to /login, /api answers 401.
// The JS bundle and /login stay public (they hold no data); all data lives behind /api.
// server/app.js re-checks the cookie on /api, so the gate also holds in local dev.

import { COOKIE_NAME, readCookie, verifySession } from './server/lib/session.js'

// /api/cron/* is called by Vercel Cron with `Authorization: Bearer $CRON_SECRET`; the route checks it.
const PUBLIC_PATHS = new Set(['/login', '/api/auth/login', '/api/health', '/favicon.svg'])
const PUBLIC_PREFIXES = ['/assets/', '/api/cron/']

export default async function middleware(request) {
  const url = new URL(request.url)
  const path = url.pathname
  if (PUBLIC_PATHS.has(path) || PUBLIC_PREFIXES.some(p => path.startsWith(p))) return

  const token = readCookie(request.headers.get('cookie'), COOKIE_NAME)
  if (await verifySession(token, process.env.SESSION_SECRET)) return

  if (path.startsWith('/api/')) {
    return new Response('{"error":"unauthorized"}', { status: 401, headers: { 'Content-Type': 'application/json' } })
  }
  const login = new URL('/login', url)
  login.searchParams.set('next', path)
  return Response.redirect(login, 302)
}

export const config = {
  matcher: ['/((?!_vercel).*)'],
}
