import type { Metadata } from 'next'
import Link from 'next/link'

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

        <h2>Qué incluye</h2>
        <ul className="bullet-list">
          <li>Automatización de lead intake y seguimiento.</li>
          <li>Integración CRM, formularios y email transaccional.</li>
          <li>Dashboard operativo para decisiones rápidas.</li>
        </ul>

        <h2>Proceso (cómo lo ejecutamos)</h2>
        <ul className="bullet-list">
          <li>Semana 1: auditoría de flujo actual y estandarización de datos.</li>
          <li>Semana 2: reglas de enrutamiento por intención comercial.</li>
          <li>Semana 3-4: seguimiento automático + SLA + alertas operativas.</li>
        </ul>

        <h2>Prueba y resultados</h2>
        <p>
          Caso aplicado: <strong>-62% tiempo operativo</strong>, primera respuesta de <strong>4h a 43 min</strong> y{' '}
          <strong>+31% tasa de contacto</strong>.
        </p>
        <p>
          <Link href="/cases/pipeline-leads-automatizado">Ver caso completo de automatizaciones →</Link>
        </p>

        <h2>Por qué Pachano Design</h2>
        <ul className="bullet-list">
          <li>Implementación orientada a KPI comercial, no solo a tareas técnicas.</li>
          <li>Trazabilidad de cada etapa del pipeline (datos, owner y estado).</li>
          <li>Diseño de sistema con criterio operativo y validación real.</li>
        </ul>
      </section>
    </main>
  )
}
