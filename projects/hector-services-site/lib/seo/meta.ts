import type { Metadata } from 'next'

import { SITE_NAME, SITE_URL } from './site'

type BuildPageMetadataInput = {
  title: string
  description: string
  path: string
  noindex?: boolean
}

const STATIC_BILINGUAL_PATHS = new Set([
  '/',
  '/services',
  '/services/automatizaciones',
  '/services/diseno-web',
  '/services/seo-aeo',
  '/contact',
  '/about',
  '/process',
  '/industries',
  '/industries/servicios-profesionales',
  '/industries/constructoras-ingenieria',
  '/blog',
  '/cases',
  '/faq',
  '/auditor',
  '/work',
  '/legal/privacidad',
  '/legal/aviso-legal'
])

function normalizePath(path: string) {
  const prefixed = path.startsWith('/') ? path : `/${path}`
  if (prefixed !== '/' && prefixed.endsWith('/')) {
    return prefixed.slice(0, -1)
  }

  return prefixed
}

function stripEnglishPrefix(path: string) {
  if (path === '/en') {
    return '/'
  }

  if (path.startsWith('/en/')) {
    const stripped = path.slice(3)
    return stripped || '/'
  }

  return path
}

function toEnglishPath(path: string) {
  return path === '/' ? '/en' : `/en${path}`
}

function hasEnglishVariant(path: string) {
  if (STATIC_BILINGUAL_PATHS.has(path)) {
    return true
  }

  return path.startsWith('/blog/') || path.startsWith('/cases/') || path.startsWith('/faq/')
}

export function buildLocaleAlternates(path: string): Metadata['alternates'] {
  const normalizedPath = normalizePath(path)
  const isEnglishPath = normalizedPath === '/en' || normalizedPath.startsWith('/en/')
  const spanishPath = stripEnglishPrefix(normalizedPath)
  const englishPath = toEnglishPath(spanishPath)

  const canonical = `${SITE_URL}${normalizedPath}`
  const spanishUrl = `${SITE_URL}${spanishPath}`
  const englishUrl = `${SITE_URL}${englishPath}`

  if (hasEnglishVariant(spanishPath)) {
    return {
      canonical,
      languages: {
        es: spanishUrl,
        en: englishUrl,
        'x-default': spanishUrl
      }
    }
  }

  if (isEnglishPath) {
    return {
      canonical,
      languages: {
        en: canonical,
        'x-default': canonical
      }
    }
  }

  return {
    canonical,
    languages: {
      es: canonical,
      'x-default': canonical
    }
  }
}

export function buildPageMetadata({ title, description, path, noindex = false }: BuildPageMetadataInput): Metadata {
  const canonical = `${SITE_URL}${path}`
  const imagePath = path === '/' ? '/opengraph-image' : `${path}/opengraph-image`
  const ogLocale = path.startsWith('/en') ? 'en_US' : 'es_MX'

  return {
    title,
    description,
    alternates: buildLocaleAlternates(path),
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: ogLocale,
      type: 'website',
      images: [imagePath]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [imagePath]
    },
    robots: noindex
      ? {
          index: false,
          follow: false
        }
      : {
          index: true,
          follow: true
        }
  }
}
