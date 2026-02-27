import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo/schema'

const title = 'Automatizaciones CRM + HubSpot para equipos B2B'
const path = '/services/automatizaciones-crm-hubspot'
const description =
  'Automatizaciones B2B para capturar y dar seguimiento a leads sin fricción: CRM, reglas de enrutamiento y alertas SLA. Reduce horas operativas y sube tasa de contacto.'

const faqs = [
  {
    question: '¿Necesito tener HubSpot avanzado para empezar?',
    answer:
      'No. Se puede comenzar con configuración base, normalización de datos y reglas de enrutamiento antes de escalar automatizaciones complejas.'
  },
  {
    question: '¿Qué procesos se automatizan primero?',
    answer: 'Captura de lead, deduplicación, asignación de owner y seguimiento con SLA visible.'
  },
  {
    question: '¿Cómo medimos impacto?',
    answer: 'Tiempo de primera respuesta, tasa de contacto y tiempo operativo semanal del equipo comercial.'
  }
]

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path
})

export default function AutomatizacionesCrmHubspotPage() {
  return (
    <main className="page-shell" id="main-content">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Servicios', path: '/services' },
            { name: 'Automatizaciones CRM + HubSpot', path }
          ]),
          serviceSchema({
            name: title,
            description,
            path,
            offers: ['Lead intake + validación', 'Enrutamiento en CRM', 'Seguimiento automático con SLA']
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Servicios', href: '/services' },
            { label: 'Automatizaciones CRM + HubSpot' }
          ]}
        />

        <p className="eyebrow">LANDING DE INTENCIÓN</p>
        <h1>{title}</h1>
        <p className="lead">Convierte tu pipeline en un sistema trazable con respuesta rápida y menos carga operativa.</p>

        <ul className="bullet-list">
          <li><strong>Para quién:</strong> equipos B2B con seguimiento manual y leads dispersos.</li>
          <li><strong>Qué incluye:</strong> mapping, routing rules, SLA alerts, secuencias y dashboard.</li>
          <li><strong>Prueba:</strong> -62% tiempo operativo y +31% tasa de contacto.</li>
        </ul>

        <div className="money-hero-actions">
          <Link href="/contact" className="button">
            Agenda diagnóstico
          </Link>
          <Link href="/cases/pipeline-leads-automatizado" className="button button--ghost">
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
                <td>Lead intake + normalización</td>
                <td>Evita datos sucios y duplicados.</td>
                <td>% leads válidos / duplicados.</td>
              </tr>
              <tr>
                <td>Routing por reglas</td>
                <td>Asigna leads correctos al owner correcto.</td>
                <td>Tiempo de asignación + tasa de contacto.</td>
              </tr>
              <tr>
                <td>Alertas SLA + secuencias</td>
                <td>Reduce pérdida por seguimiento tardío.</td>
                <td>Tiempo primera respuesta + leads perdidos.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Proceso (5 pasos)</h2>
        <ul className="bullet-list">
          <li>Semana 1: auditoría de flujo y datos.</li>
          <li>Semana 2: blueprint de routing + SLA.</li>
          <li>Semana 3: implementación CRM + secuencias.</li>
          <li>Semana 4: pruebas con casos reales y fallback.</li>
          <li>Semana 5+: optimización por KPI operativo/comercial.</li>
        </ul>

        <h2>Caso relacionado</h2>
        <p>
          Problema: seguimiento lento y manual. Intervención: pipeline automatizado con reglas y alertas. Resultado:{' '}
          <strong>-62% tiempo operativo</strong>, <strong>4h → 43 min</strong>, <strong>+31% tasa de contacto</strong>.
        </p>
        <p>
          <Link href="/cases/pipeline-leads-automatizado">Ver caso completo →</Link>
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
          <li>Arquitectura con rollback y etapas de validación.</li>
          <li>Dashboard operativo para monitoreo diario.</li>
          <li>Qué NO hacemos: automatizar caos sin proceso base.</li>
        </ul>

        <section className="money-final-cta">
          <h2>¿Quieres un pipeline más rápido y predecible?</h2>
          <p>Respuesta en menos de 24h. Sin spam. Saldrás con prioridades P0/P1 claras.</p>
          <Link href="/contact" className="service-link">
            Quiero mapear mi flujo de leads →
          </Link>
        </section>
      </section>
    </main>
  )
}
