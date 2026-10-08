// Which LLM key powers the app's writing (intel for the 9 ADE tabs): Gemini (GEMINI_API_KEY)
// or Anthropic (ANTHROPIC_API_KEY), from Settings (encrypted in the store) or environment variables.
import Anthropic from '@anthropic-ai/sdk'
import { GoogleGenAI } from '@google/genai'
import { decrypt, encrypt } from '../lib/secrets.js'

const STORE_KEY_ANTHROPIC = 'settings:anthropic'
const STORE_KEY_GEMINI = 'settings:gemini'
const last4 = k => (k ? k.slice(-4) : null)

export function createLlm({
  store,
  env = process.env,
  makeClient = apiKey => new Anthropic({ apiKey }),
  makeGeminiClient = apiKey => new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  }),
}) {
  let cachedAnthropic = { key: null, client: null }
  let cachedGemini = { key: null, client: null }

  async function resolveAnthropicKey() {
    const box = await store.get(STORE_KEY_ANTHROPIC).catch(() => null)
    const user = box ? decrypt(box.secret, env.SESSION_SECRET) : null
    if (user) return { key: user, source: 'user', savedAt: box.savedAt }
    if (env.ANTHROPIC_API_KEY) return { key: env.ANTHROPIC_API_KEY, source: 'env' }
    return { key: null, source: null }
  }

  async function resolveGeminiKey() {
    const box = await store.get(STORE_KEY_GEMINI).catch(() => null)
    const user = box ? decrypt(box.secret, env.SESSION_SECRET) : null
    if (user) return { key: user, source: 'user', savedAt: box.savedAt }
    if (env.GEMINI_API_KEY) return { key: env.GEMINI_API_KEY, source: 'env' }
    return { key: null, source: null }
  }

  async function resolveActiveKey() {
    const gem = await resolveGeminiKey()
    const ant = await resolveAnthropicKey()
    // User-entered settings take precedence over env
    if (gem.source === 'user') return { provider: 'gemini', ...gem }
    if (ant.source === 'user') return { provider: 'anthropic', ...ant }
    if (gem.key) return { provider: 'gemini', ...gem }
    if (ant.key) return { provider: 'anthropic', ...ant }
    return { provider: null, key: null, source: null }
  }

  return {
    async status(provider) {
      if (provider === 'anthropic') {
        const { key, source, savedAt } = await resolveAnthropicKey()
        return { configured: Boolean(key), source, last4: last4(key), savedAt: savedAt ?? null }
      }
      if (provider === 'gemini') {
        const { key, source, savedAt } = await resolveGeminiKey()
        return { configured: Boolean(key), source, last4: last4(key), savedAt: savedAt ?? null }
      }
      const ant = await this.status('anthropic')
      const gem = await this.status('gemini')
      const active = await resolveActiveKey()
      return {
        configured: Boolean(active.key),
        provider: active.provider,
        source: active.source,
        last4: last4(active.key),
        savedAt: active.savedAt ?? null,
        anthropic: ant,
        gemini: gem,
      }
    },

    // A client for the current active key, or null when none is configured.
    async client() {
      const active = await resolveActiveKey()
      if (!active.key) return null
      if (active.provider === 'gemini') {
        if (cachedGemini.key !== active.key) {
          const client = makeGeminiClient(active.key)
          client.provider = 'gemini'
          cachedGemini = { key: active.key, client }
        }
        return cachedGemini.client
      }
      if (cachedAnthropic.key !== active.key) {
        const client = makeClient(active.key)
        client.provider = 'anthropic'
        cachedAnthropic = { key: active.key, client }
      }
      return cachedAnthropic.client
    },

    async saveAnthropic(key) {
      const k = String(key ?? '').trim()
      if (!/^sk-ant-[A-Za-z0-9_-]{20,}$/.test(k)) {
        throw Object.assign(new Error('That does not look like an Anthropic API key (it starts with sk-ant-).'), { status: 422, expose: true })
      }
      try {
        await makeClient(k).models.list({ limit: 1 })
      } catch (e) {
        const status = e?.status === 401 || e?.status === 403 ? 422 : 502
        throw Object.assign(new Error(status === 422 ? 'Anthropic rejected that key.' : `Could not reach Anthropic to check the key: ${e.message}`), { status, expose: true })
      }
      await store.set(STORE_KEY_ANTHROPIC, { secret: encrypt(k, env.SESSION_SECRET), savedAt: new Date().toISOString() })
      cachedAnthropic = { key: null, client: null }
      return this.status('anthropic')
    },

    async saveGemini(key) {
      const k = String(key ?? '').trim()
      if (k.length < 20) {
        throw Object.assign(new Error('That does not look like a valid Gemini API key (must be at least 20 characters).'), { status: 422, expose: true })
      }
      try {
        const gemini = makeGeminiClient(k)
        if (gemini?.models?.list) {
          await gemini.models.list({ pageSize: 1 })
        }
      } catch (e) {
        const status = e?.status === 401 || e?.status === 403 || e?.status === 400 ? 422 : 502
        throw Object.assign(new Error(status === 422 ? 'Gemini rejected that key.' : `Could not reach Gemini to check the key: ${e.message}`), { status, expose: true })
      }
      await store.set(STORE_KEY_GEMINI, { secret: encrypt(k, env.SESSION_SECRET), savedAt: new Date().toISOString() })
      cachedGemini = { key: null, client: null }
      return this.status('gemini')
    },

    async save(key, provider = 'anthropic') {
      if (provider === 'gemini' || (typeof key === 'string' && key.startsWith('AIza'))) {
        return this.saveGemini(key)
      }
      return this.saveAnthropic(key)
    },

    async clearAnthropic() {
      await store.del(STORE_KEY_ANTHROPIC)
      cachedAnthropic = { key: null, client: null }
      return this.status('anthropic')
    },

    async clearGemini() {
      await store.del(STORE_KEY_GEMINI)
      cachedGemini = { key: null, client: null }
      return this.status('gemini')
    },

    async clear(provider = 'anthropic') {
      if (provider === 'gemini') {
        return this.clearGemini()
      }
      return this.clearAnthropic()
    },
  }
}
