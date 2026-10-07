// Stateless session cookie: "<expiresAtMs>.<profile>.<hmac>" signed with SESSION_SECRET. The profile is
// the watchlist name given at sign-in (one shared password, a watchlist per name). Older two-part
// cookies ("<expiresAtMs>.<hmac>") still verify, as profile "default".
// Uses Web Crypto so the same code runs in Node (Express) and the Edge middleware.

export const COOKIE_NAME = 'rc_session'
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000

const enc = new TextEncoder()

async function hmac(secret, message) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message))
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('')
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

const PROFILE = /^[a-z0-9-]{1,32}$/

// "Jian's list" -> "jians-list": the watchlist name typed at sign-in, as a store-key-safe slug.
export function normalizeProfile(name) {
  const p = String(name ?? '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 32)
  return p || 'default'
}

export async function createSession(secret, now = Date.now(), profile = 'default') {
  const expires = String(now + SESSION_TTL_MS)
  const p = PROFILE.test(profile) ? profile : 'default'
  return `${expires}.${p}.${await hmac(secret, `${expires}.${p}`)}`
}

// The session's profile name when valid, false otherwise.
export async function verifySession(token, secret, now = Date.now()) {
  if (!token || !secret) return false
  const parts = token.split('.')
  const [expires, profile, sig] = parts.length === 3 ? parts : [parts[0], null, parts[1]]
  if (parts.length > 3 || !expires || !sig || Number(expires) < now) return false
  if (profile !== null && !PROFILE.test(profile)) return false
  const ok = timingSafeEqual(sig, await hmac(secret, profile === null ? expires : `${expires}.${profile}`))
  return ok ? (profile ?? 'default') : false
}

export async function passwordMatches(given, expected) {
  if (typeof given !== 'string' || !expected) return false
  // Compare digests so the comparison time does not depend on the password length.
  const [a, b] = await Promise.all([hmac('pw', given), hmac('pw', expected)])
  return timingSafeEqual(a, b)
}

export function readCookie(header, name) {
  if (!header) return null
  for (const part of header.split(';')) {
    const [k, ...v] = part.trim().split('=')
    if (k === name) return decodeURIComponent(v.join('='))
  }
  return null
}
