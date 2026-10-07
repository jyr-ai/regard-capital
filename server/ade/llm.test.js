import { describe, expect, it } from 'vitest'
import { createLlm } from './llm.js'
import { decrypt, encrypt } from '../lib/secrets.js'

const memStore = () => { const m = new Map(); return { m, get: async k => m.get(k) ?? null, set: async (k, v) => { m.set(k, v) }, del: async k => { m.delete(k) } } }
const KEY = 'sk-ant-api03-' + 'a'.repeat(40)

describe('secrets', () => {
  it('round-trips, and a different SESSION_SECRET cannot read it', () => {
    const box = encrypt('hello', 's1')
    expect(box).not.toContain('hello')
    expect(decrypt(box, 's1')).toBe('hello')
    expect(decrypt(box, 's2')).toBeNull()
    expect(decrypt('garbage', 's1')).toBeNull()
  })
})

describe('createLlm', () => {
  const env = { SESSION_SECRET: 'sess' }
  const okClient = () => ({ models: { list: async () => ({ data: [] }) } })

  it('checks a key with Anthropic, stores it encrypted, and only ever reports its last 4', async () => {
    const store = memStore()
    const llm = createLlm({ store, env, makeClient: okClient })
    const s = await llm.save(KEY)
    expect(s).toMatchObject({ configured: true, source: 'user', last4: 'aaaa' })
    expect(JSON.stringify(store.m.get('settings:anthropic'))).not.toContain(KEY)
    expect(await llm.client()).toBeTruthy()
  })

  it('rejects a malformed key and a key Anthropic refuses, with a 422', async () => {
    const llm = createLlm({ store: memStore(), env, makeClient: () => ({ models: { list: async () => { throw Object.assign(new Error('bad'), { status: 401 }) } } }) })
    await expect(llm.save('hello')).rejects.toMatchObject({ status: 422 })
    await expect(llm.save(KEY)).rejects.toMatchObject({ status: 422, message: 'Anthropic rejected that key.' })
  })

  it('falls back to ANTHROPIC_API_KEY, and the saved key wins over it', async () => {
    const store = memStore()
    const llm = createLlm({ store, env: { ...env, ANTHROPIC_API_KEY: 'sk-ant-env-key-zzzz' }, makeClient: okClient })
    expect(await llm.status()).toMatchObject({ source: 'env', last4: 'zzzz' })
    await llm.save(KEY)
    expect((await llm.status()).source).toBe('user')
    await llm.clear()
    expect((await llm.status()).source).toBe('env')
  })

  it('has no client and says so when no key is configured', async () => {
    const llm = createLlm({ store: memStore(), env, makeClient: okClient })
    expect(await llm.client()).toBeNull()
    expect(await llm.status()).toMatchObject({ configured: false })
  })
})
