'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const MOBILE_QUERY = '(max-width: 980px)'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const SELECTOR = '[data-mobile-carousel="true"]'

export function MobileCarouselDriver() {
  const pathname = usePathname()

  useEffect(() => {
    const mobileMedia = window.matchMedia(MOBILE_QUERY)
    const reducedMotionMedia = window.matchMedia(REDUCED_MOTION_QUERY)

    const cleanups: Array<() => void> = []

    const setup = () => {
      while (cleanups.length) {
        cleanups.pop()?.()
      }

      if (!mobileMedia.matches || reducedMotionMedia.matches) return

      const carousels = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR))

      carousels.forEach((carousel, index) => {
        let pausedUntil = 0

        const pauseAuto = () => {
          pausedUntil = Date.now() + 5000
        }

        const tick = () => {
          if (document.hidden) return
          if (Date.now() < pausedUntil) return

          const maxScroll = carousel.scrollWidth - carousel.clientWidth
          if (maxScroll <= 24) return

          const step = Math.max(220, Math.round(carousel.clientWidth * 0.86))
          const next = carousel.scrollLeft + step
          const target = next >= maxScroll - 10 ? 0 : next

          carousel.scrollTo({
            left: target,
            behavior: 'smooth'
          })
        }

        const intervalId = window.setInterval(tick, 2600 + index * 220)

        carousel.addEventListener('touchstart', pauseAuto, { passive: true })
        carousel.addEventListener('pointerdown', pauseAuto)
        carousel.addEventListener('wheel', pauseAuto, { passive: true })

        cleanups.push(() => {
          window.clearInterval(intervalId)
          carousel.removeEventListener('touchstart', pauseAuto)
          carousel.removeEventListener('pointerdown', pauseAuto)
          carousel.removeEventListener('wheel', pauseAuto)
        })
      })
    }

    setup()

    const onPreferenceChange = () => {
      setup()
    }

    mobileMedia.addEventListener('change', onPreferenceChange)
    reducedMotionMedia.addEventListener('change', onPreferenceChange)

    return () => {
      mobileMedia.removeEventListener('change', onPreferenceChange)
      reducedMotionMedia.removeEventListener('change', onPreferenceChange)
      while (cleanups.length) {
        cleanups.pop()?.()
      }
    }
  }, [pathname])

  return null
}
