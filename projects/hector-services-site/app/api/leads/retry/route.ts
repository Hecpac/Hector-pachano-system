import { NextResponse } from 'next/server'

import { processLeadRetryQueue } from '@/lib/leads/queue'

export const runtime = 'nodejs'

function isAuthorized(request: Request): boolean {
  const cronSecret = process.env.CRON_SECRET?.trim()

  if (!cronSecret) {
    return process.env.NODE_ENV !== 'production'
  }

  const authHeader = request.headers.get('authorization')
  return authHeader === `Bearer ${cronSecret}`
}

function getMaxToProcess(request: Request): number {
  const url = new URL(request.url)
  const queryValue = Number.parseInt(url.searchParams.get('max') || '', 10)
  const envValue = Number.parseInt(process.env.LEAD_RETRY_BATCH_SIZE || '', 10)

  const fallback = Number.isFinite(envValue) && envValue > 0 ? envValue : 20

  if (Number.isFinite(queryValue) && queryValue > 0) {
    return Math.min(queryValue, 100)
  }

  return Math.min(fallback, 100)
}

async function run(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: 'unauthorized'
      },
      { status: 401 }
    )
  }

  const maxToProcess = getMaxToProcess(request)
  const summary = await processLeadRetryQueue({ maxToProcess })

  return NextResponse.json({
    ok: true,
    ...summary
  })
}

export async function GET(request: Request) {
  return run(request)
}

export async function POST(request: Request) {
  return run(request)
}
