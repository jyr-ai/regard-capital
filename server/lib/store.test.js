import { beforeEach, describe, expect, it } from 'vitest'
import { clearMemoryStore, createStore } from './store.js'

beforeEach(clearMemoryStore)

describe('memory store (no Upstash env)', () => {
  const noEnv = { url: '', token: '' }
  it('round-trips JSON and deletes', async () => {
    const s = createStore(noEnv)
    expect(s.kind).toBe('memory')
    await s.set('k', { a: [1, 2] })
    expect(await s.get('k')).toEqual({ a: [1, 2] })
    await s.del('k')
    expect(await s.get('k')).toBeNull()
  })
})

describe('Upstash store', () => {
  it('sends Redis commands to the REST endpoint with the bearer token', async () => {
    const sent = []
    const fetchImpl = async (url, init) => {
      sent.push({ url, auth: init.headers.Authorization, body: JSON.parse(init.body) })
      const [cmd] = JSON.parse(init.body)
      return new Response(JSON.stringify({ result: cmd === 'GET' ? '{"x":1}' : 'OK' }), { status: 200 })
    }
    const s = createStore({ url: 'https://u.example', token: 't0k', fetchImpl })
    expect(s.kind).toBe('upstash')
    await s.set('a', { y: 2 }, { ttlSeconds: 60 })
    expect(await s.get('a')).toEqual({ x: 1 })
    expect(sent[0]).toMatchObject({ url: 'https://u.example', auth: 'Bearer t0k', body: ['SET', 'a', '{"y":2}', 'EX', 60] })
    expect(sent[1].body).toEqual(['GET', 'a'])
  })

  it('surfaces Upstash errors instead of swallowing them', async () => {
    const bad = createStore({ url: 'https://u', token: 't', fetchImpl: async () => new Response('{}', { status: 500 }) })
    await expect(bad.get('a')).rejects.toThrow(/Upstash 500/)
    const err = createStore({ url: 'https://u', token: 't', fetchImpl: async () => new Response(JSON.stringify({ error: 'WRONGPASS' }), { status: 200 }) })
    await expect(err.get('a')).rejects.toThrow(/WRONGPASS/)
  })
})
