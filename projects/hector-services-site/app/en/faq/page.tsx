import type { Metadata } from 'next'
import Link from 'next/link'

import { getAnswerFirstFaqs } from '@/content/faqs/answer-first'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buildPageMetadata } from '@/lib/seo/meta'

export const metadata: Metadata = buildPageMetadata({
  title: 'FAQ',
  description: 'Frequently asked questions about scope, timeline and execution model.',
  path: '/en/faq'
})

export default function FAQPageEn() {
  const items = getAnswerFirstFaqs()

  return (
    <main className="page-shell" id="main-content" lang="en">
      <section className="section section--faq reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Home', href: '/en' }, { label: 'FAQ' }]} />
        <p className="eyebrow">FAQ</p>
        <h1>Frequently asked questions</h1>

        <ul className="bullet-list">
          {items.map((item) => (
            <li key={item.slug}>
              <Link href={`/en/faq/${item.slug}`}>{item.question}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
