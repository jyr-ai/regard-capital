// ADE's methodology notes and skills as raw markdown, for the "How this is scored" drawer.
// Vite-only (import.meta.glob), so the Express server must not import this file.
const files = import.meta.glob('../upstream/ade/{.claude/skills/*/SKILL.md,docs/*.md}', {
  query: '?raw',
  import: 'default',
})

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

const GROUPS = { skill: 'Skills', doc: 'Docs' }
const ORDER = ['ade-fundamentals', 'ade-support-resistance', 'ade-forward-looking', 'METHODOLOGY', 'ADE-DATA-STRUCTURE', 'ADE-REFRESH-PROTOCOL']

const pretty = id => id.replace(/^ade-/i, '').replace(/[-_]/g, ' ').toLowerCase().replace(/^./, c => c.toUpperCase())

export const adeDocs = Object.entries(files)
  .map(([file, load]) => {
    const skill = file.match(/skills\/([^/]+)\/SKILL\.md$/)
    const id = skill ? skill[1] : file.match(/docs\/([^/]+)\.md$/)[1]
    return { id, group: skill ? GROUPS.skill : GROUPS.doc, title: pretty(id), load }
  })
  .sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id))

export const adeDocGroups = [...new Set(adeDocs.map(d => d.group))]

// Strips the YAML frontmatter of a SKILL.md and returns { meta, body }.
export function splitFrontmatter(markdown) {
  const m = markdown.match(FRONTMATTER)
  if (!m) return { meta: {}, body: markdown }
  const meta = {}
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (kv) meta[kv[1]] = kv[2]
  }
  return { meta, body: markdown.slice(m[0].length) }
}
