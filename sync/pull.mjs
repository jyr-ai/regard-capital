#!/usr/bin/env node
// Mirrors whitelisted files from the upstream repos into upstream/<name>/.
//
//   node sync/pull.mjs                         sync every enabled repo at its manifest ref
//   node sync/pull.mjs --repo ade              one repo
//   node sync/pull.mjs --repo ade --sha <sha>  one repo at an exact commit
//   node sync/pull.mjs --repo ade --from ../ADE-INVESTMENTS   use a local checkout
//   node sync/pull.mjs --check                 fail if upstream/ or derived/ differ from upstream.lock.json
//
// Fails (exit 1) when an include pattern matches nothing or a strict transform does not
// match exactly `count` times. That failure is what keeps a sync PR red instead of
// letting a renamed upstream file reach production. Cosmetic transforms are marked
// `optional`: when they no longer match, or a colour has no mapping, sync prints a
// `WARN` line (the sync workflow copies those into the PR body) and leaves the text as-is.

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
const DERIVED = path.join(ROOT, 'derived')

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

// cfg.tokenEnv names the env var holding a read token for that repo (a private repo
// owned by another account needs its own); default UPSTREAM_READ_TOKEN. Public repos
// clone without any token.
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

// #rrggbb with an optional 2-digit alpha suffix. ADE writes literal #rrggbbaa values and
// also builds tints at runtime (color+"22"), so targets must stay 6-digit and the
// suffix is carried over untouched.
const HEX = /#([0-9a-fA-F]{6})([0-9a-fA-F]{2})?(?![0-9a-fA-F])/g

export function applyColorMap(text, colors) {
  const unmapped = new Map()
  const out = text.replace(HEX, (whole, rgb, alpha = '') => {
    const key = `#${rgb.toLowerCase()}`
    const hit = colors[key]
    if (!hit) {
      unmapped.set(key, (unmapped.get(key) || 0) + 1)
      return whole
    }
    return hit.to + alpha
  })
  return { text: out, unmapped }
}

// Returns a list of warning strings. Strict find/replace transforms throw on a count
// mismatch; `optional` ones and colour maps warn instead.
export function applyTransforms(destDir, transforms = [], baseDir = ROOT) {
  const warnings = []
  for (const t of transforms) {
    const file = path.join(destDir, t.file)
    if (!fs.existsSync(file)) throw new Error(`transform target missing: ${t.file}`)
    let text = fs.readFileSync(file, 'utf8')

    if (t.type === 'colorMap') {
      const { colors } = readJson(path.join(baseDir, t.map))
      const res = applyColorMap(text, colors)
      for (const [colour, n] of [...res.unmapped].sort((a, b) => b[1] - a[1])) {
        warnings.push(`unmapped colour ${colour} (${n} use${n === 1 ? '' : 's'}) in ${t.file}: add it to ${t.map}`)
      }
      text = res.text
    } else if (t.type === 'regex') {
      const re = new RegExp(t.find, `${t.flags ?? ''}g`)
      const hits = [...text.matchAll(re)].length
      if (hits !== t.count) {
        const msg = `transform on ${t.file} expected ${t.count} match(es) of /${t.find}/, found ${hits}`
        if (!t.optional) throw new Error(msg)
        warnings.push(`${msg} (optional, left unchanged)`)
        continue
      }
      text = text.replace(re, t.replace)
    } else {
      const hits = text.split(t.find).length - 1
      if (hits !== t.count) {
        const msg = `transform on ${t.file} expected ${t.count} match(es) of ${JSON.stringify(t.find)}, found ${hits}`
        if (!t.optional) throw new Error(msg)
        warnings.push(`${msg} (optional, left unchanged)`)
        continue
      }
      text = text.split(t.find).join(t.replace)
    }
    fs.writeFileSync(file, text)
  }
  return warnings
}

export function hashTree(destDir, files) {
  return Object.fromEntries(files.map(f => [f, sha256(fs.readFileSync(path.join(destDir, f)))]))
}

