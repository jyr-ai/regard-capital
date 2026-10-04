import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { applyTransforms, check, listFiles } from './pull.mjs'
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

describe('lock check', () => {
  it('the committed upstream/ tree matches upstream.lock.json', () => {
    expect(check(lock)).toEqual([])
  })
})
