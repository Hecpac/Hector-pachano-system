import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema } from '@/lib/seo/schema'

export const metadata: Metadata = buildPageMetadata({
  title: 'Industrias',
  description: 'Soluciones de sistemas digitales por industria y contexto operativo.',
  path: '/industries'
})

const industries = [
  {
    href: '/industries/servicios-profesionales',
    title: 'Servicios Profesionales',
    description: 'Despachos y firmas que necesitan convertir expertise en pipeline predecible.'
  },
  {
    href: '/industries/constructoras-ingenieria',
    title: 'Constructoras e Ingeniería',
    description: 'Empresas con ciclos comerciales largos, múltiples stakeholders y operación técnica.'
  }
]

export default function IndustriesPage() {
  return (
    <main className="page-shell" id="main-content">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', path: '/' },
          { name: 'Industrias', path: '/industries' }
        ])}
      />

      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Industrias' }]} />
        <p className="eyebrow">INDUSTRIAS</p>
        <h1>Sistemas digitales adaptados por contexto de negocio</h1>
        <p className="lead">No todos los embudos y procesos operativos se optimizan igual. Selecciona tu industria.</p>

        <div className="service-grid">
          {industries.map((industry) => (
            <article key={industry.href} className="service-card">
              <h2>{industry.title}</h2>
              <p>{industry.description}</p>
              <Link href={industry.href} className="service-link">
                Ver enfoque por industria →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
