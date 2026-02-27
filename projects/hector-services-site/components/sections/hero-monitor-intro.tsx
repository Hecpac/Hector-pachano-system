'use client'

import { useEffect, useRef } from 'react'

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export function HeroMonitorIntro() {
  const trackRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const stage = stageRef.current
    if (!track || !stage) return

    const computer = stage.querySelector('.landing-computer') as HTMLDivElement | null
    const screen = stage.querySelector('.landing-computer__screen') as HTMLDivElement | null
    if (!computer || !screen) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let rafPointerId = 0
    let rafScrollId = 0
    let rafInitId = 0

    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2
    let zoomProgress = 0

    const isMobile = window.innerWidth < 980
    const MAX_SCALE = prefersReducedMotion || isMobile ? 1 : 80

    if (isMobile) {
      // track.classList.remove('h-[300vh]')
      // track.style.height = 'auto'
      // stage.classList.remove('h-screen', 'sticky')
      stage.style.height = 'auto'
      stage.style.position = 'relative'
    }

    
    // Boot sequence
    const screenTitle = stage.querySelector('.landing-computer__screen-title') as HTMLElement
    const screenMetric = stage.querySelector('.landing-computer__screen-metric') as HTMLElement
    const screenStatus = stage.querySelector('.landing-computer__screen-status') as HTMLElement
    
    if (screenTitle && screenMetric && screenStatus) {
      screenTitle.style.opacity = '0'
      screenMetric.style.opacity = '0'
      screenStatus.style.opacity = '0'
      
      setTimeout(() => {
        // Flicker 1
        screenTitle.style.opacity = '0.5'
        setTimeout(() => { screenTitle.style.opacity = '0' }, 50)
        setTimeout(() => { 
          screenTitle.style.opacity = '1'
          // Let CSS animations handle the spans, just make the container visible
          screenTitle.style.transition = 'opacity 0.1s ease'
          screenTitle.style.opacity = '1'
          
          setTimeout(() => {
            screenMetric.style.transition = 'opacity 0.2s ease'
            screenMetric.style.opacity = '1'
            setTimeout(() => {
              screenStatus.style.transition = 'opacity 0.2s ease'
              screenStatus.style.opacity = '1'
            }, 300)
          }, 1000)
        }, 150)
      }, 500)
    }

    const recalcTransformOrigin = () => {
      const computerRect = computer.getBoundingClientRect()
      const screenRect = screen.getBoundingClientRect()

      const originX = screenRect.left - computerRect.left + screenRect.width / 2
      const originY = screenRect.top - computerRect.top + screenRect.height / 2

      computer.style.transformOrigin = `${originX.toFixed(2)}px ${originY.toFixed(2)}px`
    }

    const applyTransform = () => {
      if (prefersReducedMotion || isMobile) {
        computer.style.transform = 'scale(1)'
        computer.style.opacity = '1'
        return
      }

      const zoomCurve = Math.pow(zoomProgress, 1.35)
      const scale = Math.exp(Math.log(MAX_SCALE) * zoomCurve)

      const tiltStrength = 1 - clamp(Math.pow(zoomProgress, 1.2) * 1.15, 0, 1)

      const stageRect = stage.getBoundingClientRect()
      const halfWidth = Math.max(stageRect.width / 2, 1)
      const halfHeight = Math.max(stageRect.height / 2, 1)
      const stageCenterX = stageRect.left + halfWidth
      const stageCenterY = stageRect.top + halfHeight

      const offsetX = clamp((pointerX - stageCenterX) / halfWidth, -1, 1)
      const offsetY = clamp((pointerY - stageCenterY) / halfHeight, -1, 1)

      const rotateY = offsetX * 6 * tiltStrength
      const rotateX = -offsetY * 4 * tiltStrength
      const panX = offsetX * 10 * tiltStrength
      const panY = offsetY * 7 * tiltStrength


      const fadeStart = 0.84
      const opacity = 1 - clamp((zoomProgress - fadeStart) / (1 - fadeStart), 0, 1)

      computer.style.opacity = opacity.toFixed(3)
      computer.style.transform = `translate3d(${panX.toFixed(2)}px, ${panY.toFixed(2)}px, 0) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(4)})`

      // Fade out the surrounding hero text early in the zoom
      const contentText = document.querySelector('.landing-hero__content') as HTMLElement
      const bottomActions = document.querySelector('.landing-hero__bottom') as HTMLElement
      if (contentText && bottomActions) {
        // Fade them out between 10% and 40% zoom progress
        const textOpacity = 1 - clamp((zoomProgress - 0.1) / 0.3, 0, 1)
        contentText.style.opacity = textOpacity.toFixed(3)
        bottomActions.style.opacity = textOpacity.toFixed(3)
        
        // Also fade out the background glow and vignette
        const bgElements = document.querySelectorAll('.landing-hero__vignette, .landing-hero__bg-glow, .landing-hero__grain')
        bgElements.forEach(el => {
            (el as HTMLElement).style.opacity = textOpacity.toFixed(3)
        })
      }

    }

    const syncScroll = () => {
      const heroTrack = document.querySelector('.landing-hero-track') as HTMLElement
      if (!heroTrack) return
      
      const trackRect = heroTrack.getBoundingClientRect()
      const viewportHeight = window.innerHeight || 1
      const travel = Math.max(trackRect.height - viewportHeight, 1)
      
      // Calculate how far down the 250vh track we have scrolled
      zoomProgress = clamp(-trackRect.top / travel, 0, 1)
      applyTransform()
    }

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY

      if (rafPointerId) return
      rafPointerId = window.requestAnimationFrame(() => {
        rafPointerId = 0
        applyTransform()
      })
    }

    const onScroll = () => {
      if (rafScrollId) return
      rafScrollId = window.requestAnimationFrame(() => {
        rafScrollId = 0
        syncScroll()
      })
    }

    const onResize = () => {
      recalcTransformOrigin()
      syncScroll()
    }

    const onPointerLeave = () => {
      pointerX = window.innerWidth / 2
      pointerY = window.innerHeight / 2

      if (rafPointerId) return
      rafPointerId = window.requestAnimationFrame(() => {
        rafPointerId = 0
        applyTransform()
      })
    }

    rafInitId = window.requestAnimationFrame(() => {
      rafInitId = 0
      recalcTransformOrigin()
      syncScroll()
    })

    stage.addEventListener('pointermove', onPointerMove, { passive: true })
    stage.addEventListener('mouseleave', onPointerLeave)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      if (rafInitId) window.cancelAnimationFrame(rafInitId)
      if (rafPointerId) window.cancelAnimationFrame(rafPointerId)
      if (rafScrollId) window.cancelAnimationFrame(rafScrollId)

      stage.removeEventListener('pointermove', onPointerMove)
      stage.removeEventListener('mouseleave', onPointerLeave)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div ref={trackRef} className="landing-hero__computer-stage landing-hero__computer-stage--intro" aria-hidden="true">
      <div className="landing-hero__computer-stage-inner" ref={stageRef}>
        <div className="landing-floor-line" />

        <div className="landing-computer will-change-transform">
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
    </div>
  )
}
