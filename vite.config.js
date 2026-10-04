import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const ROOT = path.dirname(new URL(import.meta.url).pathname)
const UPSTREAM_THEME = path.join(ROOT, 'upstream/unredacted/src/theme')
const OUR_THEME = path.join(ROOT, 'src/theme')

// Vendored UNREDACTED components import '../theme/tokens.js' and friends. Point
// those imports at our Afrofuturismo theme so upstream files stay byte-for-byte
// untouched and still render in our design system.
function themeShim() {
  return {
    name: 'regard-theme-shim',
    enforce: 'pre',
    resolveId(source, importer) {
      if (!importer || !source.startsWith('.')) return null
      const target = path.resolve(path.dirname(importer), source)
      if (path.dirname(target) !== UPSTREAM_THEME) return null
      return path.join(OUR_THEME, path.basename(target))
    },
  }
}

export default defineConfig({
  plugins: [themeShim(), react()],
  server: {
    port: 3000,
    proxy: { '/api': 'http://127.0.0.1:3001' },
  },
  build: {
    chunkSizeWarningLimit: 900,
  },
})
