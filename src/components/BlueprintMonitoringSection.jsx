import { motion } from 'framer-motion'
import { ShieldCheckIcon, ChartBarIcon, CubeIcon, ServerStackIcon } from '@heroicons/react/24/outline'

const metrics = [
  { label: 'Uptime', value: '99.97%', icon: ServerStackIcon, trend: '+0.02%' },
  { label: 'Avg Response', value: '42ms', icon: ChartBarIcon, trend: '-8ms' },
  { label: 'CPU Usage', value: '34%', icon: CubeIcon, trend: '-3%' },
  { label: 'Disk I/O', value: '12MB/s', icon: ChartBarIcon, trend: 'stable' },
]

const dashboards = [
  'Grafana dashboard definitions (ConfigMap in repo)',
  'Falco runtime rules and DaemonSet manifests',
  'Daily / weekly security automation (separate repo)',
  'CI scans and SARIF from GitHub Actions',
]

export default function BlueprintMonitoringSection() {
  return (
    <section id="monitoring" className="py-24 scroll-mt-24 relative bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-semibold text-sm text-primary tracking-widest uppercase">Observability</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground font-display">
            Monitoring <span className="text-gradient-neon">Stack</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Evidence-driven visibility for CI scans, runtime security events, and operational health.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {metrics.map((m, i) => {
            const Icon = m.icon
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card-gradient rounded-xl border border-border p-5 text-center"
              >
                <Icon className="w-5 h-5 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground">{m.value}</div>
                <div className="text-xs text-muted-foreground font-medium mt-1">{m.label}</div>
                <div className="text-xs text-accent font-semibold mt-2">{m.trend}</div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-gradient rounded-xl border border-border p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <ChartBarIcon className="w-6 h-6 text-primary" />
            <h3 className="font-semibold text-foreground text-lg">Dashboards</h3>
            <ShieldCheckIcon className="w-4 h-4 text-primary ml-auto" />
            <span className="text-xs font-semibold text-primary">Alerting ready</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {dashboards.map((d) => (
              <div
                key={d}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary/50 border border-border"
              >
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm text-foreground">{d}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

