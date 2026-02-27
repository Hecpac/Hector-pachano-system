import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema, faqSchema } from '@/lib/seo/schema'

const path = '/industries/constructoras-ingenieria'
const title = 'Sistemas digitales para Constructoras e Ingeniería'
const description =
  'Arquitectura web, automatización y SEO/AEO para constructoras e ingeniería con ventas complejas y múltiples decisores.'

const faqs = [
  {
    question: '¿Por qué este sector necesita un enfoque distinto?',
    answer:
      'Porque los ciclos de venta son más largos, hay más actores en la decisión y la prueba técnica pesa más que el marketing superficial.'
  },
  {
    question: '¿Qué mejora primero?',
    answer: 'Claridad de oferta por tipo de proyecto, casos técnicos y ruta de contacto sin fricción para licitaciones/reuniones.'
  }
]

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path
})

export default function ConstructorasIngenieriaIndustryPage() {
  return (
    <main className="page-shell" id="main-content">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Industrias', path: '/industries' },
            { name: 'Constructoras e Ingeniería', path }
          ]),
          faqSchema(faqs)
        ]}
      />

      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Industrias', href: '/industries' },
            { label: 'Constructoras e Ingeniería' }
          ]}
        />

        <p className="eyebrow">INDUSTRIA</p>
        <h1>{title}</h1>
        <p className="lead">Más claridad técnica y comercial para convertir oportunidades complejas en proyectos cerrados.</p>

        <h2>Problema común</h2>
        <p>
          Webs genéricas sin estructura por tipo de servicio/proyecto y baja trazabilidad en seguimiento comercial.
        </p>

        <h2>Sistema recomendado</h2>
        <ul className="bullet-list">
          <li>Páginas por vertical (QA/QC, supervisión, ejecución, etc.).</li>
          <li>Casos con resultados y metodología visible para generar confianza.</li>
          <li>Automatización de intake y clasificación por tipo de proyecto.</li>
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
            Quiero plan para constructora/ingeniería →
          </Link>
        </p>
      </section>
    </main>
  )
}
