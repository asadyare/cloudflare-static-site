import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowPathIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline'
import { useNginxMetrics } from '../hooks/useNginxMetrics'
import { getMetricValue, NGINX_METRIC_LABELS } from '../utils/parsePrometheusText'

function formatValue(n) {
  if (n === undefined || Number.isNaN(n)) return '—'
  if (Number.isInteger(n)) return String(n)
  return n.toFixed(2)
}

export default function DashboardLive() {
  const { metrics, error, loading, lastFetch, refresh } = useNginxMetrics(5000)
  const hasNumbers = NGINX_METRIC_LABELS.some((m) => getMetricValue(metrics, m.key) !== undefined)

  return (
    <div className="min-h-[70vh] container mx-auto px-6 py-12">
      <div className="mb-8">
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
          Metrics <span className="text-gradient-neon">/metrics</span>
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          {lastFetch && <span>Last update {lastFetch.toLocaleTimeString()} · </span>}
          Refreshes every 5s
        </p>
      </motion.div>

      <div className="flex justify-center mb-8">
        <button
          type="button"
          onClick={() => refresh()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <ArrowPathIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-xl mx-auto mb-8 rounded-xl border border-orange-500/40 bg-orange-500/10 px-4 py-3 flex gap-3 text-sm"
        >
          <ExclamationTriangleIcon className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-orange-600 dark:text-orange-400">No live metrics</p>
            <p className="text-muted-foreground mt-1">{error}</p>
          </div>
        </motion.div>
      )}

      {!error && loading && !hasNumbers && (
        <p className="text-center text-muted-foreground mb-8">Loading metrics…</p>
      )}

      {!error && hasNumbers && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {NGINX_METRIC_LABELS.map((m, i) => {
            const v = getMetricValue(metrics, m.key)
            return (
              <motion.div
                key={m.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="card-gradient rounded-xl border border-border p-6 text-center"
              >
                <ChartBarIcon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{m.label}</div>
                <div className="text-4xl font-bold text-foreground mt-2 font-mono tabular-nums">
                  {formatValue(v)}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
