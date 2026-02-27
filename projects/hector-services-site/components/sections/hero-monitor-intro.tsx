'use client'

import { useEffect, useRef } from 'react'

import { Parallax } from '@/components/ui/parallax'

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export function HeroMonitorIntro() {
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let rafId = 0
    let scrollRafId = 0
    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2

    const setVar = (name: string, value: string) => {
      stage.style.setProperty(name, value)
    }

    const syncScroll = () => {
      const hero = stage.closest('.landing-hero') as HTMLElement | null
      if (!hero) return

      const rect = hero.getBoundingClientRect()
      const viewportHeight = window.innerHeight || 1
      const travel = Math.max(hero.offsetHeight - viewportHeight * 0.55, viewportHeight * 0.38)
      const progress = clamp((-rect.top + viewportHeight * 0.12) / travel, 0, 1)

      setVar('--monitor-scroll', progress.toFixed(3))
      setVar('--monitor-scale', (0.84 + progress * 0.2).toFixed(3))
      setVar('--monitor-depth', `${((1 - progress) * 36).toFixed(1)}px`)
    }

    const syncPointer = () => {
      rafId = 0
      if (prefersReducedMotion) return

      const rect = stage.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const offsetX = clamp((pointerX - centerX) / (rect.width / 2), -1, 1)
      const offsetY = clamp((pointerY - centerY) / (rect.height / 2), -1, 1)

      setVar('--monitor-tilt-y', `${(offsetX * 6).toFixed(2)}deg`)
      setVar('--monitor-tilt-x', `${(-offsetY * 4).toFixed(2)}deg`)
      setVar('--monitor-pan-x', `${(offsetX * 10).toFixed(1)}px`)
      setVar('--monitor-pan-y', `${(offsetY * 7).toFixed(1)}px`)
    }

    const resetPointer = () => {
      if (prefersReducedMotion) return
      setVar('--monitor-tilt-y', '0deg')
      setVar('--monitor-tilt-x', '0deg')
      setVar('--monitor-pan-x', '0px')
      setVar('--monitor-pan-y', '0px')
    }

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      if (!rafId) rafId = window.requestAnimationFrame(syncPointer)
    }

    const onScroll = () => {
      if (scrollRafId) return
      scrollRafId = window.requestAnimationFrame(() => {
        scrollRafId = 0
        syncScroll()
      })
    }

    const onResize = () => {
      syncScroll()
      resetPointer()
    }

    syncScroll()
    resetPointer()

    if (prefersReducedMotion) {
      setVar('--monitor-scale', '1')
      setVar('--monitor-depth', '0px')
    }

    stage.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    stage.addEventListener('mouseleave', resetPointer)

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
      if (scrollRafId) window.cancelAnimationFrame(scrollRafId)
      stage.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      stage.removeEventListener('mouseleave', resetPointer)
    }
  }, [])

  return (
    <Parallax speed={0.1} relativeTo="viewport" className="landing-hero__computer-stage landing-hero__computer-stage--intro" zIndex={2}>
      <div ref={stageRef} className="landing-hero__computer-stage-inner" aria-hidden="true">
        <div className="landing-floor-line" />

        <div className="landing-computer">
          <div className="landing-computer__glow" />

          <div className="landing-computer__bezel">
            <span className="landing-computer__camera" />

            <div className="landing-computer__screen">
              <span className="landing-computer__screen-noise" />
              <span className="landing-computer__screen-sweep" />
              <p className="landing-computer__screen-kicker">Hector Services // Live</p>
              <p className="landing-computer__screen-title" aria-live="off">
                <span>Design.</span>
                <span>Automate.</span>
                <span>Rank.</span>
              </p>
              <p className="landing-computer__screen-metric">Leads ↑ 39% · SEO ↑ 62%</p>

              <div className="landing-computer__screen-status">
                <span className="landing-computer__status-dot" />
                <span>Pipeline online</span>
              </div>

              <div className="landing-computer__screen-eq" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="landing-computer__screen-progress" aria-hidden="true">
                <span />
              </div>
            </div>

            <span className="landing-computer__logo">HS</span>
          </div>

          <div className="landing-computer__body">
            <span className="landing-computer__port" />
            <span className="landing-computer__port" />
            <span className="landing-computer__slot" />
            <span className="landing-computer__vents" />
          </div>

          <div className="landing-computer__stand" />
          <div className="landing-computer__shadow" />
          <div className="landing-computer__cable" />
        </div>
      </div>
    </Parallax>
  )
}
