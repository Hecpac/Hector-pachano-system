import type { Metadata } from 'next'

import { submitLeadAction } from '../../actions'

import { LeadForm } from '@/components/sections/lead-form'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema } from '@/lib/seo/schema'
import { SITE_CAL_LINK } from '@/lib/seo/site'

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact',
  description: 'Book a diagnosis to define scope, timeline and investment for your project.',
  path: '/en/contact'
})

export default function ContactPageEn() {
  const calLink = SITE_CAL_LINK

  return (
    <main className="page-shell contact-page" id="main-content" lang="en">
      <JsonLd
        data={
          breadcrumbSchema([
            { name: 'Home', path: '/en' },
            { name: 'Contact', path: '/en/contact' }
          ])
        }
      />

      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Home', href: '/en' }, { label: 'Contact' }]} />
        <p className="eyebrow">CONTACT</p>
        <h1>Book your diagnostic</h1>
        <p className="lead">Share your context and business goal. I will reply with an actionable proposal.</p>
        <LeadForm action={submitLeadAction} calLink={calLink} locale="en" />
      </section>
    </main>
  )
}
