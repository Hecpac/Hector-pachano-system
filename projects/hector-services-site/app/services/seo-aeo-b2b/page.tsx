import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo/schema'

const title = 'SEO/AEO B2B: posicionamiento para Google y motores de IA'
const path = '/services/seo-aeo-b2b'
const description =
  'SEO + AEO para B2B: intención comercial, landings answer-first + schema y contenido citable para IA. Aumenta clicks cualificados, CTR y leads orgánicos medibles.'

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
        <p className="lead">Capturamos demanda comercial y aumentamos citabilidad en IA con estructura + contenido + medición real.</p>

        <ul className="bullet-list">
          <li><strong>Para quién:</strong> equipos B2B con tráfico orgánico sin suficiente intención de compra.</li>
          <li><strong>Qué incluye:</strong> intent map, answer blocks, schema y backlog editorial.</li>
          <li><strong>Prueba:</strong> +123% tráfico orgánico, +71% clicks cualificados, +44% queries top 10.</li>
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
                <td>Intent map + arquitectura</td>
                <td>Evita canibalización y ordena páginas por intención comercial.</td>
                <td>Queries top 10 por servicio.</td>
              </tr>
              <tr>
                <td>Answer blocks + schema</td>
                <td>Mejora comprensión y citabilidad en motores IA.</td>
                <td>CTR orgánico + impresiones cualificadas.</td>
              </tr>
              <tr>
                <td>Backlog editorial priorizado</td>
                <td>Escala contenido útil con foco en pipeline.</td>
                <td>Clicks cualificados + leads orgánicos.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Proceso (5 pasos)</h2>
        <ul className="bullet-list">
          <li>Semana 1: auditoría técnica + baseline de demanda.</li>
          <li>Semana 2: arquitectura por intención y prioridades P0/P1.</li>
          <li>Semana 3-4: implementación de páginas answer-first + schema.</li>
          <li>Semana 5-6: ajustes por Search Console y CTR.</li>
          <li>Semana 7+: escalado editorial y optimización continua.</li>
        </ul>

        <h2>Caso relacionado</h2>
        <p>
          Problema: estructura dispersa y baja citabilidad. Intervención: arquitectura + schema + contenido por intención. Resultado:{' '}
          <strong>+123% orgánico</strong>, <strong>+71% clicks cualificados</strong>, <strong>+44% queries top 10</strong>.
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
          <li>Service/Organization/Breadcrumb/Article schema como base.</li>
          <li>Medición semanal de consultas, CTR y leads.</li>
          <li>Qué NO hacemos: tráfico vanity sin intención comercial.</li>
        </ul>

        <section className="money-final-cta">
          <h2>¿Listo para convertir SEO en pipeline?</h2>
          <p>Respuesta en menos de 24h. Sin spam. Plan accionable desde el primer mensaje.</p>
          <Link href="/contact" className="service-link">
            Quiero plan SEO/AEO B2B →
          </Link>
        </section>
      </section>
    </main>
  )
}
