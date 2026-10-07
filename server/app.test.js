import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'
import { createSession, verifySession } from './lib/session.js'

let app
beforeAll(async () => {
  process.env.APP_PASSWORD = 'correct horse'
  process.env.SESSION_SECRET = 'test-secret'
  app = (await import('./app.js')).default
})

describe('session tokens', () => {
  it('accepts a fresh token and rejects tampered or expired ones', async () => {
    const token = await createSession('k', 1_000)
    expect(await verifySession(token, 'k', 2_000)).toBe('default')
    expect(await verifySession(token, 'other-key', 2_000)).toBe(false)
    expect(await verifySession(token.replace(/^\d+/, '99999999999999'), 'k', 2_000)).toBe(false)
    expect(await verifySession(token, 'k', 1_000 + 8 * 24 * 3600 * 1000)).toBe(false)
    expect(await verifySession(undefined, 'k')).toBe(false)
  })

  it('carries the watchlist profile, signed, so it cannot be swapped', async () => {
    const token = await createSession('k', 1_000, 'jian')
    expect(await verifySession(token, 'k', 2_000)).toBe('jian')
    const [exp, , sig] = token.split('.')
    expect(await verifySession(`${exp}.someone-else.${sig}`, 'k', 2_000)).toBe(false)
    expect(await createSession('k', 1_000, '../etc')).toMatch(/\.default\./) // never an unsafe key segment
  })

  it('still accepts a session cookie issued before profiles existed, as "default"', async () => {
    const { createHmac } = await import('node:crypto')
    const expires = String(1_000 + 1_000_000)
    const old = `${expires}.${createHmac('sha256', 'k').update(expires).digest('hex')}`
    expect(await verifySession(old, 'k', 2_000)).toBe('default')
  })
})

describe('profiles', () => {
  it('normalises the name typed at sign-in into a store-safe slug', async () => {
    const { normalizeProfile } = await import('./lib/session.js')
    expect(normalizeProfile("Jian's List")).toBe('jian-s-list')
    expect(normalizeProfile('')).toBe('default')
    expect(normalizeProfile('  ')).toBe('default')
    expect(normalizeProfile('x'.repeat(50))).toHaveLength(32)
  })

  it('login sets a cookie for the profile and /api/me returns it', async () => {
    const login = await request(app).post('/api/auth/login').send({ password: 'correct horse', profile: 'Jian' }).expect(200)
    expect(login.body.profile).toBe('jian')
    const cookie = login.headers['set-cookie'][0].split(';')[0]
    const me = await request(app).get('/api/me').set('Cookie', cookie).expect(200)
    expect(me.body.profile).toBe('jian')
  })
})

describe('auth gate', () => {
  it('leaves /api/health public', async () => {
    await request(app).get('/api/health').expect(200)
  })

  it('rejects /api without a session', async () => {
    await request(app).get('/api/feed/categories').expect(401)
  })

  it('rejects a wrong password', async () => {
    await request(app).post('/api/auth/login').send({ password: 'nope' }).expect(401)
  })

  it('signs in and then serves /api', async () => {
    const login = await request(app).post('/api/auth/login').send({ password: 'correct horse' }).expect(200)
    const cookie = login.headers['set-cookie'][0]
    expect(cookie).toMatch(/HttpOnly/)
    const res = await request(app).get('/api/feed/categories').set('Cookie', cookie).expect(200)
    expect(res.body.categories.map(c => c.key)).toContain('MARKETS')
  })

  it('rejects an unknown feed category', async () => {
    const login = await request(app).post('/api/auth/login').send({ password: 'correct horse' })
    await request(app).get('/api/feed/all?category=NOPE').set('Cookie', login.headers['set-cookie'][0]).expect(400)
  })
})
