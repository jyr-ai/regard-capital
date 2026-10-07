// Which Anthropic key powers the app's writing (intel for the 9 ADE tabs): the key a user entered in
// Settings (encrypted in the store), else ANTHROPIC_API_KEY. One key for the whole app.
import Anthropic from '@anthropic-ai/sdk'
import { decrypt, encrypt } from '../lib/secrets.js'

const STORE_KEY = 'settings:anthropic'
const last4 = k => (k ? k.slice(-4) : null)

export function createLlm({ store, env = process.env, makeClient = apiKey => new Anthropic({ apiKey }) }) {
  let cached = { key: null, client: null }

  async function resolveKey() {
    const box = await store.get(STORE_KEY).catch(() => null)
    const user = box ? decrypt(box.secret, env.SESSION_SECRET) : null
    if (user) return { key: user, source: 'user', savedAt: box.savedAt }
    if (env.ANTHROPIC_API_KEY) return { key: env.ANTHROPIC_API_KEY, source: 'env' }
    return { key: null, source: null }
  }

  return {
    async status() {
      const { key, source, savedAt } = await resolveKey()
      return { configured: Boolean(key), source, last4: last4(key), savedAt: savedAt ?? null }
    },
    // A client for the current key, or null when none is configured.
    async client() {
      const { key } = await resolveKey()
      if (!key) return null
      if (cached.key !== key) cached = { key, client: makeClient(key) }
      return cached.client
    },
    // Checks the key against the API (a models listing costs nothing) before storing it.
    async save(key) {
      const k = String(key ?? '').trim()
      if (!/^sk-ant-[A-Za-z0-9_-]{20,}$/.test(k)) throw Object.assign(new Error('That does not look like an Anthropic API key (it starts with sk-ant-).'), { status: 422, expose: true })
      try {
        await makeClient(k).models.list({ limit: 1 })
      } catch (e) {
        const status = e?.status === 401 || e?.status === 403 ? 422 : 502
        throw Object.assign(new Error(status === 422 ? 'Anthropic rejected that key.' : `Could not reach Anthropic to check the key: ${e.message}`), { status, expose: true })
      }
      await store.set(STORE_KEY, { secret: encrypt(k, env.SESSION_SECRET), savedAt: new Date().toISOString() })
      cached = { key: null, client: null }
      return this.status()
    },
    async clear() {
      await store.del(STORE_KEY)
      cached = { key: null, client: null }
      return this.status()
    },
  }
}
