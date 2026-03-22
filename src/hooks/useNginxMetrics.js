import { useCallback, useEffect, useState } from 'react'
import { parsePrometheusText } from '../utils/parsePrometheusText'

function isHtmlResponse(text) {
  const t = text.trimStart().slice(0, 64).toLowerCase()
  return t.startsWith('<!doctype') || t.startsWith('<html') || t.startsWith('<!') || t.includes('<head')
}

/**
 * Fetches same-origin GET /metrics (nginx-prometheus-exporter).
 * Rejects HTML bodies (e.g. SPA fallback on static hosts) so we don't show empty "success".
 */
export function useNginxMetrics(pollMs = 5000) {
  const [metrics, setMetrics] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetch, setLastFetch] = useState(null)

  const fetchMetrics = useCallback(async () => {
    try {
      const res = await fetch('/metrics', {
        cache: 'no-store',
        headers: { Accept: 'text/plain' },
      })
      const text = await res.text()

      if (isHtmlResponse(text)) {
        setError('Not a metrics endpoint (got HTML). Use the container image or npm run dev / npm run preview.')
        setMetrics({})
        setLastFetch(new Date())
        return
      }

      if (!res.ok) {
        setError(`${res.status} ${res.statusText}`)
        setMetrics({})
        setLastFetch(new Date())
        return
      }

      if (!text.trim()) {
        setError('Empty /metrics response')
        setMetrics({})
        setLastFetch(new Date())
        return
      }

      const parsed = parsePrometheusText(text)
      if (Object.keys(parsed).length === 0) {
        setError('Response was not valid Prometheus text')
        setMetrics({})
      } else {
        setError(null)
        setMetrics(parsed)
      }
      setLastFetch(new Date())
    } catch (e) {
      setError(e.message || 'Network error')
      setMetrics({})
      setLastFetch(new Date())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMetrics()
    if (pollMs <= 0) return undefined
    const id = setInterval(fetchMetrics, pollMs)
    return () => clearInterval(id)
  }, [fetchMetrics, pollMs])

  return { metrics, error, loading, lastFetch, refresh: fetchMetrics }
}
