import { describe, expect, it } from 'vitest'
import { createLlm } from './llm.js'
import { decrypt, encrypt } from '../lib/secrets.js'

const memStore = () => { const m = new Map(); return { m, get: async k => m.get(k) ?? null, set: async (k, v) => { m.set(k, v) }, del: async k => { m.delete(k) } } }
const KEY = 'sk-ant-api03-' + 'a'.repeat(40)
const GEMINI_KEY = 'AIzaSy' + 'g'.repeat(33)

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
  const okGeminiClient = () => ({ models: { list: async () => ({}) } })

  it('checks an Anthropic key, stores it encrypted, and only ever reports its last 4', async () => {
    const store = memStore()
    const llm = createLlm({ store, env, makeClient: okClient, makeGeminiClient: okGeminiClient })
    const s = await llm.save(KEY)
    expect(s).toMatchObject({ configured: true, source: 'user', last4: 'aaaa' })
    expect(JSON.stringify(store.m.get('settings:anthropic'))).not.toContain(KEY)
    expect(await llm.client()).toBeTruthy()
  })

  it('checks a Gemini key, stores it encrypted, and reports status correctly', async () => {
    const store = memStore()
    const llm = createLlm({ store, env, makeClient: okClient, makeGeminiClient: okGeminiClient })
    const s = await llm.saveGemini(GEMINI_KEY)
    expect(s).toMatchObject({ configured: true, source: 'user', last4: 'gggg' })
    expect(JSON.stringify(store.m.get('settings:gemini'))).not.toContain(GEMINI_KEY)
    const client = await llm.client()
    expect(client).toBeTruthy()
    expect(client.provider).toBe('gemini')
  })

  it('rejects a malformed key and a key refused by the provider, with a 422', async () => {
    const llm = createLlm({
      store: memStore(),
      env,
      makeClient: () => ({ models: { list: async () => { throw Object.assign(new Error('bad'), { status: 401 }) } } }),
      makeGeminiClient: () => ({ models: { list: async () => { throw Object.assign(new Error('bad'), { status: 401 }) } } }),
    })
    await expect(llm.saveAnthropic('hello')).rejects.toMatchObject({ status: 422 })
    await expect(llm.saveAnthropic(KEY)).rejects.toMatchObject({ status: 422, message: 'Anthropic rejected that key.' })
    await expect(llm.saveGemini('short')).rejects.toMatchObject({ status: 422 })
    await expect(llm.saveGemini(GEMINI_KEY)).rejects.toMatchObject({ status: 422, message: 'Gemini rejected that key.' })
  })

  it('falls back to ANTHROPIC_API_KEY and GEMINI_API_KEY from env', async () => {
    const store = memStore()
    const llm = createLlm({ store, env: { ...env, ANTHROPIC_API_KEY: 'sk-ant-env-key-zzzz', GEMINI_API_KEY: 'AIzaSy-env-key-yyyy' }, makeClient: okClient, makeGeminiClient: okGeminiClient })
    const st = await llm.status()
    expect(st.gemini).toMatchObject({ configured: true, source: 'env', last4: 'yyyy' })
    expect(st.anthropic).toMatchObject({ configured: true, source: 'env', last4: 'zzzz' })
    // User key takes precedence
    await llm.saveAnthropic(KEY)
    const stUser = await llm.status()
    expect(stUser.anthropic.source).toBe('user')
    await llm.clearAnthropic()
    expect((await llm.status()).anthropic.source).toBe('env')
  })

  it('has no client and says so when no key is configured', async () => {
    const llm = createLlm({ store: memStore(), env, makeClient: okClient, makeGeminiClient: okGeminiClient })
    expect(await llm.client()).toBeNull()
    expect(await llm.status()).toMatchObject({ configured: false })
  })
})
