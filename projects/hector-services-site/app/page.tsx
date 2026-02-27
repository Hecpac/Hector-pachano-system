import type { Metadata } from 'next'
import Link from 'next/link'

import { submitLeadAction } from './actions'

import { CaseStudiesSection } from '@/components/sections/case-studies'
import { HeroMonitorIntro } from '@/components/sections/hero-monitor-intro'
import { LandingNav } from '@/components/sections/landing-nav'
import { LeadForm } from '@/components/sections/lead-form'
import { JsonLd } from '@/components/ui/json-ld'
import { MobileCarouselDriver } from '@/components/ui/mobile-carousel-driver'
import { Parallax } from '@/components/ui/parallax'
import { buildPageMetadata } from '@/lib/seo/meta'
import { faqSchema, organizationSchema, serviceSchema, websiteSchema } from '@/lib/seo/schema'
import { SITE_CAL_LINK, SITE_DESCRIPTION } from '@/lib/seo/site'

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

const tickerItems = ['Automatizaciones', 'Diseño Web', 'SEO / AEO', 'Performance', 'Conversión']

const answerBlocks = [
  {
    title: 'Qué hago',
    content: 'Construyo sistemas digitales B2B que convierten: web, automatización y SEO/AEO en una sola ejecución.'
  },
  {
    title: 'Para quién',
    content: 'Equipos de servicios profesionales y B2B que necesitan más demanda calificada sin improvisar operación.'
  },
  {
    title: 'Cómo lo ejecuto',
    content: 'Diagnóstico → implementación por fases → medición semanal de conversión, velocidad y pipeline.'
  }
]

const homeServiceSchemas = [
  serviceSchema({
    name: 'Diseño Web B2B',
    description: 'Sitios de alto rendimiento orientados a conversión para empresas B2B.',
    path: '/services/diseno-web',
    offers: ['Landing comercial', 'Sitio corporativo', 'Optimización de conversión']
  }),
  serviceSchema({
    name: 'Automatizaciones de procesos',
    description: 'Flujos automatizados para captación, seguimiento y operación comercial.',
    path: '/services/automatizaciones',
    offers: ['Pipeline de leads', 'Integración CRM', 'Automatización de seguimiento']
  }),
  serviceSchema({
    name: 'SEO / AEO estratégico',
    description: 'Posicionamiento en buscadores y preparación de contenido citable para IA.',
    path: '/services/seo-aeo',
    offers: ['SEO técnico', 'Arquitectura semántica', 'Contenido para AEO']
  })
]

export const metadata: Metadata = buildPageMetadata({
  title: 'Sistemas Digitales B2B | Web, Automatización y SEO/AEO',
  description: SITE_DESCRIPTION,
  path: '/'
})

export default function HomePage() {
  const calLink = SITE_CAL_LINK

  return (
    <main id="main-content">
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />
      {homeServiceSchemas.map((schema, idx) => (
        <JsonLd key={`service-schema-${idx}`} data={schema} />
      ))}
      <JsonLd data={faqSchema(faqItems)} />

      <LandingNav />
      <MobileCarouselDriver />

      <section className="landing-hero">
        <div className="landing-hero__grain" aria-hidden="true" />
        <div className="landing-hero__vignette" aria-hidden="true" />

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
              <span className="line-kicker landing-hero__line landing-hero__line--1">No vendo páginas web.</span>
              <span className="line-orange landing-hero__line landing-hero__line--2">Construyo sistemas digitales</span>
              <span className="line-outline landing-hero__line landing-hero__line--3">que generan ingresos.</span>
            </h1>

            <h2 className="landing-hero__subheadline landing-hero__line landing-hero__line--4">
              Sistemas digitales para empresas B2B: Web + Automatización + SEO/AEO
            </h2>

            <div className="landing-hero__descriptor landing-hero__line landing-hero__line--5">
              <p className="landing-hero__descriptor-main">
                Diseño que convierte + SEO que posiciona + automatización que escala.
              </p>
              <p className="landing-hero__descriptor-support">Todo integrado, todo medible, todo tuyo.</p>
            </div>

            <div className="landing-proof-grid landing-hero__line landing-hero__line--6" aria-label="Prueba de resultados">
              <article className="landing-proof-card">
                <p className="landing-proof-card__kicker">Sistema</p>
                <p className="landing-proof-card__value">Captura → CRM → Seguimiento → Dashboard</p>
              </article>
              <article className="landing-proof-card">
                <p className="landing-proof-card__kicker">Caso real</p>
                <p className="landing-proof-card__value">Tiempo operativo -62%</p>
              </article>
            </div>

            <p className="landing-hero__perf-proof landing-hero__line landing-hero__line--6">INP &lt; 200ms · LCP &lt; 2.5s · conversion-ready</p>

            <div className="landing-answer-blocks landing-hero__line landing-hero__line--7" aria-label="Answer blocks">
              {answerBlocks.map((block) => (
                <article key={block.title} className="landing-answer-block">
                  <p className="landing-answer-block__title">{block.title}</p>
                  <p className="landing-answer-block__content">{block.content}</p>
                </article>
              ))}
            </div>
          </Parallax>

          <HeroMonitorIntro />
        </div>

        <Parallax
          speed={0.2}
          relativeTo="scroll"
          className="landing-hero__bottom landing-hero__line landing-hero__line--8"
          zIndex={2}
        >
          <div className="landing-hero__actions">
            <Link href="/contact" className="btn-primary">
              Agenda el diagnóstico
            </Link>
            <Link href="/cases" className="btn-secondary">
              Ver resultados
            </Link>
          </div>
        </Parallax>

        <div className="landing-scroll-indicator" aria-hidden="true">
          <div className="landing-scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      <div className="landing-content-wrapper">
        <div className="landing-ticker" aria-hidden="true">
          <div className="landing-ticker__track" role="presentation" aria-hidden="true">
            {tickerItems.map((item) => (
              <span key={`ticker-a-${item}`}>{item}</span>
            ))}
          </div>
          <div className="landing-ticker__track" role="presentation" aria-hidden="true">
            {tickerItems.map((item) => (
              <span key={`ticker-b-${item}`}>{item}</span>
            ))}
          </div>
        </div>

        <h2 className="landing-section-label">Servicios</h2>
        <p className="mobile-swipe-hint" aria-hidden="true">Desliza →</p>
        <section
          className="landing-services-grid reveal-on-scroll cinematic-panel scene-block scene-block--services stagger-fade-in"
          data-mobile-carousel="true"
        >
          {services.map((service, index) => (
            <Parallax
              key={service.id}
              speed={index === 1 ? -0.05 : 0.05}
              relativeTo="viewport"
              className={`landing-service-card-wrapper landing-service-card-wrapper--${index + 1}`}
            >
              <Link href={service.href} className="landing-service-card">
                <p className="landing-service-card__num">{service.id}</p>
                <h3 className="landing-service-card__name">{service.title}</h3>
                <p className="landing-service-card__desc">{service.description}</p>
                <div className="landing-service-card__footer">
                  <span className="landing-service-card__arrow">↗</span>
                </div>
              </Link>
            </Parallax>
          ))}
        </section>

        <div className="page-shell home-scene-stack">
          <CaseStudiesSection />

          <section className="section cta reveal-on-scroll cinematic-panel scene-block scene-block--cta" id="contact">
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