// A derive module (sync/derive/<name>.mjs) turns the synced tree into small JSON files
// the app imports. Output goes to derived/<repo>/ and is hashed into the lock.
async function runDerive(name, cfg, srcDir) {
  if (!cfg.derive) return {}
  const mod = await import(pathToFileURL(path.join(ROOT, 'sync/derive', `${cfg.derive}.mjs`)).href)
  const outDir = path.join(DERIVED, name)
  fs.rmSync(outDir, { recursive: true, force: true })
  const written = {}
  for (const [rel, text] of Object.entries(mod.derive(srcDir))) {
    const target = path.join(outDir, rel)
    fs.mkdirSync(path.dirname(target), { recursive: true })
    fs.writeFileSync(target, text)
    written[`derived/${name}/${rel}`] = sha256(text)
  }
  return written
}

async function syncRepo(name, cfg, { sha, from }) {
  const src = from ? { dir: from, sha: git(from, 'rev-parse', 'HEAD'), temp: false } : checkoutRemote(name, cfg, sha)
  try {
    const files = listFiles(src.dir, cfg)
    const dest = path.join(UPSTREAM, name)
    fs.rmSync(dest, { recursive: true, force: true })
    for (const f of files) {
      fs.mkdirSync(path.dirname(path.join(dest, f)), { recursive: true })
      fs.copyFileSync(path.join(src.dir, f), path.join(dest, f))
    }
    const warnings = applyTransforms(dest, cfg.transforms)
    const entry = { url: cfg.url, ref: cfg.ref, sha: src.sha, syncedAt: new Date().toISOString(), files: hashTree(dest, files) }
    const derived = await runDerive(name, cfg, dest)
    if (Object.keys(derived).length) entry.derived = derived
    return { entry, warnings }
  } finally {
    if (src.temp) fs.rmSync(src.dir, { recursive: true, force: true })
  }
}

// Every mirrored and derived file must hash to what the lock recorded, and nothing extra may exist.
export function check(lock) {
  const problems = []
  for (const [name, entry] of Object.entries(lock)) {
    const dest = path.join(UPSTREAM, name)
    const onDisk = fs.existsSync(dest) ? fg.sync('**', { cwd: dest, dot: true, onlyFiles: true, ignore: ['**/__pycache__/**'] }) : []
    for (const f of onDisk) if (!(f in entry.files)) problems.push(`${name}/${f}: not in lock (hand-added?)`)
    for (const [f, hash] of Object.entries(entry.files)) {
      const p = path.join(dest, f)
      if (!fs.existsSync(p)) problems.push(`${name}/${f}: missing`)
      else if (sha256(fs.readFileSync(p)) !== hash) problems.push(`${name}/${f}: edited by hand`)
    }

    const derivedDir = path.join(DERIVED, name)
    const derivedOnDisk = fs.existsSync(derivedDir) ? fg.sync('**', { cwd: derivedDir, dot: true, onlyFiles: true }) : []
    const recorded = entry.derived || {}
    for (const f of derivedOnDisk) if (!(`derived/${name}/${f}` in recorded)) problems.push(`derived/${name}/${f}: not in lock`)
    for (const [rel, hash] of Object.entries(recorded)) {
      const p = path.join(ROOT, rel)
      if (!fs.existsSync(p)) problems.push(`${rel}: missing`)
      else if (sha256(fs.readFileSync(p)) !== hash) problems.push(`${rel}: edited by hand or stale`)
    }
  }
  return problems
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const manifest = readJson(MANIFEST)
  const lock = readJson(LOCK, {})

  if (args.check) {
    const problems = check(lock)
    if (problems.length) {
      console.error('upstream/ or derived/ does not match upstream.lock.json:\n  ' + problems.join('\n  '))
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
    const { entry, warnings } = await syncRepo(name, cfg, args)
    // Unchanged content keeps its old entry, so a no-op sync leaves no diff to commit.
    const same = prev && prev.sha === entry.sha
      && JSON.stringify(prev.files) === JSON.stringify(entry.files)
      && JSON.stringify(prev.derived || {}) === JSON.stringify(entry.derived || {})
    lock[name] = same ? prev : entry
    console.log(`${name}: ${prev ? prev.sha.slice(0, 7) : 'none'} -> ${entry.sha.slice(0, 7)} (${Object.keys(entry.files).length} files)`)
    for (const w of warnings) console.log(`WARN ${name}: ${w}`)
  }

  const sorted = Object.fromEntries(Object.keys(lock).sort().map(k => [k, lock[k]]))
  fs.writeFileSync(LOCK, JSON.stringify(sorted, null, 2) + '\n')
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(err => {
    console.error(`sync failed: ${err.message}`)
    process.exit(1)
  })
}
