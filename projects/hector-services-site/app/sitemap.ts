import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/seo/site'

const routes = [
  '/',
  '/services',
  '/services/automatizaciones',
  '/services/diseno-web',
  '/services/seo-aeo',
  '/work',
  '/about',
  '/contact',
  '/faq'
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.8
  }))
}
