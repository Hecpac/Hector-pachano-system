import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buildPageMetadata } from '@/lib/seo/meta'

export const metadata: Metadata = buildPageMetadata({
  title: 'Privacy Policy',
  description: 'Privacy policy for Pachano Design services and website interactions.',
  path: '/en/legal/privacidad'
})

export default function PrivacyPageEn() {
  return (
    <main className="page-shell" id="main-content" lang="en">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Home', href: '/en' }, { label: 'Privacy Policy' }]} />
        <p className="eyebrow">LEGAL</p>
        <h1>Privacy Policy (English summary)</h1>
        <p className="lead">We process contact data only to provide diagnostics, proposals and service communication.</p>
        <p>
          For the complete legal wording in Spanish, use <Link href="/legal/privacidad">this version</Link>. We can publish a full EN legal text if required.
        </p>
      </section>
    </main>
  )
}
