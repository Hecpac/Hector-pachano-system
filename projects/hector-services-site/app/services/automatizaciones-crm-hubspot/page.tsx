import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo/schema'

const title = 'Automatizaciones CRM + HubSpot para equipos B2B'
const path = '/services/automatizaciones-crm-hubspot'
const description =
  'Automatización de captura, enrutamiento y seguimiento de leads en CRM/HubSpot para acelerar respuesta comercial y reducir retrabajo.'

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
        <p className="lead">Convierte tu flujo comercial en un sistema trazable, rápido y menos dependiente de tareas manuales.</p>

        <h2>Qué es / para quién</h2>
        <p>
          Para empresas B2B con leads entrando por varios canales y equipo comercial saturado por seguimiento manual.
        </p>

        <h2>Cómo lo implementamos</h2>
        <ul className="bullet-list">
          <li>Estandarización de datos de entrada y validaciones.</li>
          <li>Reglas de asignación por intención, servicio y mercado.</li>
          <li>Secuencias automáticas con alertas de SLA y dashboard operativo.</li>
        </ul>

        <h2>Qué resultados esperar</h2>
        <p>
          Menos fricción en operación comercial, mejor velocidad de contacto y mayor consistencia del pipeline.
        </p>
        <p>
          <Link href="/cases/pipeline-leads-automatizado">Ver caso con reducción de tiempo operativo (-62%) →</Link>
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
            Quiero mapear mi flujo de leads →
          </Link>
        </p>
      </section>
    </main>
  )
}
