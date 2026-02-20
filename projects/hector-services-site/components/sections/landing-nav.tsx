'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { SITE_NAME } from '@/lib/seo/site'

const links = [
  { label: 'Servicios', href: '/services' },
  { label: 'Casos', href: '#casos' },
  { label: 'Auditor', href: '/auditor' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contacto', href: '/contact' }
]

export function LandingNav() {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement | null>(null)

  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    if (!isOpen) {
      document.body.classList.remove('landing-nav-open')
      return
    }

    document.body.classList.add('landing-nav-open')

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null
      if (target && navRef.current && !navRef.current.contains(target)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.classList.remove('landing-nav-open')
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 981px)')

    const handleDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsOpen(false)
      }
    }

    mediaQuery.addEventListener('change', handleDesktop)

    return () => {
      mediaQuery.removeEventListener('change', handleDesktop)
    }
  }, [])

  return (
    <header className="landing-header">
      <nav ref={navRef} className={`landing-nav${isOpen ? ' is-open' : ''}`} aria-label="Navegación principal">
        <div className="landing-nav__brand">
          <span className="landing-nav__brand-name">{SITE_NAME}</span>
          <span className="landing-nav__brand-sep">{' // '}</span>
          <span className="landing-nav__brand-sub"> Digital Systems</span>
        </div>

        <div className="landing-nav__cta">
          <Link href="/auditor" className="btn-auditor" onClick={closeMenu}>
            Auditor IA
          </Link>

          <Link href="/contact" className="btn-cta" aria-label="Agenda el diagnóstico" onClick={closeMenu}>
            <span className="btn-cta__label-desktop">Agenda el diagnóstico</span>
            <span className="btn-cta__label-mobile">Agenda</span>
          </Link>

          <button
            type="button"
            className="landing-nav__menu-btn"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-controls="landing-nav-links"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="landing-nav__menu-line" />
            <span className="landing-nav__menu-line" />
            <span className="landing-nav__menu-line" />
          </button>
        </div>

        <ul id="landing-nav-links" className="landing-nav__links">
          {links.map((item) => (
            <li key={item.label}>
              {item.href.startsWith('#') ? (
                <a href={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              ) : (
                <Link href={item.href} onClick={closeMenu}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
