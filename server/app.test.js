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
    expect(await verifySession(token, 'k', 2_000)).toBe(true)
    expect(await verifySession(token, 'other-key', 2_000)).toBe(false)
    expect(await verifySession(token.replace(/^\d+/, '99999999999999'), 'k', 2_000)).toBe(false)
    expect(await verifySession(token, 'k', 1_000 + 8 * 24 * 3600 * 1000)).toBe(false)
    expect(await verifySession(undefined, 'k')).toBe(false)
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
