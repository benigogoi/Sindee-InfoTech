import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { fileURLToPath, URL } from 'node:url'

function apiDevServerPlugin(): Plugin {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/contact' || req.url?.startsWith('/api/contact?')) {
          try {
            const env = loadEnv('development', process.cwd(), '')
            if (env.RESEND_API_KEY && !process.env.RESEND_API_KEY) {
              process.env.RESEND_API_KEY = env.RESEND_API_KEY
            }

            const module = await server.ssrLoadModule('/api/contact.ts')
            const handler = module.default

            const vercelRes = Object.assign(res, {
              status(code: number) {
                res.statusCode = code
                return vercelRes
              },
              json(data: unknown) {
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(data))
                return vercelRes
              },
              send(body: unknown) {
                if (typeof body === 'object') {
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify(body))
                } else {
                  res.end(String(body))
                }
                return vercelRes
              },
            })

            await handler(req, vercelRes)
            return
          } catch (error) {
            console.error('API Dev Server error:', error)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(
              JSON.stringify({
                success: false,
                message: error instanceof Error ? error.message : 'Internal Server Error in local dev server',
              }),
            )
            return
          }
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), apiDevServerPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'vendor-motion'
            if (id.includes('lucide-react')) return 'vendor-icons'
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) return 'vendor-react'
          }
        },
      },
    },
  },
})
