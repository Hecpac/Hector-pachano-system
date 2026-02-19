import type { Metadata } from 'next'
import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google'

import { ScrollReveal } from '@/components/ui/scroll-reveal'
import './globals.css'

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700']
})

const monoFont = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600']
})

export const metadata: Metadata = {
  metadataBase: new URL('https://hector-services-site.com'),
  title: 'Hector — Automatizaciones, Diseño Web y SEO/AEO',
  description:
    'Sistemas digitales que generan ingresos: automatizaciones, diseño web y SEO/AEO para negocios que quieren escalar.',
  openGraph: {
    title: 'Hector — Design. Automate. Rank.',
    description:
      'Automatizaciones + Diseño Web + SEO/AEO en un solo partner.',
    images: ['/images/og/og-default.svg']
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${displayFont.variable} ${monoFont.variable}`}>
        {children}
        <ScrollReveal />
      </body>
    </html>
  )
}
