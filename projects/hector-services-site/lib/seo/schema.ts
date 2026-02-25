import { SITE_CONTACT_EMAIL, SITE_DESCRIPTION, SITE_ENTITY_NAME, SITE_NAME, SITE_URL } from './site'

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_ENTITY_NAME,
  alternateName: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: 'es',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/blog?query={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  name: SITE_ENTITY_NAME,
  alternateName: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  founder: {
    '@type': 'Person',
    name: SITE_NAME
  },
  areaServed: 'Global',
  availableLanguage: ['es', 'en'],
  email: SITE_CONTACT_EMAIL,
  priceRange: '$$$',
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
  offers: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: input.name,
    name: input.name,
    description: input.description,
    provider: {
      '@type': 'ProfessionalService',
      name: SITE_ENTITY_NAME,
      url: SITE_URL
    },
    areaServed: 'Global',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${input.name} - Alcances`,
      itemListElement: input.offers.map((offer) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: offer
        }
      }))
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

export function blogPostingSchema(input: {
  title: string
  description: string
  path: string
  publishedAt: string
  tags: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    description: input.description,
    datePublished: input.publishedAt,
    author: {
      '@type': 'Person',
      name: SITE_NAME
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_ENTITY_NAME
    },
    keywords: input.tags.join(', '),
    mainEntityOfPage: `${SITE_URL}${input.path}`
  }
}

export function blogCollectionSchema(posts: Array<{ title: string; slug: string; publishedAt: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE_NAME} Blog`,
    url: `${SITE_URL}/blog`,
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: post.publishedAt,
      url: `${SITE_URL}/blog/${post.slug}`
    }))
  }
}
