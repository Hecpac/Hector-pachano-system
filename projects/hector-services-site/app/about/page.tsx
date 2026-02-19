import type { Metadata } from 'next'

import { SITE_URL } from '@/lib/seo/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Perfil y enfoque de trabajo: ejecución técnica en automatizaciones, web y posicionamiento orgánico.',
  alternates: {
    canonical: `${SITE_URL}/about`
  }
}

export default function AboutPage() {
  return (
    <main className="page-shell" id="main-content">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
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
