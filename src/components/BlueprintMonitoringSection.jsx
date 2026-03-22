import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ShieldCheckIcon,
  ChartBarIcon,
  ServerStackIcon,
  CalendarDaysIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline'

/**
 * Ground truth: portfolio-k8s-security
 * - k8s/observability/grafana-dashboard-configmap.yaml (ingress panels + PromQL)
 * - Docker/nginx + nginx-prometheus-exporter sidecar: GET /metrics (pod metrics)
 * - docs/OBSERVABILITY.md, portfolio-servicemonitor.yaml, scripts/install-observability.sh
 *
 * Ingress metrics: ingress-nginx. Pod metrics: nginx stub_status → exporter (see /dashboard in app).
 */

const ingressMetrics = [
  {
    title: 'Request rate by status',
    unit: 'req/s',
    series: 'nginx_ingress_controller_requests',
    description:
      'HTTP requests per second grouped by status code (2xx / 4xx / 5xx). Filtered to ingress names matching portfolio.* in namespace portfolio.',
    expr:
      'sum(rate(nginx_ingress_controller_requests{ingress=~"portfolio.*",namespace="portfolio"}[5m])) by (status)',
  },
  {
    title: 'Total request rate',
    unit: 'req/s',
    series: 'nginx_ingress_controller_requests',
    description: 'Aggregate RPS to the portfolio Ingress (same labels as above).',
    expr:
      'sum(rate(nginx_ingress_controller_requests{ingress=~"portfolio.*",namespace="portfolio"}[5m]))',
  },
  {
    title: 'Request latency p95',
    unit: 'seconds',
    series: 'nginx_ingress_controller_request_duration_seconds_bucket',
    description: '95th percentile of request duration from the ingress histogram.',
    expr:
      'histogram_quantile(0.95, sum(rate(nginx_ingress_controller_request_duration_seconds_bucket{ingress=~"portfolio.*",namespace="portfolio"}[5m])) by (le))',
  },
  {
    title: 'Request latency p99',
    unit: 'seconds',
    series: 'nginx_ingress_controller_request_duration_seconds_bucket',
    description: '99th percentile of request duration from the ingress histogram.',
    expr:
      'histogram_quantile(0.99, sum(rate(nginx_ingress_controller_request_duration_seconds_bucket{ingress=~"portfolio.*",namespace="portfolio"}[5m])) by (le))',
  },
]

const selfHostedStack = {
  helmRelease: 'prometheus',
  helmChart: 'prometheus-community/kube-prometheus-stack',
  namespace: 'monitoring',
  grafanaService: 'prometheus-grafana',
  dashboardTitle: 'Portfolio Application Overview',
  dashboardUid: 'portfolio-overview',
  configMap: 'portfolio-dashboard',
  configMapPath: 'k8s/observability/grafana-dashboard-configmap.yaml',
}

const provisionSteps = [
  'Install: ./scripts/install-observability.sh (or .ps1) — runs Helm with grafana.sidecar.dashboards.enabled=true, then kubectl apply on the dashboard ConfigMap.',
  'Manual Helm (same as script): helm upgrade --install prometheus prometheus-community/kube-prometheus-stack -n monitoring --create-namespace --set grafana.sidecar.dashboards.enabled=true',
  'Apply dashboard: kubectl apply -f k8s/observability/grafana-dashboard-configmap.yaml (ConfigMap in namespace monitoring, label grafana_dashboard: "1").',
  'Grafana UI: kubectl port-forward -n monitoring svc/prometheus-grafana 3000:80 → http://localhost:3000 (default admin / prom-operator; rotate password).',
  'Open Dashboards → browse for “Portfolio Application Overview” (uid portfolio-overview). Adjust ingress/namespace in panel queries if yours differ.',
]

const exploreQueries = [
  {
    label: 'RPS to portfolio ingress',
    expr: 'rate(nginx_ingress_controller_requests{ingress="portfolio"}[5m])',
    note: 'Use exact ingress name if you prefer; dashboard uses regex portfolio.*',
  },
  {
    label: 'Latency histogram (raw series)',
    expr: 'nginx_ingress_controller_request_duration_seconds_bucket{ingress="portfolio"}',
    note: 'From docs/OBSERVABILITY.md — align labels with your Ingress object name.',
  },
]

const securityEvidence = [
  {
    title: 'CI & scan evidence',
    body:
      'portfolio-ci-cd-security shared-security: NPM audit, Gitleaks SARIF, Semgrep, Trivy image scan → Actions + Security tab.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Scheduled assurance',
    body:
      'portfolio-daily-security: daily/weekly cron — Gitleaks, npm audit, Trivy FS SARIF, SBOM; issues on failure.',
    icon: CalendarDaysIcon,
  },
  {
    title: 'Runtime (Falco)',
    body: 'portfolio-k8s-security k8s/runtime: Falco DaemonSet — syscall-based alerts, not Prometheus gauges.',
    icon: ServerStackIcon,
  },
]

const optionalRum = [
  'Browser RUM (errors, Web Vitals, traces): @grafana/faro-web-sdk in portfolio-frontend — wire initializeFaro() after deploying a Faro collector in-cluster (see Grafana Faro self-hosted docs) or use Grafana Cloud collector URL.',
  'Cluster-wide: kube-prometheus-stack also ships node and Kubernetes control-plane metrics by default — use Grafana Explore with the Prometheus datasource.',
]

