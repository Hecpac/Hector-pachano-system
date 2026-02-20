import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { Parallax } from '@/components/ui/parallax'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema } from '@/lib/seo/schema'

export const metadata: Metadata = buildPageMetadata({
  title: 'Servicios',
  description:
    'Servicios de automatizaciones, diseño web y SEO/AEO para construir un sistema digital orientado a ingresos.',
  path: '/services'
})

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
      <JsonLd
        data={
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Servicios', path: '/services' }
          ])
        }
      />

      <section className="section reveal-on-scroll cinematic-panel is-visible" style={{ position: 'relative', overflow: 'hidden' }}>
        
        <div className="services-hero__grid">
          <div className="services-hero__content">
            <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Servicios' }]} />
            <p className="eyebrow">SERVICIOS</p>
            <h1>Sistemas integrados para crecimiento</h1>
            <p className="lead">
              Puedes contratar una línea puntual o un plan integral de ejecución tecnológica.
            </p>
          </div>

          <Parallax speed={0.1} relativeTo="scroll" className="services-hero__image-container" zIndex={1}>
            <div className="services-hero__image-inner">
              <Image
                src="/images/services/hero.jpeg"
                alt="Filosofía y tecnología en servicios digitales"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center bottom' }}
                quality={90}
                priority
              />
            </div>
          </Parallax>
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="service-grid stagger-fade-in" style={{ marginTop: '2rem' }}>
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
        </div>
      </section>
    </main>
  )
}
