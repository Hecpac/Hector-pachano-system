import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema, serviceSchema } from '@/lib/seo/schema'

const title = 'Diseño Web de Alto Rendimiento para Empresas B2B'
const description =
  'Diseño y desarrollo web para empresas B2B con foco en conversión, arquitectura editorial y performance en Next.js.'
const path = '/services/diseno-web'

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path
})

export default function DisenoWebPage() {
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
              'Arquitectura de contenido y UX comercial',
              'Implementación Next.js performance-first',
              'Optimización de conversión y CTAs'
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
          Construimos sitios que comunican autoridad y convierten visitas en oportunidades reales.
        </p>

        <h2>Qué incluye</h2>
        <ul className="bullet-list">
          <li>Arquitectura de contenido y UX comercial.</li>
          <li>Implementación en Next.js con performance-first.</li>
          <li>Optimización del embudo y de CTAs por intención.</li>
        </ul>

        <h2>Proceso (de brief a producción)</h2>
        <ul className="bullet-list">
          <li>Diagnóstico: propuesta de valor, objeciones y estructura de decisión.</li>
          <li>Diseño: narrativa comercial + jerarquía visual por intención.</li>
          <li>Implementación: performance, tracking y validación post-lanzamiento.</li>
        </ul>

        <h2>Prueba y resultados</h2>
        <p>
          Caso aplicado: <strong>+38% conversion rate</strong>, <strong>LCP móvil de 3.9s a 2.3s</strong> y{' '}
          <strong>+29% CTR en CTA principal</strong>.
        </p>
        <p>
          <Link href="/cases/landing-alta-conversion">Ver caso completo de diseño web →</Link>
        </p>

        <h2>Por qué Pachano Design</h2>
        <ul className="bullet-list">
          <li>Diseño orientado a negocio (no solo estética).</li>
          <li>Métricas de conversión y rendimiento como criterio de calidad.</li>
          <li>Entrega en fases para reducir riesgo y acelerar resultados.</li>
        </ul>
      </section>
    </main>
  )
}
