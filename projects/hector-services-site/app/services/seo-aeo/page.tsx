import type { Metadata } from 'next'

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
        <ul className="bullet-list">
          <li>Technical SEO: indexación, estructura y velocidad.</li>
          <li>Arquitectura de contenidos con intención comercial.</li>
          <li>Schema para mejorar visibilidad en rich results y respuestas IA.</li>
        </ul>
      </section>
    </main>
  )
}
