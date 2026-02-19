import type { Metadata } from 'next'

import { submitLeadAction } from '../actions'

import { LeadForm } from '@/components/sections/lead-form'
import { SITE_URL } from '@/lib/seo/site'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Agenda un diagnóstico para definir alcance, tiempos e inversión de tu proyecto.',
  alternates: {
    canonical: `${SITE_URL}/contact`
  }
}

export default function ContactPage() {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK || 'https://cal.com/tu-usuario/diagnostico'

  return (
    <main className="page-shell contact-page" id="main-content">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
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
