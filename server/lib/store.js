// Tiny key-value store. Uses Upstash Redis over its REST API when UPSTASH_REDIS_REST_URL and
// UPSTASH_REDIS_REST_TOKEN are set (shared across devices and deploys); otherwise an
// in-memory Map, which is fine for local dev and tests but resets on every serverless cold start.

const memory = new Map()

export function createStore({ url = process.env.UPSTASH_REDIS_REST_URL, token = process.env.UPSTASH_REDIS_REST_TOKEN, fetchImpl = fetch } = {}) {
  if (!url || !token) {
    return {
      kind: 'memory',
      async get(key) { return memory.has(key) ? JSON.parse(memory.get(key)) : null },
      async set(key, value) { memory.set(key, JSON.stringify(value)) },
      async del(key) { memory.delete(key) },
    }
  }

  // Upstash REST: POST a command array, get { result } back.
  async function cmd(...args) {
    const res = await fetchImpl(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) throw new Error(`Upstash ${res.status}`)
    const json = await res.json()
    if (json.error) throw new Error(`Upstash: ${json.error}`)
    return json.result
  }

  return {
    kind: 'upstash',
    async get(key) {
      const v = await cmd('GET', key)
      return v == null ? null : JSON.parse(v)
    },
    async set(key, value, { ttlSeconds } = {}) {
      await (ttlSeconds ? cmd('SET', key, JSON.stringify(value), 'EX', ttlSeconds) : cmd('SET', key, JSON.stringify(value)))
    },
    async del(key) { await cmd('DEL', key) },
  }
}

export const clearMemoryStore = () => memory.clear()
