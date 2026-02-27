import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Bebas_Neue, DM_Mono } from 'next/font/google'

import { AnalyticsSnippets } from '@/components/ui/analytics-snippets'
import { SkipLink } from '@/components/ui/skip-link'
import { Footer } from '@/components/layout/footer'
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_URL } from '@/lib/seo/site'
import './globals.css'

const displayFont = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-display',
  weight: '400'
})

const monoFont = DM_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic']
})

export const viewport = {
  themeColor: '#0b0c10',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Diseño Web, SEO/AEO y Automatización para Empresas B2B`,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  openGraph: {
    title: `${SITE_NAME} | Diseño Web, SEO/AEO y Automatización para Empresas B2B`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'es_MX',
    type: 'website',
    images: ['/opengraph-image']
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Diseño Web, SEO/AEO y Automatización para Empresas B2B`,
    description: SITE_DESCRIPTION,
    images: ['/opengraph-image']
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      es: SITE_URL,
      en: `${SITE_URL}/en`
    }
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico'
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers()
  const locale = headerList.get('x-locale') === 'en' ? 'en' : 'es'

  return (
    <html lang={locale}>
      <head>
        <link rel="alternate" hrefLang="es" href={`${SITE_URL}/`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/`} />
      </head>
      <body className={`${displayFont.variable} ${monoFont.variable}`}>
        <SkipLink />
        {children}
        <Footer />
        <AnalyticsSnippets />
      </body>
    </html>
  )
}
