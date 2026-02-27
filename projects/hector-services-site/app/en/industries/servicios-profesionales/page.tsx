import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buildPageMetadata } from '@/lib/seo/meta'

export const metadata: Metadata = buildPageMetadata({
  title: 'Professional Services Industry',
  description: 'Web, automations and SEO/AEO for B2B professional-services firms.',
  path: '/en/industries/servicios-profesionales'
})

export default function ProfessionalServicesIndustryEn() {
  return (
    <main className="page-shell" id="main-content" lang="en">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/en' },
            { label: 'Industries', href: '/en/industries' },
            { label: 'Professional Services' }
          ]}
        />
        <p className="eyebrow">INDUSTRY</p>
        <h1>Professional Services</h1>
        <p className="lead">Turn expertise into qualified demand and measurable conversion.</p>
        <p>
          <Link href="/en/contact" className="service-link">
            Build my industry plan →
          </Link>
        </p>
      </section>
    </main>
  )
}
