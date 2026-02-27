import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema } from '@/lib/seo/schema'

export const metadata: Metadata = buildPageMetadata({
  title: 'B2B Services: Web, Automations and SEO/AEO',
  description:
    'Integrated systems for B2B growth: Web + Automations + SEO/AEO with measurable outcomes and execution by impact.',
  path: '/en/services'
})

const services = [
  {
    title: 'Automations',
    href: '/en/services/automatizaciones',
    copy: 'CRM routing, follow-up workflows and SLA alerts to increase lead response speed.'
  },
  {
    title: 'Web Design',
    href: '/en/services/diseno-web',
    copy: 'Conversion-first website strategy and implementation with performance in mind.'
  },
  {
    title: 'SEO / AEO',
    href: '/en/services/seo-aeo',
    copy: 'Organic demand capture and stronger visibility inside AI answer engines.'
  }
]

export default function EnglishServicesPage() {
  return (
    <main className="page-shell" id="main-content" lang="en">
      <JsonLd
        data={
          breadcrumbSchema([
            { name: 'Home', path: '/en' },
            { name: 'Services', path: '/en/services' }
          ])
        }
      />

      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Home', href: '/en' }, { label: 'Services' }]} />
        <p className="eyebrow">SERVICES</p>
        <h1>Integrated systems for B2B growth</h1>
        <p className="lead">Choose a focused line of execution or a full integrated plan.</p>

        <div className="service-grid" style={{ marginTop: '1rem', gap: '0.55rem' }}>
          <article className="service-card" style={{ padding: '0.85rem 0.9rem' }}>
            <h2 style={{ margin: 0, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>What we solve</h2>
            <p style={{ marginTop: '0.45rem', marginBottom: 0 }}>
              We turn scattered web and operations into systems that capture, qualify and convert B2B demand.
            </p>
          </article>
          <article className="service-card" style={{ padding: '0.85rem 0.9rem' }}>
            <h2 style={{ margin: 0, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>How we work</h2>
            <p style={{ marginTop: '0.45rem', marginBottom: 0 }}>
              Impact-first prioritization, phased execution and weekly validation using business KPIs.
            </p>
          </article>
          <article className="service-card" style={{ padding: '0.85rem 0.9rem' }}>
            <h2 style={{ margin: 0, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>What we deliver</h2>
            <p style={{ marginTop: '0.45rem', marginBottom: 0 }}>
              Architecture, implementation and ongoing optimization across Web + Automations + SEO/AEO.
            </p>
          </article>
        </div>

        <article className="service-card" style={{ marginTop: '0.8rem', padding: '0.9rem' }}>
          <h2 style={{ margin: 0, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Quick proof</h2>
          <ul className="bullet-list" style={{ marginTop: '0.55rem', marginBottom: 0 }}>
            <li>+123% organic traffic</li>
            <li>+38% conversion rate</li>
            <li>-62% operational time</li>
          </ul>
        </article>

        <div className="service-grid stagger-fade-in" style={{ marginTop: '2rem' }}>
          {services.map((service) => (
            <article key={service.title} className="service-card">
              <h2>{service.title}</h2>
              <p>{service.copy}</p>
              <Link href={service.href} className="service-link">
                View details →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
