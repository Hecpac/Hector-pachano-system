export type DeliveryResult = {
  channel: string
  attempted: boolean
  ok: boolean
  status?: number
  detail?: string
}

export type ContactLeadPayload = {
  leadId: string
  kind: 'contact_form'
  receivedAt: string
  name: string
  email: string
  company: string
  projectType: string
  message: string
}

export type AuditorLeadPayload = {
  leadId: string
  kind: 'auditor_form'
  receivedAt: string
  website: string
  email: string
}

export type LeadPayload = ContactLeadPayload | AuditorLeadPayload

export type LeadEmailInput = {
  leadId: string
  subject: string
  text: string
  replyTo: string
}

export type LeadDeliveryOutcome = {
  delivered: boolean
  webhook: DeliveryResult[]
  resend: DeliveryResult
}

export type QueueEnqueueResult = {
  enabled: boolean
  enqueued: boolean
  queueSize?: number
  reason?: string
}

export type QueuedLeadJob = {
  payload: LeadPayload
  email: LeadEmailInput
  attempts: number
  queuedAt: string
  nextAttemptAt: string
}

export type RetryQueueSummary = {
  enabled: boolean
  queueBefore: number
  processed: number
  delivered: number
  requeued: number
  dropped: number
  queueAfter: number
}
