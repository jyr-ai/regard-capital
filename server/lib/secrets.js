// AES-256-GCM for secrets kept in the store (the user's Anthropic API key). The key is derived from
// SESSION_SECRET, so a leaked Redis dump alone does not reveal it, and rotating SESSION_SECRET
// invalidates stored secrets (the user re-enters the key).
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto'

const keyFor = secret => createHash('sha256').update(`regard-capital:secrets:${secret}`).digest()

export function encrypt(plain, secret) {
  if (!secret) throw new Error('SESSION_SECRET is not set')
  const iv = randomBytes(12)
  const c = createCipheriv('aes-256-gcm', keyFor(secret), iv)
  const body = Buffer.concat([c.update(plain, 'utf8'), c.final()])
  return [iv, c.getAuthTag(), body].map(b => b.toString('base64')).join('.')
}

export function decrypt(box, secret) {
  if (!secret || typeof box !== 'string') return null
  try {
    const [iv, tag, body] = box.split('.').map(s => Buffer.from(s, 'base64'))
    const d = createDecipheriv('aes-256-gcm', keyFor(secret), iv)
    d.setAuthTag(tag)
    return Buffer.concat([d.update(body), d.final()]).toString('utf8')
  } catch {
    return null // wrong secret or tampered: treat as not set
  }
}
