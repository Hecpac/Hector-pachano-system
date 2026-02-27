import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buildPageMetadata } from '@/lib/seo/meta'

export const metadata: Metadata = buildPageMetadata({
  title: 'Legal Notice',
  description: 'Legal notice and website usage terms for Pachano Design.',
  path: '/en/legal/aviso-legal'
})

export default function LegalNoticePageEn() {
  return (
    <main className="page-shell" id="main-content" lang="en">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Home', href: '/en' }, { label: 'Legal Notice' }]} />
        <p className="eyebrow">LEGAL</p>
        <h1>Legal Notice (English summary)</h1>
        <p className="lead">This website is operated by Hector Pachano // Digital Systems.</p>
        <p>
          For the complete legal text in Spanish, use <Link href="/legal/aviso-legal">this version</Link>. We can publish a full EN legal text if required.
        </p>
      </section>
    </main>
  )
}
