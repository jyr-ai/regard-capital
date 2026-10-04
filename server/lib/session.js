// Stateless session cookie: "<expiresAtMs>.<hmac>" signed with SESSION_SECRET.
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

export async function createSession(secret, now = Date.now()) {
  const expires = String(now + SESSION_TTL_MS)
  return `${expires}.${await hmac(secret, expires)}`
}

export async function verifySession(token, secret, now = Date.now()) {
  if (!token || !secret) return false
  const [expires, sig] = token.split('.')
  if (!expires || !sig || Number(expires) < now) return false
  return timingSafeEqual(sig, await hmac(secret, expires))
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
