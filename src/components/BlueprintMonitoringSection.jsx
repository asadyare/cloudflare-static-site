import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChartBarIcon } from '@heroicons/react/24/outline'
import { useNginxMetrics } from '../hooks/useNginxMetrics'
import { getMetricValue, NGINX_METRIC_LABELS } from '../utils/parsePrometheusText'

function formatValue(n) {
  if (n === undefined || Number.isNaN(n)) return '—'
  if (Number.isInteger(n)) return String(n)
  return n.toFixed(2)
}

export default function BlueprintMonitoringSection() {
  const { metrics, error, loading, lastFetch } = useNginxMetrics(5000)

  return (
    <section id="monitoring" className="py-24 scroll-mt-24 relative bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="font-semibold text-sm text-primary tracking-widest uppercase">Observability</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground font-display">
            Monitoring <span className="text-gradient-neon">Stack</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
            Same-origin <code className="text-xs bg-secondary px-1 py-0.5 rounded">GET /metrics</code> — Prometheus text
            from Cloudflare (edge) when deployed on Pages, or from the container image when running on Kubernetes.
            Full view:{' '}
            <Link to="/dashboard" className="text-primary font-medium hover:underline">
              Live metrics
            </Link>
            {lastFetch && !loading && (
              <span className="block sm:inline sm:before:content-['_·_'] mt-1 sm:mt-0 text-xs">
                Updated {lastFetch.toLocaleTimeString()}
              </span>
            )}
          </p>
        </motion.div>

        {error && (
          <p className="text-center text-xs text-orange-600 dark:text-orange-400/90 mb-6 max-w-lg mx-auto">
            {error}
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 max-w-5xl mx-auto">
          {NGINX_METRIC_LABELS.map((m, i) => {
            const v = getMetricValue(metrics, m.key)
            return (
              <motion.div
                key={m.key}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="card-gradient rounded-xl border border-border p-4 md:p-5 text-center"
              >
                <ChartBarIcon className="w-4 h-4 text-primary mx-auto mb-2 opacity-80" />
                <div className="text-[10px] md:text-xs text-muted-foreground font-medium leading-tight mb-1">
                  {m.label}
                </div>
                <div className="text-xl md:text-3xl font-bold text-foreground font-mono tabular-nums">
                  {loading && !error ? '…' : formatValue(v)}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
