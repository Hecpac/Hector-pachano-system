'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const SAFE_REVEAL_TIMEOUT_MS = 1200
const INITIAL_REVEAL_MULTIPLIER = 1.15

export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal-on-scroll'))
    if (elements.length === 0) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      for (const el of elements) {
        el.classList.remove('will-reveal')
        el.classList.add('is-visible')
      }
      document.body.classList.remove('motion-ready')
      return
    }

    document.body.classList.add('motion-ready')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.remove('will-reveal')
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.08
      }
    )

    for (const el of elements) {
      if (el.classList.contains('is-visible')) {
        el.classList.remove('will-reveal')
        continue
      }

      const rect = el.getBoundingClientRect()
      if (rect.top <= window.innerHeight * INITIAL_REVEAL_MULTIPLIER) {
        el.classList.remove('will-reveal')
        el.classList.add('is-visible')
        continue
      }

      el.classList.add('will-reveal')
      observer.observe(el)
    }

    const safetyTimeout = window.setTimeout(() => {
      for (const el of elements) {
        if (!el.classList.contains('is-visible')) {
          el.classList.remove('will-reveal')
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      }
    }, SAFE_REVEAL_TIMEOUT_MS)

    return () => {
      window.clearTimeout(safetyTimeout)
      observer.disconnect()
      document.body.classList.remove('motion-ready')
      for (const el of elements) {
        el.classList.remove('will-reveal')
      }
    }
  }, [pathname])

  return null
}
