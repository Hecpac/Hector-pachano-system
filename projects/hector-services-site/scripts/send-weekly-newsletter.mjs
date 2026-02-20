#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const postsPath = path.join(projectRoot, 'content', 'blog', 'posts.ts')
const stateDir = path.join(projectRoot, '.openclaw')
const statePath = path.join(stateDir, 'newsletter-state.json')

function parseEnvLine(line) {
  const clean = line.trim()
  if (!clean || clean.startsWith('#')) return null

  const idx = clean.indexOf('=')
  if (idx === -1) return null

  const key = clean.slice(0, idx).trim()
  let value = clean.slice(idx + 1).trim()

  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1)
  }

  return { key, value }
}

async function loadEnvFiles() {
  // Load .env first, then .env.local so local values win deterministically.
  const envFiles = [path.join(projectRoot, '.env'), path.join(projectRoot, '.env.local')]

  for (const envFile of envFiles) {
    try {
      const raw = await fs.readFile(envFile, 'utf8')
      for (const line of raw.split(/\r?\n/)) {
        const parsed = parseEnvLine(line)
        if (!parsed) continue
        process.env[parsed.key] = parsed.value
      }
    } catch {
      // ignore missing env files
    }
  }
}

function extractField(source, fieldName) {
  const regex = new RegExp(`${fieldName}\\s*:\\s*'([^']+)'`)
  const match = source.match(regex)
  return match?.[1]?.trim() || ''
}

async function getLatestPostMeta() {
  const raw = await fs.readFile(postsPath, 'utf8')
  const firstPostMatch = raw.match(/const\s+posts\s*:\s*BlogPost\[\]\s*=\s*\[\s*\{([\s\S]*?)\n\s*\},/)

  if (!firstPostMatch) {
    throw new Error('No se pudo extraer el primer post de content/blog/posts.ts')
  }

  const postBlock = firstPostMatch[1]

  const slug = extractField(postBlock, 'slug')
  const title = extractField(postBlock, 'title')
  const excerpt = extractField(postBlock, 'excerpt')
  const publishedAt = extractField(postBlock, 'publishedAt')

  if (!slug || !title) {
    throw new Error('El primer post no tiene slug/title válidos')
  }

  return { slug, title, excerpt, publishedAt }
}

async function readState() {
  try {
    const raw = await fs.readFile(statePath, 'utf8')
    return JSON.parse(raw)
  } catch {
    return { lastSlug: null, lastSentAt: null }
  }
}

async function writeState(next) {
  await fs.mkdir(stateDir, { recursive: true })
  await fs.writeFile(statePath, JSON.stringify(next, null, 2), 'utf8')
}

function splitRecipients(value) {
  return value
    .split(/[;,\s]+/)
    .map((entry) => entry.trim())
    .filter((entry) => entry.includes('@'))
}

async function sendNewsletter() {
  await loadEnvFiles()

  const resendKey = process.env.RESEND_API_KEY
  const recipientsRaw = process.env.NEWSLETTER_RECIPIENTS || process.env.CONTACT_TO_EMAIL || ''
  const recipients = splitRecipients(recipientsRaw)
  const fromEmail = process.env.NEWSLETTER_FROM_EMAIL || process.env.CONTACT_FROM_EMAIL || 'Boletín <onboarding@resend.dev>'
  const replyTo = process.env.NEWSLETTER_REPLY_TO || undefined
  const siteUrl = (
    process.env.NEWSLETTER_SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://www.pachanodesign.com'
  ).replace(/\/$/, '')

  const latestPost = await getLatestPostMeta()
  const state = await readState()

  if (state.lastSlug && state.lastSlug === latestPost.slug) {
    return {
      status: 'already_sent',
      reason: 'Ese boletín ya fue enviado previamente',
      slug: latestPost.slug,
      title: latestPost.title,
      recipients: recipients.length,
    }
  }

  if (!resendKey) {
    return {
      status: 'skipped',
      reason: 'Falta RESEND_API_KEY',
      slug: latestPost.slug,
      title: latestPost.title,
      recipients: recipients.length,
    }
  }

  if (recipients.length === 0) {
    return {
      status: 'skipped',
      reason: 'No hay destinatarios (NEWSLETTER_RECIPIENTS/CONTACT_TO_EMAIL)',
      slug: latestPost.slug,
      title: latestPost.title,
      recipients: 0,
    }
  }

  const postUrl = `${siteUrl}/blog/${latestPost.slug}`
  const subject = `Si la IA no te ve — ${latestPost.title}`

  const html = `
    <div style="font-family:Inter,Segoe UI,Arial,sans-serif;line-height:1.6;color:#171717;max-width:640px;margin:0 auto;padding:24px;">
      <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#78716c;margin:0 0 8px;">Boletín semanal</p>
      <h1 style="font-size:28px;line-height:1.2;margin:0 0 12px;">${latestPost.title}</h1>
      <p style="font-size:16px;color:#44403c;margin:0 0 18px;">${latestPost.excerpt || 'Problema real + solución práctica para modernizar tu web y aumentar visibilidad con IA.'}</p>
      <p style="margin:0 0 22px;">
        <a href="${postUrl}" style="display:inline-block;background:#ff4b2b;color:#fff;text-decoration:none;padding:11px 18px;border-radius:999px;font-weight:600;">Leer boletín completo</a>
      </p>
      <p style="font-size:13px;color:#6b7280;margin-top:26px;">Publicado: ${latestPost.publishedAt || new Date().toISOString().slice(0, 10)}</p>
    </div>
  `

  const text = [
    latestPost.title,
    latestPost.excerpt || 'Problema real + solución práctica para modernizar tu web y aumentar visibilidad con IA.',
    '',
    `Leer: ${postUrl}`,
  ].join('\n')

  const payload = {
    from: fromEmail,
    to: recipients,
    subject,
    ...(replyTo ? { reply_to: replyTo } : {}),
    text,
    html,
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`Resend error ${response.status}: ${detail}`)
  }

  const responseJson = await response.json()

  await writeState({
    lastSlug: latestPost.slug,
    lastSentAt: new Date().toISOString(),
    emailId: responseJson?.id || null,
  })

  return {
    status: 'sent',
    slug: latestPost.slug,
    title: latestPost.title,
    recipients: recipients.length,
    emailId: responseJson?.id || null,
  }
}

sendNewsletter()
  .then((result) => {
    console.log(JSON.stringify(result, null, 2))
  })
  .catch((error) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
