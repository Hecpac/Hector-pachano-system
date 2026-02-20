import type { Metadata } from 'next'

import { submitLeadAction } from '../actions'

import { LeadForm } from '@/components/sections/lead-form'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema } from '@/lib/seo/schema'

export const metadata: Metadata = buildPageMetadata({
  title: 'Contacto',
  description: 'Agenda un diagnóstico para definir alcance, tiempos e inversión de tu proyecto.',
  path: '/contact'
})

export default function ContactPage() {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK || '/contact'

  return (
    <main className="page-shell contact-page" id="main-content">
      <JsonLd
        data={
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Contacto', path: '/contact' }
          ])
        }
      />

      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Contacto' }]} />
        <p className="eyebrow">CONTACTO</p>
        <h1>Agenda tu diagnóstico</h1>
        <p className="lead">
          Comparte contexto y objetivo. Te respondo con una propuesta accionable.
        </p>
        <LeadForm action={submitLeadAction} calLink={calLink} />
      </section>
    </main>
  )
}
