import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buildPageMetadata } from '@/lib/seo/meta'

export const metadata: Metadata = buildPageMetadata({
  title: 'SEO + AEO for B2B: organic demand and AI visibility',
  description:
    'SEO/AEO for B2B teams: intent mapping, answer-first pages and structured signals to improve qualified clicks, CTR and organic leads.',
  path: '/en/services/seo-aeo'
})

export default function SeoAeoServiceEn() {
  return (
    <main className="page-shell" id="main-content" lang="en">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Home', href: '/en' }, { label: 'Services', href: '/en/services' }, { label: 'SEO / AEO' }]} />
        <p className="eyebrow">SERVICE</p>
        <h1>SEO + AEO for B2B growth</h1>
        <p className="lead">Capture high-intent demand in Google and become more citable in AI answer engines.</p>

        <h2>Who this is for</h2>
        <ul className="bullet-list">
          <li>B2B companies with authority but weak commercial visibility.</li>
          <li>Teams who need SEO to contribute to pipeline, not only traffic.</li>
          <li>Brands aiming for AI citation and intent-aligned pages.</li>
        </ul>

        <h2>Key deliverables</h2>
        <ul className="bullet-list">
          <li>Technical SEO + intent architecture baseline.</li>
          <li>Answer-first page templates and schema rollout.</li>
          <li>Measurement dashboard for qualified clicks and leads.</li>
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
