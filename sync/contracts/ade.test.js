// Contract between the app and upstream/ade. A sync PR that breaks any of these stays red
// and never reaches production. ADE rewrites its dashboard daily, so these checks are
// about structure and safety, never about the market data itself.
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { derive, BANDS } from '../derive/ade.mjs'
import colorMap from '../transforms/ade-colors.json' with { type: 'json' }

const ROOT = path.resolve(__dirname, '../..')
const ADE = path.join(ROOT, 'upstream/ade')
const FILE = path.join(ADE, 'src/ade-portfolio-v6.jsx')
const src = fs.readFileSync(FILE, 'utf8')
const derived = name => JSON.parse(fs.readFileSync(path.join(ROOT, 'derived/ade', name), 'utf8'))

const run = (cmd, args, env = {}) =>
  spawnSync(cmd, args, { cwd: ROOT, encoding: 'utf8', timeout: 90_000, env: { ...process.env, ...env } })

describe('dashboard file', () => {
  it('still exports a default App component', () => {
    expect(src).toMatch(/export default function App\(/)
  })

  it('still has the constants the derive step reads', () => {
    expect(src).toMatch(/\nconst S=\{/)
    expect(src).toMatch(/\nconst LC=\{/)
    expect(src).toMatch(/\nconst BANNER_DATE="\d{4}-\d{2}-\d{2}"/)
  })

  it('renders (ADE\'s own render_check, run on the recoloured file we ship)', () => {
    const res = run('node', [path.join(ADE, 'tools/render_check.cjs')])
    expect(res.stdout + res.stderr).toContain('RENDER OK')
    expect(res.status).toBe(0)
  })

  it('passes ADE\'s health audit, graded as of the dashboard\'s own date', () => {
    // The audit scores data freshness against the clock, so the same file drifts from B to F
    // as days pass. Pin the clock to the dashboard date to test its internal consistency.
    const asOf = src.match(/\nconst BANNER_DATE="(\d{4}-\d{2}-\d{2})"/)[1]
    const res = run('node', ['-r', './sync/contracts/freeze-date.cjs', path.join(ADE, 'tools/healthcheck.cjs')], {
      FREEZE_DATE: `${asOf}T20:00:00Z`,
    })
    const m = res.stdout.match(/GRADE (\S+) \| SCORE (-?\d+) \| checks (\d+)/)
    expect(m, res.stdout + res.stderr).not.toBeNull()
    expect(Number(m[3])).toBeGreaterThan(50) // the audit still has its checks
    expect(m[1]).not.toBe('F')
    expect(Number(m[2])).toBeGreaterThanOrEqual(40)
  })

  it('has no personal holdings left in it (ADE\'s privacy scrub)', () => {
    const res = run('python3', [path.join(ADE, 'tools/scrub_positions.py'), '--check', '--file', FILE])
    expect(res.stdout + res.stderr).toContain('clean')
    expect(res.status).toBe(0)
  })
})

describe('skills and docs', () => {
  const skills = ['ade-fundamentals', 'ade-support-resistance', 'ade-forward-looking']
  it.each(skills)('skill %s is present with frontmatter', name => {
    const text = fs.readFileSync(path.join(ADE, '.claude/skills', name, 'SKILL.md'), 'utf8')
    expect(text).toMatch(new RegExp(`^---\\r?\\nname: ${name}`))
    expect(text.length).toBeGreaterThan(500)
  })

  it.each(['METHODOLOGY.md', 'ADE-DATA-STRUCTURE.md', 'ADE-REFRESH-PROTOCOL.md'])('doc %s is present', name => {
    expect(fs.readFileSync(path.join(ADE, 'docs', name), 'utf8').length).toBeGreaterThan(500)
  })
})

describe('derived data', () => {
  const { watchlist, verdicts } = { watchlist: derived('watchlist.json'), verdicts: derived('verdicts.json') }

  it('covers the book: at least 10 tickers, each with a verdict', () => {
    expect(watchlist.length).toBeGreaterThanOrEqual(10)
    expect(watchlist.filter(w => !verdicts.tickers[w.ticker]).map(w => w.ticker)).toEqual([])
  })

  it('has well-formed verdicts', () => {
    expect(verdicts.asOf).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    for (const [ticker, v] of Object.entries(verdicts.tickers)) {
      expect(v.name, ticker).toBeTruthy()
      expect(v.price, `${ticker} price`).toBeGreaterThan(0)
      expect(Number.isInteger(v.score) && v.score >= 0 && v.score <= 100, `${ticker} score ${v.score}`).toBe(true)
      expect(BANDS, `${ticker} band ${v.band}`).toContain(v.band)
    }
  })

  it('matches a fresh derive of upstream/ade (derive code and synced data agree)', () => {
    const fresh = derive(ADE)
    expect(fresh['watchlist.json']).toBe(fs.readFileSync(path.join(ROOT, 'derived/ade/watchlist.json'), 'utf8'))
    expect(fresh['verdicts.json']).toBe(fs.readFileSync(path.join(ROOT, 'derived/ade/verdicts.json'), 'utf8'))
  })
})

describe('theme map (sync/transforms/ade-colors.json)', () => {
  const entries = Object.entries(colorMap.colors)
  const hex = /^#[0-9a-fA-F]{6}$/
  const lum = h => {
    const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(v => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
  }
  const contrast = (a, b) => {
    const [x, y] = [lum(a), lum(b)]
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
  }

  it('uses 6-digit hex throughout (ADE appends alpha suffixes at runtime)', () => {
    for (const [from, v] of entries) {
      expect(from, 'source').toMatch(hex)
      expect(v.to, `target of ${from}`).toMatch(hex)
      expect(['surface', 'border', 'text', 'accent'], `role of ${from}`).toContain(v.role)
    }
  })

  it('never maps onto another source colour', () => {
    const sources = new Set(entries.map(([k]) => k.toLowerCase()))
    expect(entries.filter(([, v]) => sources.has(v.to.toLowerCase())).map(([k]) => k)).toEqual([])
  })

  it('keeps every text and accent colour at WCAG AA (4.5:1) on every surface', () => {
    const surfaces = [...new Set(entries.filter(([, v]) => v.role === 'surface').map(([, v]) => v.to))]
    const fg = entries.filter(([, v]) => v.role === 'text' || v.role === 'accent')
    const failures = []
    for (const [from, v] of fg) {
      for (const s of surfaces) {
        const ratio = contrast(v.to, s)
        if (ratio < 4.5) failures.push(`${from} -> ${v.to} on ${s}: ${ratio.toFixed(2)}`)
      }
    }
    expect(failures).toEqual([])
  })

  it('left no mapped source colour in the synced dashboard', () => {
    const left = entries.map(([k]) => k).filter(k => src.toLowerCase().includes(k))
    expect(left).toEqual([])
  })
})
