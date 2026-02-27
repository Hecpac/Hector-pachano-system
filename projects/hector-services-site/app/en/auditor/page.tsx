import type { Metadata } from 'next'

import { submitAuditorAction } from '@/app/actions'
import { WebAuditorForm } from '@/components/sections/web-auditor'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buildPageMetadata } from '@/lib/seo/meta'

export const metadata: Metadata = buildPageMetadata({
  title: 'B2B Website Auditor',
  description:
    'Run a free technical diagnosis for performance, SEO/AEO readiness and conversion structure.',
  path: '/en/auditor'
})

export default function AuditorPageEn() {
  return (
    <main className="page-shell" id="main-content" lang="en">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Home', href: '/en' }, { label: 'Web Auditor' }]} />
        <p className="eyebrow">TECHNICAL DIAGNOSIS</p>
        <h1>Find why your website is not converting as expected</h1>
        <p className="lead">Run a free check to detect speed, structural and conversion bottlenecks.</p>
        <WebAuditorForm action={submitAuditorAction} />
      </section>
    </main>
  )
}
