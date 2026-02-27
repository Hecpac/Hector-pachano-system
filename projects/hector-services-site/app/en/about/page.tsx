import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema } from '@/lib/seo/schema'

export const metadata: Metadata = buildPageMetadata({
  title: 'About Hector Pachano — B2B Digital Systems Partner',
  description:
    'Technical execution focused on measurable outcomes: web performance, CRM automations and organic growth for B2B teams in the US and globally.',
  path: '/en/about'
})

export default function AboutPageEn() {
  return (
    <main className="page-shell" id="main-content" lang="en">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/en' },
          { name: 'About', path: '/en/about' }
        ])}
      />

      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Home', href: '/en' }, { label: 'About' }]} />
        <p className="eyebrow">ABOUT</p>
        <h1>Technical execution focused on business outcomes</h1>
        <p className="lead">
          I work as an implementation partner for B2B teams that need speed, clarity and measurable performance — not just deliverables.
        </p>

        <div className="blog-article__content" style={{ marginTop: '2rem' }}>
          <h2>How I work</h2>
          <p>
            I have spent years watching companies spend heavily on design or SaaS tools, only to discover months
            later that systems do not communicate, SEO does not gain traction because the technical architecture
            is broken, or that the "beautiful design" drives users away due to slow load times.
          </p>
          <p>
            I do not define myself only as a developer or consultant — I am a <strong>digital systems builder</strong>.
            My methodology is grounded in three non-negotiable pillars:
          </p>
          <ul className="bullet-list" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
            <li>
              <strong>Technical performance as a priority:</strong> A site that loads instantly retains twice as many users.
            </li>
            <li>
              <strong>Intelligent automation:</strong> I replace repetitive work with reliable data flows (n8n, Make, custom scripts).
            </li>
            <li>
              <strong>Sustainable growth (SEO/AEO):</strong> I build with semantic code, logical hierarchies and JSON-LD.
              If Google cannot understand it, neither will users.
            </li>
          </ul>

          <h2>Experience and credentials</h2>
          <p>
            I have helped scale web and operational infrastructure for startups and B2B companies across the United States,
            Europe and Latin America. I focus on modern, high-impact stacks:{' '}
            <strong>React, Next.js, Node.js and Serverless architectures</strong>.
          </p>
          <p>
            I am the founder of{' '}
            <a
              href="https://www.pachanodesign.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '4px' }}
            >
              Pachano Design
            </a>
            , a studio where technical excellence meets high-level visual design.
          </p>

          <h2>Real results</h2>
          <ul className="bullet-list" style={{ marginBottom: '2rem' }}>
            <li><strong>+123%</strong> organic traffic via technical SEO + intent architecture.</li>
            <li><strong>+38%</strong> conversion rate on B2B landing pages.</li>
            <li><strong>-62%</strong> operational time through CRM automation workflows.</li>
            <li>Lead response time from <strong>4h → 43 min</strong> in a single sprint.</li>
          </ul>

          <h2>Why work with me?</h2>
          <ul className="bullet-list" style={{ marginBottom: '2rem' }}>
            <li>
              <strong>Direct communication:</strong> No account managers, no intermediaries. You work directly with the person executing.
            </li>
            <li>
              <strong>Clear deliverables:</strong> Short roadmaps (1–3 week cycles) with immediate, measurable impact.
            </li>
            <li>
              <strong>Full integration:</strong> I treat design, development and SEO as one product — not isolated departments.
            </li>
          </ul>

          <div style={{ marginTop: '3rem' }}>
            <Link href="/en/contact" className="button">Book a diagnosis</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
