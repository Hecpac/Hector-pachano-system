import { submitLeadAction } from '../actions'

import { LeadForm } from '@/components/sections/lead-form'

export default function ContactPage() {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK || 'https://cal.com'

  return (
    <main className="page-shell contact-page">
      <section className="section reveal-on-scroll is-visible">
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
