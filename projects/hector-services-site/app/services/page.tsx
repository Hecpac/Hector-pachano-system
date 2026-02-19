import type { Metadata } from 'next'
import Link from 'next/link'

import { SITE_URL } from '@/lib/seo/site'

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Servicios de automatizaciones, diseño web y SEO/AEO para construir un sistema digital orientado a ingresos.',
  alternates: {
    canonical: `${SITE_URL}/services`
  }
}

const services = [
  {
    title: 'Automatizaciones',
    href: '/services/automatizaciones',
    copy: 'Integración de herramientas, flujos y procesos para ahorrar tiempo y reducir errores operativos.'
  },
  {
    title: 'Diseño Web',
    href: '/services/diseno-web',
    copy: 'Sitios rápidos, editoriales y orientados a conversión, con stack moderno y performance-first.'
  },
  {
    title: 'SEO / AEO',
    href: '/services/seo-aeo',
    copy: 'Posicionamiento orgánico + visibilidad en respuestas de IA con estrategia técnica y de contenidos.'
  }
]

export default function ServicesPage() {
  return (
    <main className="page-shell" id="main-content">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <p className="eyebrow">SERVICIOS</p>
        <h1>Servicios integrados para crecimiento</h1>
        <p className="lead">Puedes contratar una línea puntual o un plan integral de ejecución.</p>

        <div className="service-grid stagger-fade-in">
          {services.map((service) => (
            <article key={service.title} className="service-card">
              <h2>{service.title}</h2>
              <p>{service.copy}</p>
              <Link href={service.href} className="service-link">
                Ver detalle →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
