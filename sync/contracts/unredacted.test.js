// Contract between the app and upstream/unredacted. A sync PR that breaks any of
// these stays red and never reaches production.
import fs from 'node:fs'
import path from 'node:path'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import fg from 'fast-glob'
import * as ourTokens from '../../src/theme/tokens.js'
import { DARK_THEME } from '../../src/theme/dark.js'

const UP = path.resolve(__dirname, '../../upstream/unredacted')
const read = rel => fs.readFileSync(path.join(UP, rel), 'utf8')

// Upstream theme files are read as text: importing them would go through the
// Vite theme shim and silently compare our theme with itself.
const exportedConsts = src => [...src.matchAll(/export const (\w+)/g)].map(m => m[1])
const objectKeys = (src, name) => {
  const body = src.slice(src.indexOf(`${name} = {`))
  const block = body.slice(0, body.indexOf('\n};') + 1)
  const noStrings = block.replace(/(['"`])(?:\\.|(?!\1).)*\1/g, '""')
  return [...noStrings.matchAll(/(?:^|[,{])\s*(\w+)\s*:/gm)].map(m => m[1])
}

describe('theme contract', () => {
  it('our tokens export every name upstream tokens.js exports', () => {
    const missing = exportedConsts(read('src/theme/tokens.js')).filter(n => !(n in ourTokens))
    expect(missing, 'add these to src/theme/tokens.js').toEqual([])
  })

  it('our DARK_THEME has every key upstream DARK_THEME has', () => {
    const keys = objectKeys(read('src/theme/dark.js'), 'DARK_THEME')
    expect(keys.length).toBeGreaterThan(10)
    expect(keys.filter(k => !(k in DARK_THEME)), 'add these to src/theme/dark.js').toEqual([])
  })

  it('every t.<key> read by a vendored component exists in our theme', () => {
    const used = new Set()
    for (const f of fg.sync('src/components/**/*.jsx', { cwd: UP })) {
      for (const m of read(f).matchAll(/\bt\.(\w+)/g)) used.add(m[1])
    }
    expect([...used].filter(k => !(k in DARK_THEME))).toEqual([])
  })
})

describe('import contract', () => {
  const ALLOWED_PACKAGES = new Set(['react', 'express', 'rss-parser'])

  it('vendored files import only whitelisted files and known packages', () => {
    const problems = []
    for (const f of fg.sync('**/*.{js,jsx}', { cwd: UP })) {
      for (const m of read(f).matchAll(/^\s*import\s[^'"]*['"]([^'"]+)['"]/gm)) {
        const spec = m[1]
        if (spec.startsWith('.')) {
          if (!fs.existsSync(path.resolve(UP, path.dirname(f), spec))) problems.push(`${f} -> ${spec} (not in sync/manifest.json)`)
        } else if (!ALLOWED_PACKAGES.has(spec.split('/')[0])) {
          problems.push(`${f} -> ${spec} (new package dependency)`)
        }
      }
    }
    expect(problems).toEqual([])
  })
})

describe('rssFeed engine contract', () => {
  let feeds
  beforeAll(async () => {
    vi.resetModules()
    vi.doMock('rss-parser', () => ({
      default: class {
        async parseURL(url) {
          return {
            items: [
              { title: `Story from ${new URL(url).hostname}`, link: `${url}#1`, contentSnippet: 'Summary text.', isoDate: '2026-10-04T12:00:00Z' },
            ],
          }
        }
      },
    }))
    feeds = await import('../../adapters/feeds.js')
  })

  it('exports the functions and object the adapter relies on', async () => {
    const engine = await import('../../upstream/unredacted/server/services/rssFeed.js')
    expect(typeof engine.FEED_CATEGORIES).toBe('object')
    expect(typeof engine.getAllFeeds).toBe('function')
    expect(typeof engine.getCategoryFeed).toBe('function')
  })

  it('serves only our market categories', () => {
    expect(feeds.categoryKeys()).toEqual(['MARKETS', 'MACRO', 'HARD_ASSETS', 'SEC_FILING', 'HOLDINGS'])
  })

  it('round-trips an injected category through the engine', async () => {
    const res = await feeds.getCategoryFeed('MARKETS', { limit: 3 })
    expect(res.category).toBe('MARKETS')
    expect(res.items.length).toBeGreaterThan(0)
    const item = res.items[0]
    for (const field of ['text', 'url', 'source', 'sourceId', 'category', 'pubDate', 'time']) {
      expect(item, `item.${field}`).toHaveProperty(field)
    }
    expect(item.category).toBe('MARKETS')
  })

  it('aggregates all categories through getAllFeeds', async () => {
    const res = await feeds.getAllFeeds({ limit: 50 })
    expect(new Set(res.items.map(i => i.category))).toEqual(new Set(feeds.categoryKeys()))
  })
})
