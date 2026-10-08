import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import app from './server/app.js'

try {
  process.loadEnvFile?.()
} catch {
  // .env file is optional
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = 3000
const isProd = process.env.NODE_ENV === 'production'

const server = express()

// Mount API routes and middlewares from server/app.js
server.use(app)

if (isProd) {
  server.use(express.static(path.resolve(__dirname, 'dist')))
  server.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist/index.html'))
  })
} else {
  const { createServer: createViteServer } = await import('vite')
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
      host: '0.0.0.0',
    },
    appType: 'spa',
  })
  server.use(vite.middlewares)
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[regard-capital] server listening on http://0.0.0.0:${PORT} (${isProd ? 'production' : 'dev'})`)
})
