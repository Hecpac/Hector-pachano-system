'use server'

import { createLeadId, deliverLead, hasDeliveryChannelsConfigured, isProduction, isValidEmail } from '@/lib/leads/delivery'
import { enqueueLeadForRetry } from '@/lib/leads/queue'
import type { AuditorLeadPayload, ContactLeadPayload, LeadEmailInput } from '@/lib/leads/types'

export type LeadFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

const INITIAL_STATE: LeadFormState = {
  status: 'idle',
  message: ''
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
  const budgetRange = String(formData.get('budgetRange') || '').trim()
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
      console.info('[lead-form] no delivery channels configured, local fallback', { leadId })

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
    message: budgetRange ? `${message}\n\nPresupuesto aproximado: ${budgetRange}` : message
  }

  const emailPayload: LeadEmailInput = {
    leadId,
    subject: `Nuevo lead web: ${name}`,
    replyTo: email,
    text: [
      `Lead ID: ${leadId}`,
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Empresa: ${company || 'N/A'}`,
      `Tipo de proyecto: ${projectType || 'N/A'}`,
      `Presupuesto aproximado: ${budgetRange || 'N/A'}`,
      '',
      'Objetivo:',
      message
    ].join('\n')
  }

  const outcome = await deliverLead(payload, emailPayload)

  if (!outcome.delivered) {
    const queueResult = await enqueueLeadForRetry({
      payload,
      email: emailPayload,
      attempts: 1
    })

    console.error('[lead-form] delivery failed in realtime', {
      leadId,
      webhook: outcome.webhook,
      resend: outcome.resend,
      queue: queueResult
    })

    if (queueResult.enqueued) {
      return {
        status: 'success',
        message: 'Recibido. Hubo una demora técnica, pero tu solicitud quedó en cola segura.'
      }
    }

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
      console.info('[auditor-form] no delivery channels configured, local fallback', { leadId })

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

  const emailPayload: LeadEmailInput = {
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
  }

  const outcome = await deliverLead(payload, emailPayload)

  if (!outcome.delivered) {
    const queueResult = await enqueueLeadForRetry({
      payload,
      email: emailPayload,
      attempts: 1
    })

    console.error('[auditor-form] delivery failed in realtime', {
      leadId,
      webhook: outcome.webhook,
      resend: outcome.resend,
      queue: queueResult
    })

    if (queueResult.enqueued) {
      return {
        status: 'success',
        message: 'Solicitud recibida. Hubo una demora técnica y quedó en cola segura.'
      }
    }

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
