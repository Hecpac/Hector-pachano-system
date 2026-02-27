import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema, serviceSchema } from '@/lib/seo/schema'

const title = 'SEO + AEO for B2B: organic demand and AI visibility'
const description =
  'SEO/AEO for B2B teams: intent mapping, answer-first pages and structured signals to improve qualified clicks, CTR and organic leads — including AI answer engine citation.'
const path = '/en/services/seo-aeo'

export const metadata: Metadata = buildPageMetadata({ title, description, path })

export default function SeoAeoServiceEn() {
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
              'Technical SEO and indexation architecture',
              'Intent-based content strategy and answer-first pages',
              'AEO optimization for AI answer engine citation'
            ]
          })
        ]}
      />

      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/en' },
            { label: 'Services', href: '/en/services' },
            { label: 'SEO / AEO' }
          ]}
        />
        <p className="eyebrow">SERVICE</p>
        <h1>SEO + AEO for B2B growth</h1>
        <p className="lead">
          Capture high-intent organic demand in Google and become more citable inside AI answer engines.
        </p>

        <h2>Best fit / not a fit</h2>
        <div className="service-grid">
          <article className="service-card">
            <h3>Best fit for</h3>
            <ul className="bullet-list">
              <li>B2B companies with technical authority but low commercial intent visibility.</li>
              <li>Teams who need SEO to contribute to pipeline, not only traffic.</li>
              <li>Brands aiming for AI citation and intent-aligned pages.</li>
            </ul>
          </article>
          <article className="service-card">
            <h3>Not a fit if</h3>
            <ul className="bullet-list">
              <li>There is no minimum capacity to publish or update pages.</li>
              <li>Results are expected without aligning offer and commercial messaging.</li>
              <li>Business metrics will not be tracked or reviewed.</li>
            </ul>
          </article>
        </div>

        <h2>Exact deliverables</h2>
        <ul className="bullet-list">
          <li>Technical SEO audit (indexation, architecture, performance).</li>
          <li>Intent map and page prioritization by commercial impact.</li>
          <li>Answer-first blocks + structured schema on key landing pages.</li>
          <li>Actionable editorial backlog by topic cluster.</li>
          <li>Dashboard for queries, CTR and conversion tracking.</li>
        </ul>

        <h2>5-step process</h2>
        <ul className="bullet-list">
          <li>1) Technical and commercial intent diagnosis.</li>
          <li>2) Restructure of priority pages.</li>
          <li>3) Citable content + schema implementation.</li>
          <li>4) Iteration driven by Search Console and conversion data.</li>
          <li>5) Editorial scaling with cannibalization control.</li>
        </ul>

        <h2>Target metrics</h2>
        <ul className="bullet-list">
          <li>Qualified clicks by intent query.</li>
          <li>Top-10 queries per service line.</li>
          <li>CTR on service landing pages.</li>
          <li>Organic leads and CTA activation rate.</li>
        </ul>

        <h2>Common objections</h2>
        <details>
          <summary>"Does SEO still work with AI?"</summary>
          <p>Yes: SEO + AEO are complementary today. The key is structure + useful content + authority signals.</p>
        </details>
        <details>
          <summary>"How long does it take?"</summary>
          <p>First signals appear within weeks; consolidation typically shows in 8–12 week cycles.</p>
        </details>

        <h2>Related result</h2>
        <p>
          Measured outcome: <strong>+123% organic traffic</strong>, <strong>+71% qualified clicks</strong> and{' '}
          <strong>+44% top-10 queries</strong>.
        </p>
        <p>
          <Link href="/en/cases/visibilidad-organica-aeo" className="service-link">
            View full SEO/AEO case →
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
