const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim()
const RAW_CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK?.trim()

function normalizeSiteUrl(value: string | undefined): string {
  if (!value) {
    return 'https://www.pachanodesign.com'
  }

  const sanitized = value.replace(/\/$/, '')

  // Failsafe for legacy domain values still present in old envs.
  if (sanitized.includes('hector-services-site.com')) {
    return 'https://www.pachanodesign.com'
  }

  return sanitized
}

function normalizeCalLink(value: string | undefined): string {
  if (!value) {
    return '/contact'
  }

  const sanitized = value.trim()

  // Avoid shipping placeholder booking URLs from template env files.
  if (sanitized.includes('tu-usuario')) {
    return '/contact'
  }

  return sanitized
}

export const SITE_URL = normalizeSiteUrl(RAW_SITE_URL)
export const SITE_CAL_LINK = normalizeCalLink(RAW_CAL_LINK)

export const SITE_NAME = 'Hector Pachano'
export const SITE_ENTITY_NAME = 'Hector Pachano // Digital Systems'
export const SITE_CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || 'pachanodesign@gmail.com'

export const SITE_DESCRIPTION =
  'Diseño web, SEO/AEO y automatizaciones para empresas B2B: sistemas digitales orientados a ingresos y crecimiento comercial.'

export const SITE_KEYWORDS = [
  'diseño web b2b',
  'automatizaciones para empresas',
  'seo b2b',
  'aeo',
  'automatización de procesos',
  'desarrollo web next.js'
]