export default function BlueprintMonitoringSection() {
  return (
    <section id="monitoring" className="py-24 scroll-mt-24 relative bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="font-semibold text-sm text-primary tracking-widest uppercase">Observability</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground font-display">
            Monitoring <span className="text-gradient-neon">Stack</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
            <strong className="text-foreground">Self-hosted Kubernetes:</strong> install{' '}
            <code className="text-xs bg-secondary px-1 py-0.5 rounded">kube-prometheus-stack</code> per{' '}
            <code className="text-xs bg-secondary px-1 py-0.5 rounded">portfolio-k8s-security</code>. Edge traffic
            metrics come from <strong className="text-foreground">ingress-nginx</strong>; the container image adds{' '}
            <code className="text-xs bg-secondary px-1 py-0.5 rounded">GET /metrics</code> (nginx →
            nginx-prometheus-exporter sidecar) for pod-level series such as{' '}
            <code className="text-xs bg-secondary px-1 py-0.5 rounded">nginx_http_requests_total</code>.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Live metrics dashboard
            </Link>
            <span className="text-xs text-muted-foreground max-w-md text-center">
              Polls same-origin <code className="bg-secondary px-1 rounded">/metrics</code> · mock data in{' '}
              <code className="bg-secondary px-1 rounded">npm run dev</code>
            </span>
          </div>
        </motion.div>

        {/* Real Prometheus series used in the repo dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <ChartBarIcon className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Real metrics (ingress-nginx → Prometheus)</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4 max-w-3xl">
            These match the panels in{' '}
            <code className="text-[10px] bg-secondary px-1 rounded">grafana-dashboard-configmap.yaml</code>: series
            names and PromQL below are what Grafana charts once the stack is running and ingress exposes metrics on
            the controller (see OBSERVABILITY.md troubleshooting for port-forward to :10254).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ingressMetrics.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="card-gradient rounded-xl border border-border p-5 text-left"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <span className="font-semibold text-foreground text-sm">{m.title}</span>
                  <span className="text-[10px] uppercase tracking-wide text-primary font-medium">{m.unit}</span>
                </div>
                <code className="text-[10px] text-accent block mb-2 break-all">{m.series}</code>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{m.description}</p>
                <div className="rounded-lg bg-secondary/80 border border-border p-2 overflow-x-auto">
                  <code className="text-[10px] text-foreground whitespace-pre-wrap break-all font-mono leading-snug">
                    {m.expr}
                  </code>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Deploy & Grafana */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-gradient rounded-xl border border-border p-6 mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <CommandLineIcon className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Self-hosted stack &amp; Grafana dashboard</h3>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs mb-4">
            <div>
              <dt className="text-muted-foreground">Helm release / chart</dt>
              <dd className="text-foreground font-mono text-[11px] mt-0.5">
                {selfHostedStack.helmRelease} — {selfHostedStack.helmChart}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Namespace</dt>
              <dd className="text-foreground font-mono text-[11px] mt-0.5">{selfHostedStack.namespace}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Grafana Service</dt>
              <dd className="text-foreground font-mono text-[11px] mt-0.5">{selfHostedStack.grafanaService}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Dashboard (provisioned)</dt>
              <dd className="text-foreground text-[11px] mt-0.5">
                “{selfHostedStack.dashboardTitle}” — uid <code className="bg-secondary px-1 rounded">{selfHostedStack.dashboardUid}</code>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground">ConfigMap</dt>
              <dd className="text-foreground font-mono text-[11px] mt-0.5">
                {selfHostedStack.configMap} ← {selfHostedStack.configMapPath}
              </dd>
            </div>
          </dl>
          <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed border-t border-border pt-4">
            {provisionSteps.map((step) => (
              <li key={step} className="flex gap-2">
                <span className="text-primary shrink-0">→</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Explore shortcuts from docs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h3 className="font-semibold text-foreground text-sm mb-3">Grafana Explore (extra PromQL from docs)</h3>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-xs">
              <thead className="bg-secondary/50 text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">Label</th>
                  <th className="px-3 py-2 font-medium">Expression</th>
                  <th className="px-3 py-2 font-medium hidden md:table-cell">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {exploreQueries.map((row) => (
                  <tr key={row.label} className="text-foreground">
                    <td className="px-3 py-2 whitespace-nowrap text-primary font-medium">{row.label}</td>
                    <td className="px-3 py-2 font-mono text-[10px] break-all">{row.expr}</td>
                    <td className="px-3 py-2 text-muted-foreground hidden md:table-cell">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">
            Full guide: <code className="bg-secondary px-1 rounded">portfolio-k8s-security/docs/OBSERVABILITY.md</code>
          </p>
        </motion.div>

        {/* Optional RUM + cluster */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-dashed border-border bg-secondary/20 p-5 mb-10"
        >
          <h3 className="font-semibold text-foreground text-sm mb-2">Optional: browser RUM &amp; cluster metrics</h3>
          <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            {optionalRum.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="text-primary shrink-0">+</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Security / governance (non-Prometheus) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheckIcon className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Security &amp; governance evidence</h3>
            <span className="text-[10px] text-muted-foreground">(GitHub / Falco — not live ingress metrics)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {securityEvidence.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="card-gradient rounded-xl border border-border p-4 text-left"
                >
                  <Icon className="w-4 h-4 text-primary mb-2" />
                  <div className="font-semibold text-foreground text-xs mb-1">{item.title}</div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{item.body}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
