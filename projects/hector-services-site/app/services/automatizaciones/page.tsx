import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema, serviceSchema } from '@/lib/seo/schema'

const title = 'Automatizaciones de Procesos para Empresas B2B'
const description =
  'Automatizaciones B2B para capturar y dar seguimiento a leads sin fricción: CRM, reglas de enrutamiento y alertas SLA. Reduce horas operativas y sube tasa de contacto.'
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

        <h2>Para quién es / para quién no</h2>
        <div className="service-grid">
          <article className="service-card">
            <h3>Ideal para</h3>
            <ul className="bullet-list">
              <li>Equipos B2B con leads en varios canales y seguimiento manual.</li>
              <li>Operaciones comerciales con tiempos de respuesta lentos.</li>
              <li>Empresas que quieren escalar sin contratar más operación repetitiva.</li>
            </ul>
          </article>
          <article className="service-card">
            <h3>No es ideal si</h3>
            <ul className="bullet-list">
              <li>Aún no existe oferta/servicio definido para vender.</li>
              <li>No hay owner comercial para ejecutar sobre los leads entrantes.</li>
              <li>Buscas “automatizar todo” sin proceso base mínimo.</li>
            </ul>
          </article>
        </div>

        <h2>Entregables exactos</h2>
        <ul className="bullet-list">
          <li>Mapa de flujo actual y blueprint objetivo (captura → CRM → seguimiento).</li>
          <li>Integración de formularios, CRM y notificaciones operativas.</li>
          <li>Reglas de enrutamiento por servicio, fit y prioridad comercial.</li>
          <li>Secuencias de seguimiento y alertas de SLA.</li>
          <li>Dashboard operativo para control diario.</li>
        </ul>

        <h2>Proceso resumido (5 pasos)</h2>
        <ul className="bullet-list">
          <li>1) Auditoría de pipeline y calidad de datos.</li>
          <li>2) Diseño de arquitectura de automatización por impacto.</li>
          <li>3) Implementación de integraciones y reglas de enrutamiento.</li>
          <li>4) Pruebas reales con leads y fallback de errores.</li>
          <li>5) Optimización semanal por KPI comercial.</li>
        </ul>

        <h2>Métricas objetivo</h2>
        <ul className="bullet-list">
          <li>Tiempo de primera respuesta (SLA).</li>
          <li>Tasa de contacto efectivo.</li>
          <li>Horas operativas liberadas por semana.</li>
          <li>Leads perdidos por falta de seguimiento.</li>
        </ul>

        <h2>Objeciones frecuentes</h2>
        <details>
          <summary>“No quiero romper lo que ya funciona.”</summary>
          <p>Se implementa por fases y con rollback explícito en cada etapa crítica.</p>
        </details>
        <details>
          <summary>“Mi equipo no es técnico.”</summary>
          <p>La operación final queda documentada y usable por negocio, no solo por developers.</p>
        </details>

        <h2>Mini caso relacionado</h2>
        <p>
          Resultado real: <strong>-62% tiempo operativo</strong>, primera respuesta de <strong>4h a 43 min</strong> y{' '}
          <strong>+31% tasa de contacto</strong>.
        </p>
        <p>
          <Link href="/cases/pipeline-leads-automatizado">Ver caso completo de automatizaciones →</Link>
        </p>
      </section>
    </main>
  )
}
