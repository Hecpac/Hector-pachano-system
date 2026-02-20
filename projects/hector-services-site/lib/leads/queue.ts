import 'server-only'

import { Redis } from '@upstash/redis'

import { deliverLead } from './delivery'
import type { LeadEmailInput, LeadPayload, QueueEnqueueResult, QueuedLeadJob, RetryQueueSummary } from './types'

const LEAD_RETRY_QUEUE_KEY = 'lead_retry_queue:v1'

let redisClient: Redis | null | undefined

function parseInteger(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value || '', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

function getRedisClient(): Redis | null {
  if (redisClient !== undefined) {
    return redisClient
  }

  const disabled = process.env.LEAD_RETRY_QUEUE_ENABLED?.toLowerCase() === 'false'
  const url = process.env.KV_REST_API_URL?.trim() || process.env.UPSTASH_REDIS_REST_URL?.trim()
  const token = process.env.KV_REST_API_TOKEN?.trim() || process.env.UPSTASH_REDIS_REST_TOKEN?.trim()

  if (disabled || !url || !token) {
    redisClient = null
    return redisClient
  }

  redisClient = new Redis({
    url,
    token
  })

  return redisClient
}

function maxAttempts(): number {
  return parseInteger(process.env.LEAD_RETRY_MAX_ATTEMPTS, 6)
}

function baseDelayMs(): number {
  return parseInteger(process.env.LEAD_RETRY_BASE_DELAY_MS, 60_000)
}

function maxDelayMs(): number {
  return parseInteger(process.env.LEAD_RETRY_MAX_DELAY_MS, 1_800_000)
}

function computeBackoffMs(attempts: number): number {
  const exponential = baseDelayMs() * 2 ** Math.max(0, attempts - 1)
  return Math.min(exponential, maxDelayMs())
}

async function getQueueSize(redis: Redis): Promise<number> {
  const size = await redis.llen(LEAD_RETRY_QUEUE_KEY)
  return typeof size === 'number' ? size : 0
}

function isQueuedLeadJob(value: unknown): value is QueuedLeadJob {
  if (!value || typeof value !== 'object') {
    return false
  }

  const job = value as Partial<QueuedLeadJob>

  return (
    typeof job.attempts === 'number' &&
    typeof job.queuedAt === 'string' &&
    typeof job.nextAttemptAt === 'string' &&
    Boolean(job.payload && typeof job.payload === 'object') &&
    Boolean(job.email && typeof job.email === 'object')
  )
}

export async function enqueueLeadForRetry({
  payload,
  email,
  attempts = 1
}: {
  payload: LeadPayload
  email: LeadEmailInput
  attempts?: number
}): Promise<QueueEnqueueResult> {
  const redis = getRedisClient()

  if (!redis) {
    return {
      enabled: false,
      enqueued: false,
      reason: 'queue-disabled-or-missing-kv'
    }
  }

  const job: QueuedLeadJob = {
    payload,
    email,
    attempts,
    queuedAt: new Date().toISOString(),
    nextAttemptAt: new Date(Date.now() + computeBackoffMs(attempts)).toISOString()
  }

  try {
    await redis.lpush(LEAD_RETRY_QUEUE_KEY, JSON.stringify(job))
    const queueSize = await getQueueSize(redis)

    return {
      enabled: true,
      enqueued: true,
      queueSize
    }
  } catch (error) {
    console.error('[lead-queue] enqueue failed', {
      leadId: payload.leadId,
      error: error instanceof Error ? error.message : String(error)
    })

    return {
      enabled: true,
      enqueued: false,
      reason: 'enqueue-failed'
    }
  }
}

export async function processLeadRetryQueue({ maxToProcess = 20 }: { maxToProcess?: number } = {}): Promise<RetryQueueSummary> {
  const redis = getRedisClient()

  if (!redis) {
    return {
      enabled: false,
      queueBefore: 0,
      processed: 0,
      delivered: 0,
      requeued: 0,
      dropped: 0,
      queueAfter: 0
    }
  }

  const queueBefore = await getQueueSize(redis)

  const summary: RetryQueueSummary = {
    enabled: true,
    queueBefore,
    processed: 0,
    delivered: 0,
    requeued: 0,
    dropped: 0,
    queueAfter: queueBefore
  }

  const iterations = Math.min(Math.max(1, maxToProcess), queueBefore)

  for (let i = 0; i < iterations; i += 1) {
    const raw = await redis.rpop<string>(LEAD_RETRY_QUEUE_KEY)

    if (!raw) {
      break
    }

    summary.processed += 1

    let parsed: unknown

    try {
      parsed = JSON.parse(raw)
    } catch {
      summary.dropped += 1
      continue
    }

    if (!isQueuedLeadJob(parsed)) {
      summary.dropped += 1
      continue
    }

    const job = parsed as QueuedLeadJob

    if (Date.parse(job.nextAttemptAt) > Date.now()) {
      await redis.lpush(LEAD_RETRY_QUEUE_KEY, JSON.stringify(job))
      summary.requeued += 1
      continue
    }

    const outcome = await deliverLead(job.payload, job.email)

    if (outcome.delivered) {
      summary.delivered += 1
      continue
    }

    const nextAttempts = job.attempts + 1

    if (nextAttempts > maxAttempts()) {
      summary.dropped += 1

      console.error('[lead-queue] dropping job after max attempts', {
        leadId: job.payload.leadId,
        attempts: nextAttempts,
        webhook: outcome.webhook,
        resend: outcome.resend
      })

      continue
    }

    const requeuedJob: QueuedLeadJob = {
      ...job,
      attempts: nextAttempts,
      nextAttemptAt: new Date(Date.now() + computeBackoffMs(nextAttempts)).toISOString()
    }

    await redis.lpush(LEAD_RETRY_QUEUE_KEY, JSON.stringify(requeuedJob))
    summary.requeued += 1
  }

  summary.queueAfter = await getQueueSize(redis)

  return summary
}
