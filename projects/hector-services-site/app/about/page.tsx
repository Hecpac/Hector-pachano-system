import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema } from '@/lib/seo/schema'

export const metadata: Metadata = buildPageMetadata({
  title: 'About',
  description:
    'Perfil y enfoque de trabajo: ejecución técnica en automatizaciones, web y posicionamiento orgánico.',
  path: '/about'
})

export default function AboutPage() {
  return (
    <main className="page-shell" id="main-content">
      <JsonLd
        data={
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'About', path: '/about' }
          ])
        }
      />

      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'About' }]} />
        <p className="eyebrow">ABOUT</p>
        <h1>Operación técnica con foco en resultados</h1>
        <p className="lead">
          Trabajo como partner de ejecución para equipos que necesitan mover rápido sin sacrificar calidad.
        </p>
        <ul className="bullet-list">
          <li>Comunicación directa y entregables claros.</li>
          <li>Roadmaps cortos con impacto medible.</li>
          <li>Integración entre diseño, tecnología y crecimiento.</li>
        </ul>
      </section>
    </main>
  )
}
