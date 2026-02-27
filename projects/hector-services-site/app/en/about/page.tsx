import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buildPageMetadata } from '@/lib/seo/meta'

export const metadata: Metadata = buildPageMetadata({
  title: 'About',
  description: 'Execution partner for B2B teams that need measurable digital growth.',
  path: '/en/about'
})

export default function AboutPageEn() {
  return (
    <main className="page-shell" id="main-content" lang="en">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Home', href: '/en' }, { label: 'About' }]} />
        <p className="eyebrow">ABOUT</p>
        <h1>Technical execution focused on business outcomes</h1>
        <p className="lead">
          I work as an implementation partner for teams that need speed, clarity and measurable performance.
        </p>
      </section>
    </main>
  )
}
