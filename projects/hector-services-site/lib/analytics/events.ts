'use client'

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  if (typeof window === 'undefined') return

  const data = {
    event,
    ...payload,
    timestamp: Date.now()
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(data)
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    console.info('[analytics]', data)
  }
}
