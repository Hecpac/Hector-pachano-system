import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buildPageMetadata } from '@/lib/seo/meta'

export const metadata: Metadata = buildPageMetadata({
  title: 'CRM Automations B2B: routing, SLA and follow-up',
  description:
    'CRM automations for B2B teams: lead routing, SLA alerts and follow-up sequences that reduce operational load and improve response speed.',
  path: '/en/services/automatizaciones'
})

export default function AutomationsServiceEn() {
  return (
    <main className="page-shell" id="main-content" lang="en">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Home', href: '/en' }, { label: 'Services', href: '/en/services' }, { label: 'Automations' }]} />
        <p className="eyebrow">SERVICE</p>
        <h1>CRM Automations for B2B teams</h1>
        <p className="lead">Capture, assign and follow up leads faster with a traceable operational flow.</p>

        <h2>Who this is for</h2>
        <ul className="bullet-list">
          <li>B2B teams with slow or manual lead response.</li>
          <li>Operations handling multiple inbound channels.</li>
          <li>Companies scaling demand without growing repetitive workload.</li>
        </ul>

        <h2>Key deliverables</h2>
        <ul className="bullet-list">
          <li>Lead intake and normalization map.</li>
          <li>Routing logic by fit, service and priority.</li>
          <li>SLA alerts + follow-up sequences + dashboard.</li>
        </ul>

        <p>
          <Link href="/en/contact" className="service-link">
            Book diagnosis →
          </Link>
        </p>
      </section>
    </main>
  )
}
