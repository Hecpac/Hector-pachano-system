import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema, serviceSchema } from '@/lib/seo/schema'

const title = 'Diseño Web'
const description =
  'Diseño y desarrollo web orientado a conversión: arquitectura de contenido, UI editorial y performance.'
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
        <ul className="bullet-list">
          <li>Diseño visual editorial con identidad clara.</li>
          <li>Implementación en Next.js con performance-first.</li>
          <li>Optimización de embudo y llamados a la acción.</li>
        </ul>
      </section>
    </main>
  )
}
