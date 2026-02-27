import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema, faqSchema } from '@/lib/seo/schema'

const path = '/industries/servicios-profesionales'
const title = 'Sistemas digitales para Servicios Profesionales B2B'
const description =
  'Web, automatización y SEO/AEO para firmas de servicios profesionales que quieren más demanda calificada y mejor conversión.'

const faqs = [
  {
    question: '¿Qué tipo de firma encaja mejor con este enfoque?',
    answer:
      'Consultorías, despachos técnicos y firmas especializadas que dependen de confianza, reputación y claridad de propuesta para vender.'
  },
  {
    question: '¿Cuál es la prioridad inicial?',
    answer: 'Alinear mensaje, prueba y CTA en web; después automatizar seguimiento y escalar visibilidad con SEO/AEO.'
  }
]

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path
})

export default function ServiciosProfesionalesIndustryPage() {
  return (
    <main className="page-shell" id="main-content">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Industrias', path: '/industries' },
            { name: 'Servicios Profesionales', path }
          ]),
          faqSchema(faqs)
        ]}
      />

      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Industrias', href: '/industries' },
            { label: 'Servicios Profesionales' }
          ]}
        />

        <p className="eyebrow">INDUSTRIA</p>
        <h1>{title}</h1>
        <p className="lead">Convierte autoridad técnica en pipeline comercial con procesos medibles.</p>

        <h2>Problema común</h2>
        <p>
          Mucha experiencia, poca claridad comercial en la web y seguimiento manual que enfría oportunidades.
        </p>

        <h2>Sistema recomendado</h2>
        <ul className="bullet-list">
          <li>Landing comercial por servicio principal.</li>
          <li>Prueba (casos/resultados) visible temprano.</li>
          <li>Automatización de contacto y seguimiento con SLA.</li>
        </ul>

        <h2>FAQ rápida</h2>
        {faqs.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}

        <p>
          <Link href="/contact" className="service-link">
            Diseñar plan para servicios profesionales →
          </Link>
        </p>
      </section>
    </main>
  )
}
