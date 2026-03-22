/**
 * Parse Prometheus text exposition format (0.0.4) into a flat map.
 * Handles lines like: metric_name{labels} value  OR  metric_name value
 */
export function parsePrometheusText(text) {
  const metrics = {}
  if (!text || typeof text !== 'string') return metrics

  for (const line of text.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const withLabels = trimmed.match(/^([^{]+)\{([^}]*)\}\s+(-?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*$/)
    if (withLabels) {
      const key = `${withLabels[1].trim()}{${withLabels[2]}}`
      const val = parseFloat(withLabels[3])
      if (!Number.isNaN(val)) metrics[key] = val
      continue
    }

    const simple = trimmed.match(/^(\S+)\s+(-?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*$/)
    if (simple) {
      const val = parseFloat(simple[2])
      if (!Number.isNaN(val)) metrics[simple[1]] = val
    }
  }
  return metrics
}

/** Prefer unlabeled series for display when present */
export function getMetricValue(metrics, baseName) {
  const keys = Object.keys(metrics)
  const exact = keys.find((k) => k === baseName)
  if (exact !== undefined) return metrics[exact]
  const withLabels = keys.find((k) => k.startsWith(`${baseName}{`))
  if (withLabels !== undefined) return metrics[withLabels]
  return undefined
}

export const NGINX_METRIC_LABELS = [
  { key: 'nginx_http_requests_total', label: 'HTTP requests (total)', unit: '' },
  { key: 'nginx_connections_active', label: 'Active connections', unit: '' },
  { key: 'nginx_connections_reading', label: 'Reading', unit: '' },
  { key: 'nginx_connections_writing', label: 'Writing', unit: '' },
  { key: 'nginx_connections_waiting', label: 'Waiting', unit: '' },
]
