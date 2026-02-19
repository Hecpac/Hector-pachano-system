import type { Metadata } from 'next'

import { SITE_URL } from '@/lib/seo/site'

export const metadata: Metadata = {
  title: 'Casos',
  description:
    'Casos de automatizaciones, diseño web y SEO/AEO con resultados medibles para negocio.',
  alternates: {
    canonical: `${SITE_URL}/work`
  }
}

export default function WorkPage() {
  return (
    <main className="page-shell" id="main-content">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
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
