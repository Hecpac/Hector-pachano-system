'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { SITE_CONTACT_EMAIL } from '@/lib/seo/site'

type Locale = 'es' | 'en'

function getLocale(pathname: string): Locale {
  return pathname.startsWith('/en') ? 'en' : 'es'
}

function stripLocale(pathname: string) {
  if (!pathname.startsWith('/en')) return pathname || '/'
  const stripped = pathname.replace(/^\/en/, '')
  return stripped || '/'
}

function localizePath(path: string, locale: Locale) {
  if (locale === 'es') return path
  return path === '/' ? '/en' : `/en${path}`
}

export function Footer() {
  const pathname = usePathname() || '/'
  const locale = getLocale(pathname)
  const currentPath = stripLocale(pathname)
  const switchHref = locale === 'es' ? localizePath(currentPath, 'en') : currentPath

  const labels =
    locale === 'es'
      ? {
          nav: 'Navegación secundaria',
          process: 'Proceso',
          industries: 'Industrias',
          privacy: 'Política de Privacidad',
          legal: 'Aviso Legal',
          language: 'English',
          rights: 'Todos los derechos reservados.'
        }
      : {
          nav: 'Secondary navigation',
          process: 'Process',
          industries: 'Industries',
          privacy: 'Privacy Policy',
          legal: 'Legal Notice',
          language: 'Español',
          rights: 'All rights reserved.'
        }

  return (
    <footer
      className="site-footer"
      style={{ borderTop: '1px solid var(--line)', padding: '2rem 1rem', marginTop: '4rem', textAlign: 'center' }}
    >
      <div className="page-shell" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <nav
          aria-label={labels.nav}
          style={{
            display: 'flex',
            gap: '1.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <a href="https://www.pachanodesign.com/" style={{ color: 'var(--accent)' }}>
            Pachano Design
          </a>
          <Link href={localizePath('/process', locale)} style={{ color: 'var(--muted)' }}>
            {labels.process}
          </Link>
          <Link href={localizePath('/industries', locale)} style={{ color: 'var(--muted)' }}>
            {labels.industries}
          </Link>
          <Link href={localizePath('/legal/privacidad', locale)} style={{ color: 'var(--muted)' }}>
            {labels.privacy}
          </Link>
          <Link href={localizePath('/legal/aviso-legal', locale)} style={{ color: 'var(--muted)' }}>
            {labels.legal}
          </Link>
          <Link href={switchHref} style={{ color: 'var(--muted)' }}>
            {labels.language}
          </Link>
          <a href={`mailto:${SITE_CONTACT_EMAIL}`} style={{ color: 'var(--muted)' }}>
            {SITE_CONTACT_EMAIL}
          </a>
        </nav>
        <p style={{ color: 'var(--muted)', fontSize: '0.8rem', margin: 0 }}>
          &copy; {new Date().getFullYear()} Hector Pachano // Digital Systems. {labels.rights}
        </p>
      </div>
    </footer>
  )
}
