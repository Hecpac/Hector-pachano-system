import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buildPageMetadata } from '@/lib/seo/meta'

export const metadata: Metadata = buildPageMetadata({
  title: 'Process',
  description: '5-step execution model: diagnose, design, implement, validate and optimize.',
  path: '/en/process'
})

const steps = [
  'Diagnose business goal, friction and baseline metrics.',
  'Design architecture by impact and decision priority.',
  'Implement in phases with tangible weekly outputs.',
  'Validate with real KPIs (conversion, speed, operations).',
  'Optimize continuously with prioritized backlog.'
]

export default function ProcessPageEn() {
  return (
    <main className="page-shell" id="main-content" lang="en">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Home', href: '/en' }, { label: 'Process' }]} />
        <p className="eyebrow">PROCESS</p>
        <h1>Execution system in 5 steps</h1>
        <ul className="bullet-list">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}
