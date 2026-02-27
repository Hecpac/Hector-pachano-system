'use client'

import { useEffect, useRef, useState } from 'react'

type AnimatedCounterProps = {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
}

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1800
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasStartedRef = useRef(false)
  const frameRef = useRef<number | null>(null)
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    const targetValue = Math.round(value)
    const node = ref.current

    if (!node) return

    hasStartedRef.current = false
    setDisplayed(0)

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const cancelFrame = () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
    }

    const finishNow = () => {
      cancelFrame()
      hasStartedRef.current = true
      setDisplayed(targetValue)
    }

    const runCounter = () => {
      if (hasStartedRef.current) return
      hasStartedRef.current = true

      if (reducedMotionQuery.matches) {
        setDisplayed(targetValue)
        return
      }

      const startTime = performance.now()

      const step = (timestamp: number) => {
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const eased = easeOutQuart(progress)
        setDisplayed(Math.round(targetValue * eased))

        if (progress < 1) {
          frameRef.current = window.requestAnimationFrame(step)
          return
        }

        frameRef.current = null
      }

      frameRef.current = window.requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) return

        observer.disconnect()

        if (reducedMotionQuery.matches) {
          finishNow()
          return
        }

        runCounter()
      },
      { threshold: 0.35 }
    )

    observer.observe(node)

    const handleMotionChange = () => {
      if (reducedMotionQuery.matches && hasStartedRef.current) {
        finishNow()
      }
    }

    reducedMotionQuery.addEventListener('change', handleMotionChange)

    return () => {
      observer.disconnect()
      reducedMotionQuery.removeEventListener('change', handleMotionChange)
      cancelFrame()
    }
  }, [duration, value])

  return (
    <span ref={ref} className="animated-counter">
      {prefix}
      {displayed}
      {suffix}
    </span>
  )
}
