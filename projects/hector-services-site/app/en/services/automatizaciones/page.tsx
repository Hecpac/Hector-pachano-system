import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema, serviceSchema } from '@/lib/seo/schema'

const title = 'CRM Automations B2B: routing, SLA and follow-up'
const description =
  'CRM automations for B2B teams: lead routing, SLA alerts and follow-up sequences that cut response time and scale operations without adding headcount.'
const path = '/en/services/automatizaciones'

export const metadata: Metadata = buildPageMetadata({ title, description, path })

export default function AutomationsServiceEn() {
  return (
    <main className="page-shell" id="main-content" lang="en">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/en' },
            { name: 'Services', path: '/en/services' },
            { name: title, path }
          ]),
          serviceSchema({
            name: title,
            description,
            path,
            offers: [
              'Lead intake and normalization mapping',
              'CRM routing logic by fit, service and priority',
              'SLA alerts + follow-up sequences + operations dashboard'
            ]
          })
        ]}
      />

      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/en' },
            { label: 'Services', href: '/en/services' },
            { label: 'Automations' }
          ]}
        />
        <p className="eyebrow">SERVICE</p>
        <h1>CRM Automations for B2B teams</h1>
        <p className="lead">
          We design flows that eliminate repetitive tasks and connect your core tools so your team operates at speed.
        </p>

        <h2>Best fit / not a fit</h2>
        <div className="service-grid">
          <article className="service-card">
            <h3>Best fit for</h3>
            <ul className="bullet-list">
              <li>B2B teams with leads arriving across multiple channels and manual follow-up.</li>
              <li>Sales operations with slow first-response or lost leads.</li>
              <li>Companies scaling demand without growing repetitive headcount.</li>
            </ul>
          </article>
          <article className="service-card">
            <h3>Not a fit if</h3>
            <ul className="bullet-list">
              <li>No defined service or offer exists yet to sell.</li>
              <li>There is no commercial owner to act on incoming leads.</li>
              <li>You want to "automate everything" without a minimum base process.</li>
            </ul>
          </article>
        </div>

        <h2>Exact deliverables</h2>
        <ul className="bullet-list">
          <li>Current pipeline map + target blueprint (capture → CRM → follow-up).</li>
          <li>Form, CRM and operational notification integrations.</li>
          <li>Routing rules by service type, fit score and commercial priority.</li>
          <li>Follow-up sequences and SLA alert triggers.</li>
          <li>Operational dashboard for daily control.</li>
        </ul>

        <h2>5-step process</h2>
        <ul className="bullet-list">
          <li>1) Pipeline audit and data quality assessment.</li>
          <li>2) Automation architecture design prioritized by impact.</li>
          <li>3) Integration and routing logic implementation.</li>
          <li>4) Real lead testing with error fallback.</li>
          <li>5) Weekly optimization by commercial KPI.</li>
        </ul>

        <h2>Target metrics</h2>
        <ul className="bullet-list">
          <li>First-response time (SLA).</li>
          <li>Effective contact rate.</li>
          <li>Operational hours freed per week.</li>
          <li>Leads lost due to missing follow-up.</li>
        </ul>

        <h2>Common objections</h2>
        <details>
          <summary>"I do not want to break what already works."</summary>
          <p>We implement in phases with explicit rollback at every critical stage.</p>
        </details>
        <details>
          <summary>"My team is not technical."</summary>
          <p>The final operation is documented and usable by business users, not just developers.</p>
        </details>

        <h2>Related result</h2>
        <p>
          Real outcome: <strong>-62% operational time</strong>, first response from{' '}
          <strong>4h to 43 min</strong> and <strong>+31% contact rate</strong>.
        </p>
        <p>
          <Link href="/en/cases/pipeline-leads-automatizado" className="service-link">
            View full automation case →
          </Link>
        </p>

        <p style={{ marginTop: '2rem' }}>
          <Link href="/en/contact" className="service-link">
            Book diagnosis →
          </Link>
        </p>
      </section>
    </main>
  )
}
