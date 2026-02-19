import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema } from '@/lib/seo/schema'

export const metadata: Metadata = buildPageMetadata({
  title: 'Casos',
  description: 'Casos de automatizaciones, diseño web y SEO/AEO con resultados medibles para negocio.',
  path: '/work'
})

export default function WorkPage() {
  return (
    <main className="page-shell" id="main-content">
      <JsonLd
        data={
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Casos', path: '/work' }
          ])
        }
      />

      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Casos' }]} />
        <p className="eyebrow">CASOS</p>
        <h1>Resultados en ejecución</h1>
        <p className="lead">
          Esta sección reúne proyectos donde se optimizó conversión, velocidad operativa y visibilidad orgánica.
        </p>
        <ul className="bullet-list">
          <li>Automatización de pipeline comercial con ahorro operativo.</li>
          <li>Rediseño web orientado a conversion rate.</li>
          <li>Framework SEO/AEO con crecimiento orgánico sostenido.</li>
        </ul>
      </section>
    </main>
  )
}
