#!/usr/bin/env node
// Mirrors whitelisted files from the upstream repos into upstream/<name>/.
//
//   node sync/pull.mjs                         sync every enabled repo at its manifest ref
//   node sync/pull.mjs --repo ade              one repo
//   node sync/pull.mjs --repo ade --sha <sha>  one repo at an exact commit
//   node sync/pull.mjs --repo ade --from ../ADE-INVESTMENTS   use a local checkout
//   node sync/pull.mjs --check                 fail if upstream/ differs from upstream.lock.json
//
// Fails (exit 1) when an include pattern matches nothing or a transform does not
// match exactly `count` times. That failure is what keeps a sync PR red instead of
// letting a renamed upstream file reach production.

import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import fg from 'fast-glob'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const MANIFEST = path.join(ROOT, 'sync/manifest.json')
const LOCK = path.join(ROOT, 'upstream.lock.json')
const UPSTREAM = path.join(ROOT, 'upstream')

function parseArgs(argv) {
  const args = { repo: null, sha: null, from: null, check: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--repo') args.repo = argv[++i]
    else if (a === '--sha') args.sha = argv[++i]
    else if (a === '--from') args.from = path.resolve(argv[++i])
    else if (a === '--check') args.check = true
    else throw new Error(`Unknown argument: ${a}`)
  }
  if ((args.sha || args.from) && !args.repo) throw new Error('--sha and --from need --repo')
  return args
}

const readJson = (p, fallback) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : fallback)
const sha256 = buf => createHash('sha256').update(buf).digest('hex')
const git = (cwd, ...args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()

// cfg.tokenEnv names the env var holding a read token for that repo (repos owned by
// another account, like ADE, need their own); default UPSTREAM_READ_TOKEN.
function authedUrl(url, tokenEnv = 'UPSTREAM_READ_TOKEN') {
  const token = process.env[tokenEnv]
  return token ? url.replace('https://', `https://x-access-token:${token}@`) : url
}

// Shallow-fetches one commit into a temp dir. Returns { dir, sha }.
function checkoutRemote(name, cfg, sha) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), `sync-${name}-`))
  git(dir, 'init', '-q')
  git(dir, 'remote', 'add', 'origin', authedUrl(cfg.url, cfg.tokenEnv))
  git(dir, 'fetch', '-q', '--depth', '1', 'origin', sha || cfg.ref)
  git(dir, 'checkout', '-q', 'FETCH_HEAD')
  return { dir, sha: git(dir, 'rev-parse', 'HEAD'), temp: true }
}

export function listFiles(srcDir, cfg) {
  const files = new Set()
  for (const pattern of cfg.include) {
    const hits = fg.sync(pattern, { cwd: srcDir, dot: true, onlyFiles: true, ignore: cfg.exclude || [] })
    if (hits.length === 0) throw new Error(`include pattern matched nothing upstream: ${pattern}`)
    hits.forEach(h => files.add(h))
  }
  return [...files].sort()
}

export function applyTransforms(destDir, transforms = []) {
  for (const t of transforms) {
    const file = path.join(destDir, t.file)
    if (!fs.existsSync(file)) throw new Error(`transform target missing: ${t.file}`)
    const text = fs.readFileSync(file, 'utf8')
    const hits = text.split(t.find).length - 1
    if (hits !== t.count) {
      throw new Error(`transform on ${t.file} expected ${t.count} match(es) of ${JSON.stringify(t.find)}, found ${hits}`)
    }
    fs.writeFileSync(file, text.split(t.find).join(t.replace))
  }
}

export function hashTree(destDir, files) {
  return Object.fromEntries(files.map(f => [f, sha256(fs.readFileSync(path.join(destDir, f)))]))
}

function syncRepo(name, cfg, { sha, from }) {
  const src = from ? { dir: from, sha: git(from, 'rev-parse', 'HEAD'), temp: false } : checkoutRemote(name, cfg, sha)
  try {
    const files = listFiles(src.dir, cfg)
    const dest = path.join(UPSTREAM, name)
    fs.rmSync(dest, { recursive: true, force: true })
    for (const f of files) {
      fs.mkdirSync(path.dirname(path.join(dest, f)), { recursive: true })
      fs.copyFileSync(path.join(src.dir, f), path.join(dest, f))
    }
    applyTransforms(dest, cfg.transforms)
    return { url: cfg.url, ref: cfg.ref, sha: src.sha, syncedAt: new Date().toISOString(), files: hashTree(dest, files) }
  } finally {
    if (src.temp) fs.rmSync(src.dir, { recursive: true, force: true })
  }
}

// Every mirrored file must hash to what the lock recorded, and nothing extra may exist.
export function check(lock) {
  const problems = []
  for (const [name, entry] of Object.entries(lock)) {
    const dest = path.join(UPSTREAM, name)
    const onDisk = fs.existsSync(dest) ? fg.sync('**', { cwd: dest, dot: true, onlyFiles: true }) : []
    for (const f of onDisk) if (!(f in entry.files)) problems.push(`${name}/${f}: not in lock (hand-added?)`)
    for (const [f, hash] of Object.entries(entry.files)) {
      const p = path.join(dest, f)
      if (!fs.existsSync(p)) problems.push(`${name}/${f}: missing`)
      else if (sha256(fs.readFileSync(p)) !== hash) problems.push(`${name}/${f}: edited by hand`)
    }
  }
  return problems
}

function main() {
  const args = parseArgs(process.argv.slice(2))
  const manifest = readJson(MANIFEST)
  const lock = readJson(LOCK, {})

  if (args.check) {
    const problems = check(lock)
    if (problems.length) {
      console.error('upstream/ does not match upstream.lock.json:\n  ' + problems.join('\n  '))
      process.exit(1)
    }
    console.log(`upstream/ matches lock (${Object.keys(lock).join(', ') || 'empty'})`)
    return
  }

  const names = args.repo ? [args.repo] : Object.keys(manifest.repos).filter(n => manifest.repos[n].enabled)
  for (const name of names) {
    const cfg = manifest.repos[name]
    if (!cfg) throw new Error(`unknown repo: ${name}`)
    const prev = lock[name]
    const next = syncRepo(name, cfg, args)
    // Unchanged content keeps its old entry, so a no-op sync leaves no diff to commit.
    const same = prev && prev.sha === next.sha && JSON.stringify(prev.files) === JSON.stringify(next.files)
    lock[name] = same ? prev : next
    const before = prev?.sha
    const after = next.sha
    console.log(`${name}: ${before ? before.slice(0, 7) : 'none'} -> ${after.slice(0, 7)} (${Object.keys(lock[name].files).length} files)`)
  }

  const sorted = Object.fromEntries(Object.keys(lock).sort().map(k => [k, lock[k]]))
  fs.writeFileSync(LOCK, JSON.stringify(sorted, null, 2) + '\n')
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    main()
  } catch (err) {
    console.error(`sync failed: ${err.message}`)
    process.exit(1)
  }
}
