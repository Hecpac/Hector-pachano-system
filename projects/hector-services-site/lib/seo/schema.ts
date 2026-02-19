import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './site'

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: 'es'
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  areaServed: 'Remote',
  serviceType: ['Automatizaciones', 'Diseño Web', 'SEO', 'AEO']
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }
}

export function serviceSchema(input: {
  name: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: input.name,
    name: input.name,
    description: input.description,
    provider: {
      '@type': 'ProfessionalService',
      name: SITE_NAME,
      url: SITE_URL
    },
    url: `${SITE_URL}${input.path}`
  }
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`
    }))
  }
}
