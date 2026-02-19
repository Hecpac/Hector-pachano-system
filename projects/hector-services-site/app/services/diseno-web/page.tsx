import type { Metadata } from 'next'

import { SITE_URL } from '@/lib/seo/site'

export const metadata: Metadata = {
  title: 'Diseño Web',
  description:
    'Diseño y desarrollo web orientado a conversión: arquitectura de contenido, UI editorial y performance.',
  alternates: {
    canonical: `${SITE_URL}/services/diseno-web`
  }
}

export default function DisenoWebPage() {
  return (
    <main className="page-shell" id="main-content">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <p className="eyebrow">SERVICIO</p>
        <h1>Diseño Web</h1>
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
