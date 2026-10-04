// Local API server. Vite (port 3000) proxies /api here.
import app from './app.js'

const port = Number(process.env.PORT) || 3001
app.listen(port, '127.0.0.1', () => console.log(`api listening on http://127.0.0.1:${port}`))
