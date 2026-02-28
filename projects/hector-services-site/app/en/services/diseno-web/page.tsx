import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema, serviceSchema } from '@/lib/seo/schema'

const title = 'B2B Web Design in Next.js: performance + conversion'
const description =
  'Conversion-first web design for B2B in Next.js: commercial narrative clarity, UX architecture and performance optimization tied to measurable KPIs.'
const path = '/en/services/diseno-web'

export const metadata: Metadata = buildPageMetadata({ title, description, path })

export default function WebDesignServiceEn() {
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
              'Content architecture by purchase intent',
              'Conversion-oriented UX/UI implementation in Next.js',
              'Core Web Vitals and CTA conversion tracking'
            ]
          })
        ]}
      />

      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/en' },
            { label: 'Services', href: '/en/services' },
            { label: 'Web Design' }
          ]}
        />
        <p className="eyebrow">SERVICE</p>
        <h1>B2B Web Design in Next.js</h1>
        <p className="lead">
          We build sites that communicate authority and convert visits into real business opportunities.
        </p>

        <figure style={{ margin: '2rem 0', borderRadius: '16px', overflow: 'hidden', border: '1px solid #2a2a2a' }}>
          <img
            src="/images/services/diseno-web.svg"
            alt="Conversion-oriented web design wireframe"
            width={1600}
            height={900}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </figure>

        <h2>Best fit / not a fit</h2>
        <div className="service-grid">
          <article className="service-card">
            <h3>Best fit for</h3>
            <ul className="bullet-list">
              <li>B2B teams with traffic but weak conversion.</li>
              <li>Brands with a strong offer but unclear or slow website messaging.</li>
              <li>Companies that need real performance and commercial clarity together.</li>
            </ul>
          </article>
          <article className="service-card">
            <h3>Not a fit if</h3>
            <ul className="bullet-list">
              <li>You are looking for a visual redesign only, without business objectives.</li>
              <li>There will be no capacity to respond to incoming leads.</li>
              <li>You expect results without measurement or iteration.</li>
            </ul>
          </article>
        </div>

        <h2>Exact deliverables</h2>
        <ul className="bullet-list">
          <li>Content architecture by purchase intent.</li>
          <li>Conversion-oriented UX/UI design and implementation.</li>
          <li>Performance-first Next.js build.</li>
          <li>Key event and CTA tracking setup.</li>
          <li>Technical exit checklist (SEO baseline + Core Web Vitals + accessibility).</li>
        </ul>

        <h2>5-step process</h2>
        <ul className="bullet-list">
          <li>1) Funnel, messaging and friction diagnosis.</li>
          <li>2) Page structure and decision narrative architecture.</li>
          <li>3) Visual design with commercial hierarchy.</li>
          <li>4) Development and technical optimization.</li>
          <li>5) Validation against conversion metrics.</li>
        </ul>

        <h2>Target metrics</h2>
        <ul className="bullet-list">
          <li>Conversion rate per landing page.</li>
          <li>LCP and INP on mobile.</li>
          <li>Primary CTA click-through rate.</li>
          <li>Form completion rate.</li>
        </ul>

        <h2>Common objections</h2>
        <details>
          <summary>"I already have a site."</summary>
          <p>We do not replace everything by default — we prioritize critical pages to accelerate impact first.</p>
        </details>
        <details>
          <summary>"How long before I see results?"</summary>
          <p>First conversion signals typically improve within the first weeks through CTA and copy iterations.</p>
        </details>

        <h2>Related result</h2>
        <p>
          Measured outcome: <strong>+38% conversion rate</strong>, mobile LCP from{' '}
          <strong>3.9s to 2.3s</strong> and <strong>+29% CTR on primary CTA</strong>.
        </p>
        <p>
          <Link href="/en/cases/landing-alta-conversion" className="service-link">
            View full web design case →
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
