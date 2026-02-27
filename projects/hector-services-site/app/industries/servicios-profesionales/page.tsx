import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema, faqSchema } from '@/lib/seo/schema'

const path = '/industries/servicios-profesionales'
const title = 'Sistemas digitales para servicios profesionales B2B'
const description =
  'Web, automatización y SEO/AEO para firmas de servicios profesionales B2B que quieren más demanda calificada, mejor conversión y seguimiento comercial sin fricción.'

const faqs = [
  {
    question: '¿Qué tipo de firma encaja mejor con este enfoque?',
    answer:
      'Consultorías, despachos técnicos y firmas especializadas que dependen de confianza, reputación y claridad de propuesta para vender.'
  },
  {
    question: '¿Cuál es la prioridad inicial?',
    answer: 'Alinear mensaje, prueba y CTA en web; después automatizar seguimiento y escalar visibilidad con SEO/AEO.'
  },
  {
    question: '¿Cómo medimos avance?',
    answer: 'Con leads cualificados, tasa de respuesta comercial y avance de consultas de intención en orgánico.'
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

        <p className="eyebrow">MONEY PAGE · INDUSTRIA</p>
        <h1>{title}</h1>
        <p className="lead">Transformamos expertise en demanda calificada con sistema comercial medible.</p>

        <ul className="bullet-list">
          <li><strong>Para quién:</strong> consultorías y firmas B2B que venden confianza técnica.</li>
          <li><strong>Qué incluye:</strong> narrativa de oferta, prueba visible y seguimiento automatizado.</li>
          <li><strong>Prueba:</strong> +38% conversion rate y mejor activación de CTA en páginas clave.</li>
        </ul>

        <div className="money-hero-actions">
          <Link href="/contact" className="button">
            Agenda diagnóstico
          </Link>
          <Link href="/cases/landing-alta-conversion" className="button button--ghost">
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
                <td>Mensaje de oferta por servicio</td>
                <td>Evita ambigüedad y mejora claridad de compra.</td>
                <td>CTR en CTA principal.</td>
              </tr>
              <tr>
                <td>Bloques de prueba (casos/resultados)</td>
                <td>Aumenta confianza para decisiones B2B.</td>
                <td>Tasa de formulario + tiempo en página.</td>
              </tr>
              <tr>
                <td>Lead capture + seguimiento</td>
                <td>Reduce pérdida de oportunidades por fricción operativa.</td>
                <td>Tasa de contacto + tiempo primera respuesta.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Proceso (5 pasos)</h2>
        <ul className="bullet-list">
          <li>Semana 1: diagnóstico de propuesta y objeciones.</li>
          <li>Semana 2: diseño de páginas por servicio/decisor.</li>
          <li>Semana 3: implementación de prueba y CTA por intención.</li>
          <li>Semana 4: conexión de formulario + seguimiento.</li>
          <li>Semana 5+: optimización por resultados comerciales.</li>
        </ul>

        <h2>Caso relacionado</h2>
        <p>
          Problema: autoridad técnica sin tracción comercial. Intervención: narrativa + UX + CTA con medición. Resultado:{' '}
          <strong>+38% conversion rate</strong>, <strong>+29% CTR CTA</strong>, <strong>LCP móvil 3.9s → 2.3s</strong>.
        </p>
        <p>
          <Link href="/cases/landing-alta-conversion">Ver caso completo →</Link>
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
          <li>Método en 5 pasos con evidencia de implementación.</li>
          <li>Integración de web, automatización y SEO/AEO en una sola operación.</li>
          <li>Qué NO hacemos: branding sin métricas de negocio.</li>
        </ul>

        <section className="money-final-cta">
          <h2>¿Quieres convertir expertise en pipeline?</h2>
          <p>Respuesta en menos de 24h. Sin spam. Te devolvemos plan accionable desde la primera llamada.</p>
          <Link href="/contact" className="service-link">
            Diseñar plan para servicios profesionales →
          </Link>
        </section>
      </section>
    </main>
  )
}
