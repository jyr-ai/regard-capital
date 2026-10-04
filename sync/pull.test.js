import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { applyColorMap, applyTransforms, check, listFiles } from './pull.mjs'
import lock from '../upstream.lock.json' with { type: 'json' }

function tmpTree(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pull-test-'))
  for (const [rel, text] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true })
    fs.writeFileSync(path.join(dir, rel), text)
  }
  return dir
}

describe('listFiles', () => {
  it('collects matches and honours excludes', () => {
    const dir = tmpTree({ 'a/x.js': '', 'a/y.js': '', 'a/skip.js': '', 'b.md': '' })
    expect(listFiles(dir, { include: ['a/*.js', 'b.md'], exclude: ['a/skip.js'] })).toEqual(['a/x.js', 'a/y.js', 'b.md'])
  })

  it('fails when upstream removed or renamed a whitelisted file', () => {
    const dir = tmpTree({ 'a/x.js': '' })
    expect(() => listFiles(dir, { include: ['a/x.js', 'a/renamed.js'] })).toThrow(/matched nothing/)
  })
})

describe('applyTransforms', () => {
  it('applies a transform that matches exactly `count` times', () => {
    const dir = tmpTree({ 'p.jsx': "const ORANGE = '#FF8000';\n" })
    applyTransforms(dir, [{ file: 'p.jsx', find: "'#FF8000'", replace: "'#E6A817'", count: 1 }])
    expect(fs.readFileSync(path.join(dir, 'p.jsx'), 'utf8')).toContain('#E6A817')
  })

  it('fails instead of silently skipping when upstream changed the target text', () => {
    const dir = tmpTree({ 'p.jsx': "const ORANGE = '#FF7700';\n" })
    expect(() => applyTransforms(dir, [{ file: 'p.jsx', find: "'#FF8000'", replace: 'x', count: 1 }])).toThrow(/found 0/)
  })

  it('fails when the target now matches more than once', () => {
    const dir = tmpTree({ 'p.jsx': "'#FF8000' '#FF8000'" })
    expect(() => applyTransforms(dir, [{ file: 'p.jsx', find: "'#FF8000'", replace: 'x', count: 1 }])).toThrow(/found 2/)
  })
})

describe('colour map', () => {
  const colors = { '#00d4ff': { to: '#E6A817' }, '#0a0f1a': { to: '#17131A' } }

  it('recolours literals, case-insensitively', () => {
    const { text, unmapped } = applyColorMap('a:"#00D4FF",b:"#0a0f1a"', colors)
    expect(text).toBe('a:"#E6A817",b:"#17131A"')
    expect(unmapped.size).toBe(0)
  })

  it('keeps the alpha suffix of #rrggbbaa literals, since ADE also appends tints at runtime', () => {
    expect(applyColorMap('"#00d4ff22" "#00d4ff"+"15"', colors).text).toBe('"#E6A81722" "#E6A817"+"15"')
  })

  it('reports a colour with no mapping instead of changing or hiding it', () => {
    const { text, unmapped } = applyColorMap('"#123456" "#123456" "#00d4ff"', colors)
    expect(text).toBe('"#123456" "#123456" "#E6A817"')
    expect([...unmapped]).toEqual([['#123456', 2]])
  })

  it('does not touch 3-digit hex, 7-digit runs or words that merely contain hex letters', () => {
    const input = 'color:"#fff" id="#00d4ff1" word=decade'
    expect(applyColorMap(input, colors).text).toBe(input)
  })

  it('runs as a transform and surfaces unmapped colours as warnings', () => {
    const dir = tmpTree({ 'app.jsx': 'x="#00d4ff" y="#abcdef"' })
    const mapFile = path.join(dir, 'map.json')
    fs.writeFileSync(mapFile, JSON.stringify({ colors }))
    const warnings = applyTransforms(dir, [{ file: 'app.jsx', type: 'colorMap', map: 'map.json' }], dir)
    expect(fs.readFileSync(path.join(dir, 'app.jsx'), 'utf8')).toBe('x="#E6A817" y="#abcdef"')
    expect(warnings).toHaveLength(1)
    expect(warnings[0]).toMatch(/unmapped colour #abcdef \(1 use\)/)
  })
})

describe('optional transforms', () => {
  it('warn and leave the text alone when upstream changed it, instead of failing the sync', () => {
    const dir = tmpTree({ 'p.jsx': 'font: Something Else' })
    const warnings = applyTransforms(dir, [{ file: 'p.jsx', find: 'IBM Plex', replace: 'x', count: 1, optional: true }])
    expect(fs.readFileSync(path.join(dir, 'p.jsx'), 'utf8')).toBe('font: Something Else')
    expect(warnings[0]).toMatch(/optional, left unchanged/)
  })

  it('a missing target file is still fatal', () => {
    const dir = tmpTree({})
    expect(() => applyTransforms(dir, [{ file: 'gone.jsx', find: 'a', replace: 'b', count: 1, optional: true }])).toThrow(/missing/)
  })
})

describe('lock check', () => {
  it('the committed upstream/ tree matches upstream.lock.json', () => {
    expect(check(lock)).toEqual([])
  })
})
