'use client'

import { useEffect, useRef } from 'react'

type RelativeTo = 'scroll' | 'viewport'

type ParallaxEntry = {
  node: HTMLDivElement
  speed: number
  relativeTo: RelativeTo
}

const parallaxEntries = new Set<ParallaxEntry>()

let rafId: number | null = null
let listenersAttached = false

function updateEntry(entry: ParallaxEntry) {
  const parent = entry.node.parentElement
  if (!parent) return

  const rect = parent.getBoundingClientRect()
  const viewportHeight = window.innerHeight

  if (rect.top > viewportHeight || rect.bottom < 0) {
    return
  }

  let yPos = 0

  if (entry.relativeTo === 'scroll') {
    yPos = window.scrollY * entry.speed
  } else {
    const elementCenter = rect.top + rect.height / 2
    const viewportCenter = viewportHeight / 2
    const distance = viewportCenter - elementCenter
    yPos = -distance * entry.speed
  }

  entry.node.style.transform = `translate3d(0, ${yPos}px, 0)`
}

function flushUpdates() {
  rafId = null

  for (const entry of parallaxEntries) {
    updateEntry(entry)
  }
}

function requestUpdate() {
  if (rafId !== null) return
  rafId = window.requestAnimationFrame(flushUpdates)
}

function handleViewportChange() {
  requestUpdate()
}

function attachListeners() {
  if (listenersAttached || typeof window === 'undefined') return

  window.addEventListener('scroll', handleViewportChange, { passive: true })
  window.addEventListener('resize', handleViewportChange)

  listenersAttached = true
}

function detachListenersIfIdle() {
  if (!listenersAttached || parallaxEntries.size > 0 || typeof window === 'undefined') return

  window.removeEventListener('scroll', handleViewportChange)
  window.removeEventListener('resize', handleViewportChange)

  if (rafId !== null) {
    window.cancelAnimationFrame(rafId)
    rafId = null
  }

  listenersAttached = false
}

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
  relativeTo?: RelativeTo
  zIndex?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const entry: ParallaxEntry = {
      node,
      speed,
      relativeTo
    }

    const unregister = () => {
      parallaxEntries.delete(entry)
      detachListenersIfIdle()
    }

    const register = () => {
      parallaxEntries.add(entry)
      attachListeners()
      requestUpdate()
    }

    const syncMotionPreference = () => {
      if (mediaQuery.matches) {
        unregister()
        node.style.transform = 'translate3d(0, 0, 0)'
        return
      }

      register()
    }

    syncMotionPreference()

    const onMotionPreferenceChange = () => {
      syncMotionPreference()
    }

    mediaQuery.addEventListener('change', onMotionPreferenceChange)

    return () => {
      mediaQuery.removeEventListener('change', onMotionPreferenceChange)
      unregister()
    }
  }, [speed, relativeTo])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        willChange: 'transform',
        zIndex,
        position: zIndex ? 'relative' : undefined,
        contain: 'paint'
      }}
    >
      {children}
    </div>
  )
}
