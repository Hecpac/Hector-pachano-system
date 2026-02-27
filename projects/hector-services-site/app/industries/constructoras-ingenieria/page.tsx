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
  },
  {
    question: '¿Qué resultados esperar en 60 días?',
    answer: 'Mayor calidad de consultas, mejor filtrado comercial y más consistencia en respuesta a oportunidades calificadas.'
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

        <p className="eyebrow">MONEY PAGE · INDUSTRIA</p>
        <h1>{title}</h1>
        <p className="lead">Alineamos señal técnica y señal comercial para convertir ciclos de venta complejos en cierres más previsibles.</p>

        <ul className="bullet-list">
          <li><strong>Para quién:</strong> constructoras/ingenierías con múltiples decisores y ventas largas.</li>
          <li><strong>Qué incluye:</strong> contenido técnico citable, casos estructurados y ruta de contacto cualificada.</li>
          <li><strong>Prueba:</strong> mejoras en consultas calificadas y conversiones de páginas técnicas.</li>
        </ul>

        <div className="money-hero-actions">
          <Link href="/contact" className="button">
            Agenda diagnóstico
          </Link>
          <Link href="/cases/visibilidad-organica-aeo" className="button button--ghost">
            Ver caso
          </Link>
        </div>

        <h2>Tabla de entregables</h2>
        <div className="money-table-wrap">
          <table className="money-table">
            <thead>
              <tr>
                <th>Entregable</th>
                <th>Qué resuelve</th>
                <th>Cómo se mide (KPI)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Páginas por vertical técnico</td>
                <td>Ordena oferta por tipo de proyecto y decisor.</td>
                <td>CTR de páginas técnicas + formularios cualificados.</td>
              </tr>
              <tr>
                <td>Casos y metodología visible</td>
                <td>Sube confianza en procesos de evaluación.</td>
                <td>Tasa de contacto con fit técnico.</td>
              </tr>
              <tr>
                <td>Intake y pre-calificación</td>
                <td>Reduce ruido comercial y acelera respuesta.</td>
                <td>Tiempo de clasificación + tasa de oportunidad útil.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Proceso (5 pasos)</h2>
        <ul className="bullet-list">
          <li>Semana 1: diagnóstico de verticales, stakeholders y objeciones.</li>
          <li>Semana 2: arquitectura de contenido técnico-comercial.</li>
          <li>Semana 3: implementación de páginas y señales de confianza.</li>
          <li>Semana 4: conexión de captación + clasificación de oportunidades.</li>
          <li>Semana 5+: optimización por consultas y calidad de lead.</li>
        </ul>

        <h2>Caso relacionado</h2>
        <p>
          Problema: visibilidad dispersa en temas técnicos. Intervención: arquitectura por intención + citabilidad + contenido. Resultado:{' '}
          <strong>+123% tráfico orgánico</strong>, <strong>+71% clicks cualificados</strong>, <strong>+44% queries top 10</strong>.
        </p>
        <p>
          <Link href="/cases/visibilidad-organica-aeo">Ver caso completo →</Link>
        </p>

        <h2>Objeciones frecuentes</h2>
        {faqs.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}

        <h2>Señales de confianza</h2>
        <ul className="bullet-list">
          <li>Enfoque técnico-comercial para ciclos complejos.</li>
          <li>Contenido orientado a decisores (no solo tráfico masivo).</li>
          <li>Qué NO hacemos: landing genérica sin pre-calificación.</li>
        </ul>

        <section className="money-final-cta">
          <h2>¿Quieres más oportunidades cualificadas en ingeniería?</h2>
          <p>Respuesta en menos de 24h. Sin spam. Te compartimos plan por vertical y prioridad.</p>
          <Link href="/contact" className="service-link">
            Quiero plan para constructora/ingeniería →
          </Link>
        </section>
      </section>
    </main>
  )
}
