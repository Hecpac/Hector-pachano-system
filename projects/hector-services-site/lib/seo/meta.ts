import type { Metadata } from 'next'

import { SITE_NAME, SITE_URL } from './site'

type BuildPageMetadataInput = {
  title: string
  description: string
  path: string
  noindex?: boolean
}

export function buildPageMetadata({ title, description, path, noindex = false }: BuildPageMetadataInput): Metadata {
  const canonical = `${SITE_URL}${path}`

  return {
    title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'es_MX',
      type: 'website',
      images: ['/opengraph-image']
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: ['/opengraph-image']
    },
    robots: noindex
      ? {
          index: false,
          follow: false
        }
      : undefined
  }
}
