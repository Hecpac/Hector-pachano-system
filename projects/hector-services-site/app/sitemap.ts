import type { MetadataRoute } from 'next'

import { getBlogPosts } from '@/content/blog/posts'
import { getCaseStudies } from '@/content/case-studies/cases'
import { getAnswerFirstFaqs } from '@/content/faqs/answer-first'
import { SITE_URL } from '@/lib/seo/site'

const baseRoutes = [
  '/',
  '/services',
  '/services/automatizaciones',
  '/services/diseno-web',
  '/services/seo-aeo',
  '/cases',
  '/auditor',
  '/work',
  '/about',
  '/contact',
  '/faq',
  '/blog',
  '/legal/privacidad',
  '/legal/aviso-legal'
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const blogRoutes = getBlogPosts().map((post) => `/blog/${post.slug}`)
  const caseRoutes = getCaseStudies().map((caseStudy) => `/cases/${caseStudy.slug}`)
  const faqRoutes = getAnswerFirstFaqs().map((item) => `/faq/${item.slug}`)
  const routes = [...baseRoutes, ...caseRoutes, ...faqRoutes, ...blogRoutes]

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '/' || route === '/blog' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route.startsWith('/blog/') ? 0.7 : 0.8
  }))
}
