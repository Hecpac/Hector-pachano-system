import type { Metadata } from 'next'

import { SITE_URL } from '@/lib/seo/site'

export const metadata: Metadata = {
  title: 'SEO / AEO',
  description:
    'Estrategia SEO y AEO para crecer tráfico orgánico y aparecer en respuestas de motores de búsqueda e IA.',
  alternates: {
    canonical: `${SITE_URL}/services/seo-aeo`
  }
}

export default function SeoAeoPage() {
  return (
    <main className="page-shell" id="main-content">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <p className="eyebrow">SERVICIO</p>
        <h1>SEO / AEO</h1>
        <p className="lead">
          Posicionamos tu marca para capturar demanda orgánica en Google y en sistemas de respuestas con IA.
        </p>
        <ul className="bullet-list">
          <li>Technical SEO: indexación, estructura y velocidad.</li>
          <li>Arquitectura de contenidos con intención comercial.</li>
          <li>Schema para mejorar visibilidad en rich results y respuestas IA.</li>
        </ul>
      </section>
    </main>
  )
}
