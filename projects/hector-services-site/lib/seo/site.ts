const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim();

function normalizeSiteUrl(value: string | undefined): string {
  if (!value) {
    return "https://www.pachanodesign.com";
  }

  const sanitized = value.replace(/\/$/, "");

  // Failsafe for legacy domain values still present in old envs.
  if (sanitized.includes("hector-services-site.com")) {
    return "https://www.pachanodesign.com";
  }

  return sanitized;
}

export const SITE_URL = normalizeSiteUrl(RAW_SITE_URL);

export const SITE_NAME = 'Hector Pachano'

export const SITE_DESCRIPTION =
  'Sistemas digitales que generan ingresos: automatizaciones, diseño web y SEO/AEO para negocios que quieren escalar.'

export const SITE_KEYWORDS = [
  'automatizaciones',
  'diseño web',
  'SEO',
  'AEO',
  'growth',
  'desarrollo web'
]
