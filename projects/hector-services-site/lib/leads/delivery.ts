import 'server-only'

import type { DeliveryResult, LeadDeliveryOutcome, LeadEmailInput, LeadPayload } from './types'

const RESEND_API_URL = 'https://api.resend.com/emails'
const REQUEST_TIMEOUT_MS = 8_000
const RETRY_DELAYS_MS = [400, 1_200]

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function toErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  return String(error)
}

function shouldRetryStatus(status: number): boolean {
  return status === 408 || status === 425 || status === 429 || status >= 500
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs = REQUEST_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await fetch(url, {
      ...init,
      cache: 'no-store',
      signal: controller.signal
    })
  } finally {
    clearTimeout(timeoutId)
  }
}

type PostJsonOptions = {
  channel: string
  url?: string
  body: unknown
  headers?: Record<string, string>
}

async function postJsonWithRetry({ channel, url, body, headers = {} }: PostJsonOptions): Promise<DeliveryResult> {
  const targetUrl = url?.trim()
  if (!targetUrl) {
    return {
      channel,
      attempted: false,
      ok: false,
      detail: 'not-configured'
    }
  }

  const maxAttempts = RETRY_DELAYS_MS.length + 1

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetchWithTimeout(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: JSON.stringify(body)
      })

      const detail = (await response.text()).slice(0, 800)

      if (response.ok) {
        return {
          channel,
          attempted: true,
          ok: true,
          status: response.status,
          detail
        }
      }

      const retryable = shouldRetryStatus(response.status)

      console.error(`[${channel}] request failed`, {
        status: response.status,
        retryable,
        attempt,
        maxAttempts
      })

      if (!retryable || attempt === maxAttempts) {
        return {
          channel,
          attempted: true,
          ok: false,
          status: response.status,
          detail
        }
      }
    } catch (error) {
      const detail = toErrorMessage(error)

      console.error(`[${channel}] request error`, {
        detail,
        attempt,
        maxAttempts
      })

      if (attempt === maxAttempts) {
        return {
          channel,
          attempted: true,
          ok: false,
          detail
        }
      }
    }

    const delay = RETRY_DELAYS_MS[Math.min(attempt - 1, RETRY_DELAYS_MS.length - 1)]
    await wait(delay)
  }

  return {
    channel,
    attempted: true,
    ok: false,
    detail: 'retries-exhausted'
  }
}

async function sendLeadToWebhook(payload: LeadPayload): Promise<DeliveryResult[]> {
  const webhookToken = process.env.LEAD_WEBHOOK_BEARER_TOKEN?.trim()
  const commonHeaders: Record<string, string> = {
    'X-Lead-Id': payload.leadId
  }

  if (webhookToken) {
    commonHeaders.Authorization = `Bearer ${webhookToken}`
  }

  const endpoints = [
    { channel: 'lead-webhook-primary', url: process.env.LEAD_WEBHOOK_URL },
    { channel: 'lead-webhook-backup', url: process.env.LEAD_WEBHOOK_BACKUP_URL }
  ]

  const results: DeliveryResult[] = []

  for (const endpoint of endpoints) {
    const result = await postJsonWithRetry({
      channel: endpoint.channel,
      url: endpoint.url,
      body: payload,
      headers: commonHeaders
    })

    if (!result.attempted) {
      continue
    }

    results.push(result)

    if (result.ok) {
      break
    }
  }

  return results
}

async function sendLeadToResend({ leadId, subject, text, replyTo }: LeadEmailInput): Promise<DeliveryResult> {
  const resendKey = process.env.RESEND_API_KEY?.trim()
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim()
  const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim() || 'Leads <onboarding@resend.dev>'

  if (!resendKey || !toEmail) {
    return {
      channel: 'resend',
      attempted: false,
      ok: false,
      detail: 'not-configured'
    }
  }

  return postJsonWithRetry({
    channel: 'resend',
    url: RESEND_API_URL,
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'X-Lead-Id': leadId
    },
    body: {
      from: fromEmail,
      to: [toEmail],
      subject,
      reply_to: replyTo,
      text
    }
  })
}

export function createLeadId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function hasDeliveryChannelsConfigured(): boolean {
  const hasWebhook = Boolean(process.env.LEAD_WEBHOOK_URL || process.env.LEAD_WEBHOOK_BACKUP_URL)
  const hasResend = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL)
  return hasWebhook || hasResend
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

export async function deliverLead(payload: LeadPayload, email: LeadEmailInput): Promise<LeadDeliveryOutcome> {
  const webhook = await sendLeadToWebhook(payload)
  const resend = await sendLeadToResend(email)

  const delivered = webhook.some((result) => result.ok) || resend.ok

  return {
    delivered,
    webhook,
    resend
  }
}
