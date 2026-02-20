'use server'

export type LeadFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

type DeliveryResult = {
  channel: string
  attempted: boolean
  ok: boolean
  status?: number
  detail?: string
}

type ContactLeadPayload = {
  leadId: string
  kind: 'contact_form'
  receivedAt: string
  name: string
  email: string
  company: string
  projectType: string
  message: string
}

type AuditorLeadPayload = {
  leadId: string
  kind: 'auditor_form'
  receivedAt: string
  website: string
  email: string
}

const INITIAL_STATE: LeadFormState = {
  status: 'idle',
  message: ''
}

const RESEND_API_URL = 'https://api.resend.com/emails'
const REQUEST_TIMEOUT_MS = 8_000
const RETRY_DELAYS_MS = [400, 1_200]

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function createLeadId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

function toErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  return String(error)
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function shouldRetryStatus(status: number): boolean {
  return status === 408 || status === 425 || status === 429 || status >= 500
}

function hasDeliveryChannelsConfigured(): boolean {
  const hasWebhook = Boolean(process.env.LEAD_WEBHOOK_URL || process.env.LEAD_WEBHOOK_BACKUP_URL)
  const hasResend = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL)
  return hasWebhook || hasResend
}

function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
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

async function sendLeadToWebhook(payload: ContactLeadPayload | AuditorLeadPayload): Promise<DeliveryResult[]> {
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

type ResendEmailInput = {
  leadId: string
  subject: string
  text: string
  replyTo: string
}

async function sendLeadToResend({ leadId, subject, text, replyTo }: ResendEmailInput): Promise<DeliveryResult> {
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

export async function submitLeadAction(
  _previousState: LeadFormState = INITIAL_STATE,
  formData: FormData
): Promise<LeadFormState> {
  const trap = String(formData.get('website') || '')
  if (trap) {
    return {
      status: 'success',
      message: 'Gracias. Te contacto pronto.'
    }
  }

  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const company = String(formData.get('company') || '').trim()
  const projectType = String(formData.get('projectType') || '').trim()
  const message = String(formData.get('message') || '').trim()

  if (!name || !email || !message) {
    return {
      status: 'error',
      message: 'Completa nombre, email y objetivo del proyecto.'
    }
  }

  if (!isValidEmail(email)) {
    return {
      status: 'error',
      message: 'Revisa el formato del email e intenta de nuevo.'
    }
  }

  const leadId = createLeadId()

  if (!hasDeliveryChannelsConfigured()) {
    if (!isProduction()) {
      console.info('[lead-form] no delivery channels configured, local fallback', {
        leadId
      })

      return {
        status: 'success',
        message: 'Recibido. (Modo local) Configuramos envío real en cuanto conectes webhook o Resend.'
      }
    }

    console.error('[lead-form] no delivery channels configured in production', { leadId })

    return {
      status: 'error',
      message: 'Formulario temporalmente no disponible. Escríbeme directo por email y lo resolvemos.'
    }
  }

  const payload: ContactLeadPayload = {
    leadId,
    kind: 'contact_form',
    receivedAt: new Date().toISOString(),
    name,
    email,
    company,
    projectType,
    message
  }

  const webhookResults = await sendLeadToWebhook(payload)
  const resendResult = await sendLeadToResend({
    leadId,
    subject: `Nuevo lead web: ${name}`,
    replyTo: email,
    text: [
      `Lead ID: ${leadId}`,
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Empresa: ${company || 'N/A'}`,
      `Tipo de proyecto: ${projectType || 'N/A'}`,
      '',
      'Objetivo:',
      message
    ].join('\n')
  })

  const deliveredViaWebhook = webhookResults.some((result) => result.ok)
  const deliveredViaResend = resendResult.ok

  if (!deliveredViaWebhook && !deliveredViaResend) {
    console.error('[lead-form] all delivery channels failed', {
      leadId,
      webhook: webhookResults,
      resend: resendResult
    })

    return {
      status: 'error',
      message: 'No pude enviar el formulario. Intenta de nuevo en unos minutos.'
    }
  }

  return {
    status: 'success',
    message: 'Listo. Te responderé en menos de 24 horas.'
  }
}

export async function submitAuditorAction(
  _previousState: LeadFormState = INITIAL_STATE,
  formData: FormData
): Promise<LeadFormState> {
  const trap = String(formData.get('trap') || '')
  if (trap) {
    return { status: 'success', message: 'Gracias.' }
  }

  const website = String(formData.get('website') || '').trim()
  const email = String(formData.get('email') || '').trim()

  if (!website || !email) {
    return { status: 'error', message: 'Completa la URL y tu email.' }
  }

  if (!isValidEmail(email)) {
    return {
      status: 'error',
      message: 'Revisa el formato del email e intenta de nuevo.'
    }
  }

  const leadId = createLeadId()

  if (!hasDeliveryChannelsConfigured()) {
    if (!isProduction()) {
      console.info('[auditor-form] no delivery channels configured, local fallback', {
        leadId
      })

      return { status: 'success', message: '¡Listo! (Modo local) Enviaremos el reporte a tu email pronto.' }
    }

    console.error('[auditor-form] no delivery channels configured in production', { leadId })

    return {
      status: 'error',
      message: 'No pude registrar la solicitud ahora. Intenta de nuevo en unos minutos.'
    }
  }

  const payload: AuditorLeadPayload = {
    leadId,
    kind: 'auditor_form',
    receivedAt: new Date().toISOString(),
    website,
    email
  }

  const webhookResults = await sendLeadToWebhook(payload)
  const resendResult = await sendLeadToResend({
    leadId,
    subject: `Nueva solicitud de auditoría web: ${website}`,
    replyTo: email,
    text: [
      `Lead ID: ${leadId}`,
      'Alguien ha solicitado una auditoría web.',
      `URL: ${website}`,
      `Email: ${email}`,
      '',
      'Revisa el sitio y envíale un reporte manual pronto.'
    ].join('\n')
  })

  const deliveredViaWebhook = webhookResults.some((result) => result.ok)
  const deliveredViaResend = resendResult.ok

  if (!deliveredViaWebhook && !deliveredViaResend) {
    console.error('[auditor-form] all delivery channels failed', {
      leadId,
      webhook: webhookResults,
      resend: resendResult
    })

    return {
      status: 'error',
      message: 'No pude enviar la solicitud. Intenta de nuevo en unos minutos.'
    }
  }

  return {
    status: 'success',
    message: 'Solicitud recibida. Recibirás tu auditoría detallada pronto.'
  }
}
