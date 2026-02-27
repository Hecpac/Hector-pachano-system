import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buildPageMetadata } from '@/lib/seo/meta'

export const metadata: Metadata = buildPageMetadata({
  title: 'B2B Web Design in Next.js: performance + conversion',
  description:
    'Conversion-first web design for B2B in Next.js: narrative clarity, UX architecture and performance optimization tied to measurable KPIs.',
  path: '/en/services/diseno-web'
})

export default function WebDesignServiceEn() {
  return (
    <main className="page-shell" id="main-content" lang="en">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Home', href: '/en' }, { label: 'Services', href: '/en/services' }, { label: 'Web Design' }]} />
        <p className="eyebrow">SERVICE</p>
        <h1>B2B Web Design in Next.js</h1>
        <p className="lead">Design and implementation focused on conversion, speed and decision clarity.</p>

        <h2>Who this is for</h2>
        <ul className="bullet-list">
          <li>B2B teams with traffic but weak conversion.</li>
          <li>Companies with strong offer but unclear website messaging.</li>
          <li>Brands needing performance and commercial clarity together.</li>
        </ul>

        <h2>Key deliverables</h2>
        <ul className="bullet-list">
          <li>Content architecture by intent.</li>
          <li>Conversion-oriented UX/UI implementation.</li>
          <li>Core Web Vitals and CTA tracking setup.</li>
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
