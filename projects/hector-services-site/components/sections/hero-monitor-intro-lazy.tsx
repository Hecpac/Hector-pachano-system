'use client'

import dynamic from 'next/dynamic'

export const HeroMonitorIntroLazy = dynamic(
  () => import('./hero-monitor-intro').then((m) => ({ default: m.HeroMonitorIntro })),
  {
    ssr: false,
    loading: () => <div className="landing-hero__computer-stage landing-hero__computer-stage--intro" aria-hidden="true" />
  }
)
