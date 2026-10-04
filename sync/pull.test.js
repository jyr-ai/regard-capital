import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { applyColorMap, applyFontScale, applyTransforms, check, listFiles } from './pull.mjs'
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

describe('font scale', () => {
  const sizes = { 6: 11, 8: 13, 9: 14, 14: 19 }

  it('rescales every fontSize literal and nothing else', () => {
    const src = '<span style={{gap:8,fontSize:9,height:6}}/><b style={{...M,fontSize:6}}/><i style={{fontSize:14,lineHeight:1.8}}/>'
    expect(applyFontScale(src, sizes).text).toBe('<span style={{gap:8,fontSize:14,height:6}}/><b style={{...M,fontSize:11}}/><i style={{fontSize:19,lineHeight:1.8}}/>')
  })

  it('scales the branches of a ternary but not the constants it compares', () => {
    expect(applyFontScale('{fontSize:j===6?14:j===8?9:8,x:1}', sizes).text).toBe('{fontSize:j===6?19:j===8?14:13,x:1}')
    expect(applyFontScale('{fontSize:isSelf?8:6}', sizes).text).toBe('{fontSize:isSelf?13:11}')
  })

  it('leaves a size it has no mapping for and reports it', () => {
    const res = applyFontScale('{fontSize:15}{fontSize:15}{fontSize:9}', sizes)
    expect(res.text).toBe('{fontSize:15}{fontSize:15}{fontSize:14}')
    expect(res.unmapped.get('15')).toBe(2)
  })

  it('does not scale a size twice when sizes overlap (9 -> 14 must not become 19)', () => {
    expect(applyFontScale('{fontSize:9}', sizes).text).toBe('{fontSize:14}')
  })

  it('widens a fixed-width text box in step with its text, and leaves boxes with no text alone', () => {
    const src = '<span style={{...M,fontSize:6,width:100,flexShrink:0}}/><i style={{width:6,height:6,borderRadius:3}}/><b style={{fontSize:8,minWidth:40,maxWidth:90,width:"50%"}}/>'
    expect(applyFontScale(src, sizes).text).toBe('<span style={{...M,fontSize:11,width:183,flexShrink:0}}/><i style={{width:6,height:6,borderRadius:3}}/><b style={{fontSize:13,minWidth:65,maxWidth:90,width:"50%"}}/>')
  })

  it('widens fixed px grid columns by the grid factor and leaves fr columns alone', () => {
    const src = '{display:"grid",gridTemplateColumns:"44px 50px minmax(70px,1fr) 1fr"}'
    expect(applyFontScale(src, sizes, 1.5).text).toBe('{display:"grid",gridTemplateColumns:"66px 75px minmax(105px,1fr) 1fr"}')
    expect(applyFontScale(src, sizes).text).toBe(src)
  })

  it('warns from a transform about an unmapped size', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fs-'))
    fs.writeFileSync(path.join(dir, 'a.jsx'), '{fontSize:41}')
    const w = applyTransforms(dir, [{ file: 'a.jsx', type: 'fontScale', sizes }])
    expect(w[0]).toMatch(/unscaled font size 41px/)
  })
})

describe('ADE manifest', () => {
  const manifest = JSON.parse(fs.readFileSync(new URL('./manifest.json', import.meta.url), 'utf8'))
  const ade = (manifest.repos ?? manifest).ade

  it('runs the font scale last, because the find strings of the transforms before it use ADE\'s original sizes', () => {
    const types = ade.transforms.map(t => t.type)
    expect(types.filter(t => t === 'fontScale')).toHaveLength(1)
    expect(types.at(-1)).toBe('fontScale')
  })

  it('maps every font size ADE uses today (a new one is a WARN at sync, not silence)', () => {
    const scale = ade.transforms.find(t => t.type === 'fontScale')
    const src = fs.readFileSync(new URL('../upstream/ade/src/ade-portfolio-v6.jsx', import.meta.url), 'utf8')
    // upstream/ holds the scaled file: every literal in it is already a mapped target, so none may be below the 11px floor
    const sizes = [...src.matchAll(/fontSize:(\d+(?:\.\d+)?)(?![\d.?:])/g)].map(m => Number(m[1]))
    expect(Math.min(...sizes)).toBeGreaterThanOrEqual(10)
    expect(Object.values(scale.sizes).every(v => v >= 10)).toBe(true)
  })
})
