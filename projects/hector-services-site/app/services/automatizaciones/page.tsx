import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema, serviceSchema } from '@/lib/seo/schema'

const title = 'Automatizaciones de Procesos para Empresas B2B'
const description =
  'Automatizaciones de procesos para empresas B2B: integración de CRM, formularios, notificaciones y flujos operativos.'
const path = '/services/automatizaciones'

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path
})

export default function AutomatizacionesPage() {
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
              'Lead intake y enrutamiento automático',
              'Integración CRM y formularios',
              'Notificaciones y seguimiento operativo'
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
          Diseñamos flujos que eliminan tareas repetitivas y conectan herramientas clave para operar con velocidad.
        </p>
        <ul className="bullet-list">
          <li>Automatización de lead intake y seguimiento.</li>
          <li>Integración CRM, formularios y email transaccional.</li>
          <li>Dashboards operativos para decisiones rápidas.</li>
        </ul>
      </section>
    </main>
  )
}
