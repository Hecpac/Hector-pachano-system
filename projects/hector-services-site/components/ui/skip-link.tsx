'use client'

import { usePathname } from 'next/navigation'

export function SkipLink() {
  const pathname = usePathname() || '/'
  const isEnglish = pathname.startsWith('/en')

  return (
    <a className="skip-link" href="#main-content">
      {isEnglish ? 'Skip to main content' : 'Ir al contenido principal'}
    </a>
  )
}
