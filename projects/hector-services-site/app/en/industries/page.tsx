import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buildPageMetadata } from '@/lib/seo/meta'

export const metadata: Metadata = buildPageMetadata({
  title: 'Industries',
  description: 'Digital systems tailored by industry context and decision complexity.',
  path: '/en/industries'
})

const industries = [
  {
    title: 'Professional Services',
    href: '/en/industries/servicios-profesionales',
    description: 'Turn technical expertise into predictable pipeline.'
  },
  {
    title: 'Construction & Engineering',
    href: '/en/industries/constructoras-ingenieria',
    description: 'Support complex sales cycles with clearer digital systems.'
  }
]

export default function IndustriesPageEn() {
  return (
    <main className="page-shell" id="main-content" lang="en">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Home', href: '/en' }, { label: 'Industries' }]} />
        <p className="eyebrow">INDUSTRIES</p>
        <h1>Digital systems adapted to your business context</h1>

        <div className="service-grid">
          {industries.map((item) => (
            <article key={item.href} className="service-card">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <Link href={item.href} className="service-link">
                View approach →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
