import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
