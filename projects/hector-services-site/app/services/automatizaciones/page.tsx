import type { Metadata } from 'next'

import { SITE_URL } from '@/lib/seo/site'

export const metadata: Metadata = {
  title: 'Automatizaciones',
  description:
    'Automatizaciones de procesos y sistemas: integración de CRM, formularios, notificaciones y flujos operativos.',
  alternates: {
    canonical: `${SITE_URL}/services/automatizaciones`
  }
}

export default function AutomatizacionesPage() {
  return (
    <main className="page-shell" id="main-content">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <p className="eyebrow">SERVICIO</p>
        <h1>Automatizaciones</h1>
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
