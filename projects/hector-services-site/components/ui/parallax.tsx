'use client'

import { useEffect, useRef } from 'react'

export function Parallax({
  children,
  speed = 0.5,
  className = '',
  relativeTo = 'scroll',
  zIndex
}: {
  children: React.ReactNode
  speed?: number
  className?: string
  relativeTo?: 'scroll' | 'viewport'
  zIndex?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let rafId: number

    const updatePosition = () => {
      if (!ref.current) return
      
      // Use parent to determine visibility to avoid jumping issues when transforming self
      const parent = ref.current.parentElement
      if (!parent) return
      
      const rect = parent.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Only update if the parent element is somewhat in the viewport
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        let yPos = 0
        
        if (relativeTo === 'scroll') {
           yPos = window.scrollY * speed
        } else {
           const elementCenter = rect.top + rect.height / 2
           const viewportCenter = windowHeight / 2
           const distance = viewportCenter - elementCenter
           // Reversing distance so positive speed moves it in opposite direction of scroll
           yPos = -distance * speed
        }
        
        ref.current.style.transform = `translate3d(0, ${yPos}px, 0)`
      }
      
      rafId = requestAnimationFrame(updatePosition)
    }

    rafId = requestAnimationFrame(updatePosition)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [speed, relativeTo])

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform', zIndex, position: zIndex ? 'relative' : undefined }}>
      {children}
    </div>
  )
}
