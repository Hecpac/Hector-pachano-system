import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buildPageMetadata } from '@/lib/seo/meta'

export const metadata: Metadata = buildPageMetadata({
  title: 'Work',
  description: 'Selected execution work in web systems, automations and growth architecture.',
  path: '/en/work'
})

export default function WorkPageEn() {
  return (
    <main className="page-shell" id="main-content" lang="en">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Home', href: '/en' }, { label: 'Work' }]} />
        <p className="eyebrow">WORK</p>
        <h1>Execution portfolio</h1>
        <p className="lead">We are preparing the full English version of this section.</p>
      </section>
    </main>
  )
}
