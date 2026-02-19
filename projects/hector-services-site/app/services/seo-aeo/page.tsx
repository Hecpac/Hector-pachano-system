import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema, serviceSchema } from '@/lib/seo/schema'

const title = 'SEO / AEO'
const description =
  'Estrategia SEO y AEO para crecer tráfico orgánico y aparecer en respuestas de motores de búsqueda e IA.'
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
            path
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
