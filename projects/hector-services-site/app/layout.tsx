import type { Metadata } from 'next'
import { Bebas_Neue, DM_Mono } from 'next/font/google'

import { AnalyticsSnippets } from '@/components/ui/analytics-snippets'
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
    canonical: SITE_URL
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico'
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${displayFont.variable} ${monoFont.variable}`}>
        <a className="skip-link" href="#main-content">
          Ir al contenido principal
        </a>
        {children}
        <Footer />
        <AnalyticsSnippets />
      </body>
    </html>
  )
}
