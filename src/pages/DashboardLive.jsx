import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowPathIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline'
import { parsePrometheusText, getMetricValue, NGINX_METRIC_LABELS } from '../utils/parsePrometheusText'

const POLL_MS = 5000

function formatValue(n) {
  if (n === undefined || Number.isNaN(n)) return '—'
  if (Number.isInteger(n)) return String(n)
  return n.toFixed(2)
}

export default function DashboardLive() {
  const [metrics, setMetrics] = useState({})
  const [raw, setRaw] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)
  const [lastFetch, setLastFetch] = useState(null)
  const [showRaw, setShowRaw] = useState(false)

  const fetchMetrics = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      const res = await fetch('/metrics', {
        cache: 'no-store',
        headers: { Accept: 'text/plain' },
      })
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }
      const text = await res.text()
      setRaw(text)
      setMetrics(parsePrometheusText(text))
      setLastFetch(new Date())
      setStatus('ok')
    } catch (e) {
      setError(e.message || 'Failed to fetch /metrics')
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    fetchMetrics()
    const id = setInterval(fetchMetrics, POLL_MS)
    return () => clearInterval(id)
  }, [fetchMetrics])

  const hasData = Object.keys(metrics).length > 0

  return (
    <div className="min-h-[70vh] container mx-auto px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <span className="font-semibold text-sm text-primary tracking-widest uppercase">Live</span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 text-foreground font-display">
          Nginx <span className="text-gradient-neon">metrics</span>
        </h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
          Same-origin <code className="text-xs bg-secondary px-1 py-0.5 rounded">GET /metrics</code> — Prometheus
          text from <strong className="text-foreground">nginx-prometheus-exporter</strong> (pod sidecar) when you run
          the container image on Kubernetes. On Cloudflare Pages /{' '}
          <code className="text-xs bg-secondary px-1 py-0.5 rounded">npm run dev</code>, this page uses a dev mock or
          shows an error — that&apos;s expected.
        </p>
      </motion.div>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        <button
          type="button"
          onClick={() => fetchMetrics()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <ArrowPathIcon className={`w-4 h-4 ${status === 'loading' ? 'animate-spin' : ''}`} />
          Refresh
        </button>
        {lastFetch && (
          <span className="text-xs text-muted-foreground">
            Last update: {lastFetch.toLocaleTimeString()}
          </span>
        )}
        <button
          type="button"
          onClick={() => setShowRaw(!showRaw)}
          className="text-xs text-primary font-medium hover:underline"
        >
          {showRaw ? 'Hide' : 'Show'} raw exposition
        </button>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl mx-auto mb-8 rounded-xl border border-orange-500/40 bg-orange-500/10 px-4 py-3 flex gap-3 text-sm text-foreground"
        >
          <ExclamationTriangleIcon className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-orange-600 dark:text-orange-400">Could not load /metrics</p>
            <p className="text-muted-foreground mt-1">{error}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Deploy the Docker image with the nginx + exporter sidecar, or run{' '}
              <code className="bg-secondary px-1 rounded">npm run dev</code> for mock data.
            </p>
          </div>
        </motion.div>
      )}

      {status === 'ok' && !hasData && !error && (
        <p className="text-center text-sm text-muted-foreground mb-8">Empty response — no metric lines parsed.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {NGINX_METRIC_LABELS.map((m, i) => {
          const v = getMetricValue(metrics, m.key)
          return (
            <motion.div
              key={m.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="card-gradient rounded-xl border border-border p-5"
            >
              <ChartBarIcon className="w-5 h-5 text-primary mb-2" />
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{m.label}</div>
              <div className="text-2xl font-bold text-foreground mt-1 font-mono">{formatValue(v)}</div>
              <div className="text-[10px] text-muted-foreground mt-2 font-mono truncate" title={m.key}>
                {m.key}
              </div>
            </motion.div>
          )
        })}
      </div>

      {showRaw && raw && (
        <motion.pre
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto rounded-xl border border-border bg-secondary/40 p-4 text-[10px] font-mono text-foreground overflow-x-auto whitespace-pre-wrap break-all"
        >
          {raw}
        </motion.pre>
      )}
    </div>
  )
}
