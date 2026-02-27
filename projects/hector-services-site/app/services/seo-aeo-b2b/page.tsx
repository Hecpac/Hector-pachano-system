import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo/schema'

const title = 'SEO/AEO B2B: posicionamiento para Google y motores de IA'
const path = '/services/seo-aeo-b2b'
const description =
  'Servicio SEO/AEO B2B para generar demanda calificada: arquitectura de intención, contenido citable y métricas comerciales.'

const faqs = [
  {
    question: '¿Cuánto tarda ver resultados en SEO/AEO B2B?',
    answer:
      'Las señales iniciales pueden aparecer en semanas (impresiones/indexación), mientras el impacto comercial sostenible suele consolidarse en ciclos de 8-12 semanas.'
  },
  {
    question: '¿Qué entregables incluye este servicio?',
    answer:
      'Auditoría técnica, arquitectura por intención, páginas answer-first, schema y tablero de métricas para queries comerciales y conversiones.'
  },
  {
    question: '¿Cómo se mide éxito?',
    answer:
      'Con KPIs de negocio: clicks cualificados, queries top para intención de compra y activaciones de CTA en páginas de servicio.'
  }
]

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path
})

export default function SeoAeoB2BPage() {
  return (
    <main className="page-shell" id="main-content">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Servicios', path: '/services' },
            { name: 'SEO/AEO B2B', path }
          ]),
          serviceSchema({
            name: title,
            description,
            path,
            offers: ['SEO técnico', 'Arquitectura por intención', 'AEO con bloques citables']
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Servicios', href: '/services' },
            { label: 'SEO/AEO B2B' }
          ]}
        />

        <p className="eyebrow">LANDING DE INTENCIÓN</p>
        <h1>{title}</h1>
        <p className="lead">Diseñado para empresas B2B que quieren convertir visibilidad orgánica en pipeline real.</p>

        <h2>Qué es / para quién</h2>
        <p>
          Este servicio es para equipos comerciales y de marketing que ya publican contenido, pero no logran suficientes
          consultas de alta intención ni tracción en respuestas con IA.
        </p>

        <h2>Cómo lo implementamos</h2>
        <ul className="bullet-list">
          <li>Diagnóstico técnico: indexación, canónicas, arquitectura y rendimiento.</li>
          <li>Diseño de páginas answer-first por intención comercial.</li>
          <li>Schema + iteración semanal por queries y conversiones.</li>
        </ul>

        <h2>Qué resultados esperar</h2>
        <p>
          Mejor cobertura de intención comercial, más citabilidad en motores de respuesta y mayor activación de CTA en
          páginas clave.
        </p>
        <p>
          <Link href="/cases/visibilidad-organica-aeo">Ver caso con resultados reales (+123% orgánico) →</Link>
        </p>

        <h2>FAQ rápida</h2>
        {faqs.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}

        <p>
          <Link href="/contact" className="service-link">
            Agendar diagnóstico SEO/AEO →
          </Link>
        </p>
      </section>
    </main>
  )
}
