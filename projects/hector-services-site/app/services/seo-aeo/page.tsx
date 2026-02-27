import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema, serviceSchema } from '@/lib/seo/schema'

const title = 'SEO y AEO para Empresas B2B'
const description =
  'Servicio SEO y AEO para empresas B2B: posicionamiento orgánico, arquitectura de contenidos y visibilidad en respuestas de IA.'
const path = '/services/seo-aeo'

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path
})

export default function SeoAeoPage() {
  return (
    <main className="page-shell" id="main-content">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Servicios', path: '/services' },
            { name: title, path }
          ]),
          serviceSchema({
            name: title,
            description,
            path,
            offers: [
              'Technical SEO e indexación',
              'Estrategia de contenidos por intención',
              'Optimización AEO para respuestas de IA'
            ]
          })
        ]}
      />

      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Servicios', href: '/services' },
            { label: title }
          ]}
        />
        <p className="eyebrow">SERVICIO</p>
        <h1>{title}</h1>
        <p className="lead">
          Posicionamos tu marca para capturar demanda orgánica en Google y en sistemas de respuestas con IA.
        </p>

        <h2>Qué incluye</h2>
        <ul className="bullet-list">
          <li>Technical SEO: indexación, estructura y velocidad.</li>
          <li>Arquitectura de contenidos por intención comercial.</li>
          <li>Schema (Service + FAQ) para mejorar citabilidad en IA.</li>
        </ul>

        <h2>Proceso (8-12 semanas)</h2>
        <ul className="bullet-list">
          <li>Semana 1-2: auditoría técnica y limpieza de señales SEO.</li>
          <li>Semana 3-6: páginas answer-first + clusters de intención.</li>
          <li>Semana 7-12: iteración por queries comerciales y CTR/CTA.</li>
        </ul>

        <h2>Prueba y resultados</h2>
        <p>
          Caso aplicado: <strong>+123% tráfico orgánico</strong>, <strong>+71% clicks cualificados</strong> y{' '}
          <strong>+44% queries top 10</strong>.
        </p>
        <p>
          <Link href="/cases/visibilidad-organica-aeo">Ver caso completo de SEO/AEO →</Link>
        </p>

        <h2>Por qué Pachano Design</h2>
        <ul className="bullet-list">
          <li>Combinamos arquitectura técnica + contenido comercial.</li>
          <li>Foco en demanda útil (pipeline), no solo volumen de tráfico.</li>
          <li>Roadmap semanal con evidencia y decisiones de priorización.</li>
        </ul>
      </section>
    </main>
  )
}
