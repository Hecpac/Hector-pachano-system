import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import { submitLeadAction } from './actions'

import { CaseStudiesSection } from '@/components/sections/case-studies'
import { LandingNav } from '@/components/sections/landing-nav'
import { LeadForm } from '@/components/sections/lead-form'
import { JsonLd } from '@/components/ui/json-ld'
import { Parallax } from '@/components/ui/parallax'
import { buildPageMetadata } from '@/lib/seo/meta'
import { faqSchema, organizationSchema, websiteSchema } from '@/lib/seo/schema'
import { SITE_DESCRIPTION } from '@/lib/seo/site'

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
  title: 'Sistemas Digitales: Web, Automatización y SEO',
  description: SITE_DESCRIPTION,
  path: '/'
})

export default function HomePage() {
  const calLink = '/contact'

  return (
    <main id="main-content">
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />
      <JsonLd data={faqSchema(faqItems)} />

      <LandingNav />

      <section className="landing-hero">
        <Parallax speed={-0.3} relativeTo="scroll" zIndex={0}>
          <div className="landing-hero__bg-glow" />
        </Parallax>

        <div className="landing-hero__counter">01 / 04</div>

        <div className="landing-hero__grid">
          <Parallax speed={0.4} relativeTo="scroll" className="landing-hero__content" zIndex={2}>
            <div className="landing-hero__tags">
              <span className="landing-hero__tag">Automatizaciones</span>
              <span className="landing-hero__tag">Diseño Web</span>
              <span className="landing-hero__tag">SEO / AEO</span>
            </div>

            <h1 className="landing-hero__headline">
              <span className="line-kicker">No vendo páginas web.</span>
              <span className="line-orange">Construyo sistemas digitales</span>
              <span className="line-outline">que generan ingresos.</span>
            </h1>

            <div className="landing-hero__descriptor">
              <p className="landing-hero__descriptor-main">
                Diseño que convierte + SEO que posiciona + automatización que escala.
              </p>
              <p className="landing-hero__descriptor-support">Todo integrado, todo medible, todo tuyo.</p>
            </div>
          </Parallax>

          <Parallax speed={0.15} relativeTo="scroll" className="landing-hero__image-container" zIndex={2}>
            <div className="landing-hero__image-inner">
              <Image
                src="/images/hero/graphic-design-content.jpeg"
                alt="Design problem under control"
                fill
                style={{ objectFit: 'cover' }}
                quality={90}
                priority
                fetchPriority="high"
              />
            </div>
          </Parallax>
        </div>

        <Parallax speed={0.2} relativeTo="scroll" className="landing-hero__bottom" zIndex={2}>
          <div className="landing-hero__actions">
            <Link href="/contact" className="btn-primary">
              Agenda el diagnóstico
            </Link>
            <a href="#casos" className="btn-secondary">
              Ver resultados
            </a>
          </div>
        </Parallax>

        <div className="landing-scroll-indicator" aria-hidden="true">
          <div className="landing-scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      <div className="landing-content-wrapper">
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
            {/* Duplicate set for seamless infinite loop */}
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
          {services.map((service, index) => (
            <Parallax 
              key={service.id} 
              speed={index === 1 ? -0.05 : 0.05} 
              relativeTo="viewport"
              className="landing-service-card-wrapper"
            >
              <Link href={service.href} className="landing-service-card">
                <p className="landing-service-card__num">{service.id}</p>
                <h2 className="landing-service-card__name">{service.title}</h2>
                <p className="landing-service-card__desc">{service.description}</p>
                <div className="landing-service-card__footer">
                  <span className="landing-service-card__arrow">↗</span>
                </div>
              </Link>
            </Parallax>
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
      </div>
    </main>
  )
}
