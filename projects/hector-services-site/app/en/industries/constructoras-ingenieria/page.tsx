import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buildPageMetadata } from '@/lib/seo/meta'

export const metadata: Metadata = buildPageMetadata({
  title: 'Construction & Engineering Industry',
  description: 'Web architecture, automations and SEO/AEO for B2B construction and engineering companies.',
  path: '/en/industries/constructoras-ingenieria'
})

export default function ConstructionIndustryEn() {
  return (
    <main className="page-shell" id="main-content" lang="en">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/en' },
            { label: 'Industries', href: '/en/industries' },
            { label: 'Construction & Engineering' }
          ]}
        />
        <p className="eyebrow">INDUSTRY</p>
        <h1>Construction & Engineering</h1>
        <p className="lead">Support complex sales cycles with clearer technical content and qualified lead capture.</p>
        <p>
          <Link href="/en/contact" className="service-link">
            Build my industry plan →
          </Link>
        </p>
      </section>
    </main>
  )
}
