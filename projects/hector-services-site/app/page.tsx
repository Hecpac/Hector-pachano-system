import type { Metadata } from 'next'
import Link from 'next/link'

import { submitLeadAction } from './actions'

import { CaseStudiesSection } from '@/components/sections/case-studies'
import { LeadForm } from '@/components/sections/lead-form'
import { JsonLd } from '@/components/ui/json-ld'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { buildPageMetadata } from '@/lib/seo/meta'
import { faqSchema, organizationSchema, websiteSchema } from '@/lib/seo/schema'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/seo/site'

const services = [
  {
    id: '01',
    title: 'Diseño Web',
    href: '/services/diseno-web',
    description: 'Sitios de alto rendimiento construidos para convertir. No solo bonitos — medibles.'
  },
  {
    id: '02',
    title: 'Automatizaciones',
    href: '/services/automatizaciones',
    description: 'Flujos que eliminan trabajo repetitivo y escalan sin contratar más gente.'
  },
  {
    id: '03',
    title: 'SEO / AEO',
    href: '/services/seo-aeo',
    description: 'Posicionamiento estratégico para motores de búsqueda y para IA generativa.'
  }
]

const faqItems = [
  {
    question: '¿Trabajas por paquetes o a medida?',
    answer: 'Ambos. Primero hacemos diagnóstico para definir alcance, prioridad y qué sí genera retorno.'
  },
  {
    question: '¿En cuánto tiempo puede salir el MVP?',
    answer: 'En 1-2 semanas podemos tener una versión funcional publicada y lista para captar leads.'
  },
  {
    question: '¿Puedo contratar solo una parte (ej. SEO)?',
    answer: 'Sí. Pero cuando conviene, propongo plan integral para no perder impacto por trabajo aislado.'
  }
]

export const metadata: Metadata = buildPageMetadata({
  title: 'Inicio',
  description: SITE_DESCRIPTION,
  path: '/'
})

export default function HomePage() {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK || 'https://cal.com/tu-usuario/diagnostico'

  return (
    <main id="main-content">
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />
      <JsonLd data={faqSchema(faqItems)} />

      <nav className="landing-nav">
        <div className="landing-nav__brand">
          <span>{SITE_NAME}</span> {'//'} Digital Systems
        </div>

        <ul className="landing-nav__links">
          <li>
            <Link href="/services">Servicios</Link>
          </li>
          <li>
            <a href="#casos">Casos</a>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contacto</Link>
          </li>
        </ul>

        <div className="landing-nav__cta">
          <ThemeToggle />
          <a href="#contact" className="btn-cta">
            Agenda Diagnóstico
          </a>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="landing-hero__counter">01 / 04</div>

        <div className="landing-hero__content">
          <div className="landing-hero__tags">
            <span className="landing-hero__tag">Automatizaciones</span>
            <span className="landing-hero__tag">Diseño Web</span>
            <span className="landing-hero__tag">SEO / AEO</span>
          </div>

          <h1 className="landing-hero__headline" lang="en">
            Design.
            <br />
            <span className="line-orange">Automate.</span>
            <br />
            <span className="line-outline">Rank.</span>
          </h1>
        </div>

        <div className="landing-hero__bottom">
          <div className="landing-hero__descriptor">
            <p>
              Construyo <strong>sistemas digitales que generan ingresos</strong>: web de alto rendimiento,
              procesos automáticos y posicionamiento estratégico.
            </p>
          </div>

          <div className="landing-hero__actions">
            <a href="#contact" className="btn-primary">
              Agenda Diagnóstico
            </a>
            <a href="#casos" className="btn-secondary">
              Ver Casos
            </a>
          </div>
        </div>

        <div className="landing-scroll-indicator" aria-hidden="true">
          <div className="landing-scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      <div className="landing-ticker" aria-hidden="true">
        <div className="landing-ticker__track">
          <span>Automatizaciones ·</span>
          <span>Diseño Web ·</span>
          <span>SEO / AEO ·</span>
          <span>Performance ·</span>
          <span>Conversión ·</span>
          <span>Automatizaciones ·</span>
          <span>Diseño Web ·</span>
          <span>SEO / AEO ·</span>
          <span>Performance ·</span>
          <span>Conversión ·</span>
        </div>
      </div>

      <div className="landing-section-label">Servicios</div>
      <section className="landing-services-grid">
        {services.map((service) => (
          <article className="landing-service-card" key={service.id}>
            <p className="landing-service-card__num">{service.id}</p>
            <h2 className="landing-service-card__name">{service.title}</h2>
            <p className="landing-service-card__desc">{service.description}</p>
            <Link href={service.href} className="landing-service-card__arrow" aria-label={`Ir a ${service.title}`}>
              ↗
            </Link>
          </article>
        ))}
      </section>

      <div className="page-shell">
        <CaseStudiesSection />

        <section className="section cta reveal-on-scroll cinematic-panel" id="contact">
          <h2>¿Listo para dejar de improvisar tu presencia digital?</h2>
          <p className="lead lead--center">
            Cuéntame tu objetivo y te propongo un plan claro con alcance, tiempos e inversión.
          </p>
          <LeadForm action={submitLeadAction} calLink={calLink} />
        </section>
      </div>
    </main>
  )
}
