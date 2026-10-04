// Afrofuturismo Digital design tokens (designmd.app/library/afrofuturismo-digital).
// Dark only. Contrast ratios against bg #0D0D0D are noted where a colour carries text.
//
// The names ORANGE, BLUE, WHITE, FONT_MONO and FONT_SERIF are the token contract of
// the vendored UNREDACTED components (upstream/unredacted/src/theme/tokens.js).
// vite.config.js resolves their imports here, so these names must keep existing.
// sync/contracts/unredacted.test.js fails if upstream adds a name not exported here.

// ── Palette ────────────────────────────────────────────────────────────────
export const OBSIDIAN = '#0D0D0D'
export const SAHARA_GOLD = '#E6A817' // 9.2:1, primary accent for text
export const WARM_AMBER = '#FFBF00' // 11.8:1, warnings
export const ROYAL_PURPLE = '#6A0DAD' // 2.1:1, fills and indicators only, never text
export const ELECTRIC_VIOLET = '#8F00FF' // 3.3:1, fills and glows only
export const VIOLET_TEXT = '#B266FF' // 5.8:1, violet when it has to be readable
export const DEEP_TEAL = '#014D4E' // 2.0:1, surfaces only
export const TERRACOTTA = '#C1440E' // 3.8:1, error fills and borders
export const SAND = '#C2B280' // 9.2:1, decorative

// Market semantics. The palette has no gain colour, so `UP` is a lifted teal
// and `DOWN` a lifted terracotta, both AA on every surface.
export const UP = '#3DBFA8' // 8.5:1
export const DOWN = '#E8643A' // 5.8:1

// ── UNREDACTED token contract (remapped) ──────────────────────────────────
export const ORANGE = SAHARA_GOLD
export const BLUE = ROYAL_PURPLE
export const WHITE = '#F4EEDF' // warm off-white; the design system bans pure white/black

// ── Type ───────────────────────────────────────────────────────────────────
export const FONT_SANS = "'Josefin Sans', system-ui, sans-serif"
export const FONT_MONO = "'JetBrains Mono', ui-monospace, monospace"
export const FONT_SERIF = FONT_SANS // UNREDACTED's body font slot

// ── Shape, space, motion ────────────────────────────────────────────────────
export const RADIUS = 12
export const SPACE = 8
export const MAX_WIDTH = 1280
export const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'
export const Z = { base: 0, nav: 100, overlay: 200, modal: 300, toast: 500 }
