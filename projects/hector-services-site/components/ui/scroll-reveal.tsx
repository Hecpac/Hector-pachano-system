'use client'

import { useEffect } from 'react'

export function ScrollReveal() {
  useEffect(() => {
    document.body.classList.add('motion-ready')

    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal-on-scroll'))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.14
      }
    )

    for (const el of elements) {
      observer.observe(el)
    }

    return () => {
      observer.disconnect()
      document.body.classList.remove('motion-ready')
    }
  }, [])

  return null
}
