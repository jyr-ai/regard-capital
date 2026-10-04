import {
  OBSIDIAN, SAHARA_GOLD, WARM_AMBER, ROYAL_PURPLE, ELECTRIC_VIOLET, VIOLET_TEXT,
  DEEP_TEAL, TERRACOTTA, SAND, UP, DOWN, WHITE,
} from './tokens.js'

// Every key UNREDACTED's DARK_THEME defines is kept, so vendored components that
// read t.<key> keep working; sync/contracts/unredacted.test.js enforces it.
export const DARK_THEME = {
  bg: OBSIDIAN,
  page: '#100E12',
  card: '#17131A',
  cardB: '#1E1924',
  border: '#2C2433',
  hi: WHITE,
  mid: '#B8AE92',
  low: '#8F8478',
  ink: '#080708',
  accent: SAHARA_GOLD,
  blue: VIOLET_TEXT,
  trueBlue: ROYAL_PURPLE,
  band: '#24103A',
  bandText: WHITE,
  navBg: '#0A090B',
  tickerBg: '#080708',
  tickerTx: SAHARA_GOLD,
  risk: TERRACOTTA,
  ok: UP,
  warn: WARM_AMBER,
  grid: '#221C27',
  shadow: 'rgba(230,168,23,0.14)',
  kpiNum: SAHARA_GOLD,
  tableAlt: '#141016',
  inputBg: '#0A090B',
  sigBg: '#120D06',
  findBg: '#121014',
  redactBg: OBSIDIAN,
  redactSt: '#222 0,#222 7px,#181818 7px,#181818 9px',
  scatterOk: UP,

  // Regard Capital additions
  purple: ROYAL_PURPLE,
  violet: ELECTRIC_VIOLET,
  violetText: VIOLET_TEXT,
  teal: DEEP_TEAL,
  sand: SAND,
  up: UP,
  down: DOWN,
  error: DOWN,
}
