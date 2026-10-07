import request from 'supertest'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { clearMemoryStore, createStore } from '../lib/store.js'
import { setAdeService } from '../routes/ade.js'
import { createAdeService } from './service.js'
import { fakeYahoo } from './fixtures.js'

const BOOK = [{ ticker: 'MU', name: 'Micron' }]
let app, cookie

beforeAll(async () => {
  process.env.APP_PASSWORD = 'pw'
  process.env.SESSION_SECRET = 'test-secret'
  process.env.CRON_SECRET = 'cron-secret'
  app = (await import('../app.js')).default
  cookie = (await request(app).post('/api/auth/login').send({ password: 'pw' })).headers['set-cookie'][0]
})

beforeEach(() => {
  clearMemoryStore()
  setAdeService(createAdeService({ store: createStore({ url: '', token: '' }), yahoo: fakeYahoo({ unknown: ['ZZZZ'] }), adeTickers: BOOK }))
})

const authed = r => r.set('Cookie', cookie)

describe('auth', () => {
  it.each([['get', '/api/ade/live'], ['get', '/api/ade/search?q=net'], ['post', '/api/ade/tickers'], ['delete', '/api/ade/tickers/NET']])('%s %s needs a session', async (m, url) => {
    await request(app)[m](url).expect(401)
  })
})

describe('GET /api/ade/live', () => {
  it('returns snapshots for ADE tickers, blocks for added ones, and when it refreshed', async () => {
    await authed(request(app).post('/api/ade/tickers').send({ ticker: 'net' })).expect(201)
    const res = await authed(request(app).get('/api/ade/live')).expect(200)
    expect(Object.keys(res.body.overlay)).toEqual(['MU'])
    expect(res.body.added.NET.block.userAdded).toBe(true)
    expect(res.body.refreshedAt).toMatch(/^\d{4}-/)
    expect(res.body.store).toBe('memory')
  })
})

describe('POST /api/ade/tickers', () => {
  it('201 with the score for a valid ticker', async () => {
    const res = await authed(request(app).post('/api/ade/tickers').send({ ticker: 'NET' })).expect(201)
    expect(res.body).toMatchObject({ symbol: 'NET' })
    expect(res.body.intelNeeded).toBe(true) // the page then asks for intel (news + Claude) for it
  })

  it('400 for a malformed ticker, 404 for one Yahoo does not know, 409 for a duplicate', async () => {
    await authed(request(app).post('/api/ade/tickers').send({ ticker: '../x' })).expect(400)
    await authed(request(app).post('/api/ade/tickers').send({})).expect(400)
    const unknown = await authed(request(app).post('/api/ade/tickers').send({ ticker: 'ZZZZ' })).expect(404)
    expect(unknown.body.error).toMatch(/no data/)
    await authed(request(app).post('/api/ade/tickers').send({ ticker: 'NET' })).expect(201)
    await authed(request(app).post('/api/ade/tickers').send({ ticker: 'NET' })).expect(409)
    await authed(request(app).post('/api/ade/tickers').send({ ticker: 'MU' })).expect(409)
  })

  it('does not leak internals on unexpected errors', async () => {
    setAdeService({ addTicker: async () => { throw new Error('secret db password'); }, addedHoldings: async () => [] })
    const res = await authed(request(app).post('/api/ade/tickers').send({ ticker: 'NET' })).expect(500)
    expect(JSON.stringify(res.body)).not.toContain('secret')
  })
})

describe('DELETE /api/ade/tickers/:ticker', () => {
  it('removes an added ticker and 404s for one that is not', async () => {
    await authed(request(app).post('/api/ade/tickers').send({ ticker: 'NET' }))
    await authed(request(app).delete('/api/ade/tickers/net')).expect(200)
    await authed(request(app).delete('/api/ade/tickers/NET')).expect(404)
  })
})

describe('GET /api/ade/search', () => {
  it('returns matches, and nothing for an empty or oversized query', async () => {
    expect((await authed(request(app).get('/api/ade/search?q=cloud')).expect(200)).body.results[0].symbol).toBe('NET')
    expect((await authed(request(app).get('/api/ade/search?q=')).expect(200)).body.results).toEqual([])
    expect((await authed(request(app).get(`/api/ade/search?q=${'x'.repeat(60)}`)).expect(200)).body.results).toEqual([])
  })
})

describe('cron: GET /api/cron/refresh-ade', () => {
  it('needs the bearer secret, not a session cookie', async () => {
    await request(app).get('/api/cron/refresh-ade').expect(401)
    await request(app).get('/api/cron/refresh-ade').set('Authorization', 'Bearer wrong').expect(401)
    await authed(request(app).get('/api/cron/refresh-ade')).expect(401)
  })

  it('refreshes when the secret is right', async () => {
    const res = await request(app).get('/api/cron/refresh-ade').set('Authorization', 'Bearer cron-secret').expect(200)
    expect(res.body).toMatchObject({ count: 1, failed: [] })
  })

  it('refuses everyone when CRON_SECRET is unset, rather than accepting "Bearer undefined"', async () => {
    const saved = process.env.CRON_SECRET
    delete process.env.CRON_SECRET
    await request(app).get('/api/cron/refresh-ade').set('Authorization', 'Bearer undefined').expect(401)
    process.env.CRON_SECRET = saved
  })
})

describe('diagnose endpoints', () => {
  it('GET /api/ade/diagnose needs a session and returns the stage report', async () => {
    await request(app).get('/api/ade/diagnose').expect(401)
    const res = await authed(request(app).get('/api/ade/diagnose')).expect(200)
    expect(res.body.stages.length).toBeGreaterThan(5)
    expect(['ok', 'degraded', 'down']).toContain(res.body.status)
  })

  it('GET /api/cron/diagnose needs the bearer secret and is 503 when the pipeline is down', async () => {
    await request(app).get('/api/cron/diagnose').expect(401)
    await authed(request(app).get('/api/cron/diagnose')).expect(401)
    setAdeService(createAdeService({ store: createStore({ url: '', token: '' }), yahoo: fakeYahoo({ unknown: ['AAPL', 'MU'] }), adeTickers: BOOK }))
    await request(app).get('/api/cron/diagnose').set('Authorization', 'Bearer cron-secret').expect(503)
  })
})

describe('cron refresh failure is visible', () => {
  it('answers 502 when most tickers failed, so Vercel shows the run as failed', async () => {
    setAdeService(createAdeService({ store: createStore({ url: '', token: '' }), yahoo: fakeYahoo({ unknown: ['MU'] }), adeTickers: BOOK }))
    const res = await request(app).get('/api/cron/refresh-ade').set('Authorization', 'Bearer cron-secret').expect(502)
    expect(res.body.ok).toBe(false)
  })
})

describe('adding is rate limited', () => {
  it('429s after 12 adds in 10 minutes', async () => {
    let last
    for (let i = 0; i < 14; i++) last = await authed(request(app).post('/api/ade/tickers').send({ ticker: `T${i}` }))
    expect(last.status).toBe(429)
  })
})
