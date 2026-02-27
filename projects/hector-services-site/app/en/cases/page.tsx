import type { Metadata } from 'next'
import Link from 'next/link'

import { getCaseStudies } from '@/content/case-studies/cases'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { caseEn } from '@/app/en/content'
import { buildPageMetadata } from '@/lib/seo/meta'

export const metadata: Metadata = buildPageMetadata({
  title: 'Case studies',
  description: 'Automations, web design and SEO/AEO case studies with measurable outcomes.',
  path: '/en/cases'
})

export default function CasesPageEn() {
  const cases = getCaseStudies()

  return (
    <main className="page-shell" id="main-content" lang="en">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Home', href: '/en' }, { label: 'Case studies' }]} />
        <p className="eyebrow">CASE STUDIES</p>
        <h1>System-first case studies with real metrics</h1>
        <p className="lead">Problem, implementation, measurement and outcomes in one structure.</p>

        <div className="service-grid">
          {cases.map((item) => {
            const t = caseEn[item.slug]
            return (
              <article key={item.slug} className="service-card">
                <h2>{t?.title ?? item.title}</h2>
                <p>{t?.metric ?? item.metric}</p>
                <p>{t?.summary ?? item.detail}</p>
                <Link href={`/en/cases/${item.slug}`} className="service-link">
                  View case →
                </Link>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
