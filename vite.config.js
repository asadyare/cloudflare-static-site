import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Mock Prometheus exposition for local dev & preview (matches nginx-prometheus-exporter shape).
const MOCK_METRICS = `# HELP nginx_connections_active Active client connections
# TYPE nginx_connections_active gauge
nginx_connections_active 3
# HELP nginx_connections_reading Connections in reading state
# TYPE nginx_connections_reading gauge
nginx_connections_reading 1
# HELP nginx_connections_waiting Connections in waiting state
# TYPE nginx_connections_waiting gauge
nginx_connections_waiting 2
# HELP nginx_connections_writing Connections in writing state
# TYPE nginx_connections_writing gauge
nginx_connections_writing 1
# HELP nginx_http_requests_total Total requests
# TYPE nginx_http_requests_total counter
nginx_http_requests_total 1247
`

function metricsMiddleware(req, res, next) {
  if (req.url === '/metrics' || req.url?.startsWith('/metrics?')) {
    res.setHeader('Content-Type', 'text/plain; version=0.0.4; charset=utf-8')
    res.end(MOCK_METRICS)
    return
  }
  next()
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'dev-metrics-endpoint',
      configureServer(server) {
        server.middlewares.use(metricsMiddleware)
      },
      configurePreviewServer(server) {
        server.middlewares.use(metricsMiddleware)
      },
    },
  ],
})
