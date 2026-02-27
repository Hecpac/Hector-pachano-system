import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { Parallax } from '@/components/ui/parallax'
import { getAnswerFirstFaqs } from '@/content/faqs/answer-first'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema } from '@/lib/seo/schema'

export const metadata: Metadata = buildPageMetadata({
  title: 'Servicios de Diseño Web, SEO/AEO y Automatización para Empresas B2B',
  description:
    'Servicios para empresas B2B: automatizaciones, diseño web de alto rendimiento y SEO/AEO orientado a crecimiento comercial.',
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

const answerFirstFaqs = getAnswerFirstFaqs().slice(0, 5)

const intentPages = [
  { href: '/services/seo-aeo-b2b', label: 'SEO/AEO B2B' },
  { href: '/services/automatizaciones-crm-hubspot', label: 'Automatizaciones CRM + HubSpot' },
  { href: '/services/web-performance-nextjs', label: 'Web Performance en Next.js' },
  { href: '/industries/servicios-profesionales', label: 'Industria: Servicios Profesionales' },
  { href: '/industries/constructoras-ingenieria', label: 'Industria: Constructoras e Ingeniería' }
]

const engagementModels = [
  {
    title: 'Sprint (1-2 semanas)',
    detail: 'Quick win medible para desbloquear una prioridad crítica sin esperar un proyecto largo.'
  },
  {
    title: 'Build (4-8 semanas)',
    detail: 'Sistema completo de Web + Automatización + SEO/AEO con entregables por fase y validación real.'
  },
  {
    title: 'Retainer continuo',
    detail: 'Mejora semanal con backlog priorizado, KPIs de negocio y optimización de embudo.'
  }
]

const answerBlocks = [
  {
    title: 'Qué resolvemos',
    content: 'Convertimos webs y operaciones dispersas en sistemas que capturan, califican y convierten demanda B2B.'
  },
  {
    title: 'Cómo trabajamos',
    content: 'Priorización por impacto, ejecución en fases y validación semanal con métricas reales de negocio.'
  },
  {
    title: 'Qué entregamos',
    content: 'Arquitectura, implementación y optimización continua en Web + Automatización + SEO/AEO.'
  }
]

const proofMetrics = ['+123% tráfico orgánico', '+38% conversion rate', '-62% tiempo operativo']

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

            <div className="service-grid" style={{ marginTop: '1rem', gap: '0.55rem' }}>
              {answerBlocks.map((block) => (
                <article key={block.title} className="service-card" style={{ padding: '0.85rem 0.9rem' }}>
                  <h2 style={{ margin: 0, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{block.title}</h2>
                  <p style={{ marginTop: '0.45rem', marginBottom: 0 }}>{block.content}</p>
                </article>
              ))}
            </div>

            <article className="service-card" style={{ marginTop: '0.8rem', padding: '0.9rem' }}>
              <h2 style={{ margin: 0, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Prueba rápida</h2>
              <ul className="bullet-list" style={{ marginTop: '0.55rem', marginBottom: 0 }}>
                {proofMetrics.map((metric) => (
                  <li key={metric}>{metric}</li>
                ))}
              </ul>
            </article>
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

          <article className="service-card" style={{ marginTop: '2rem' }}>
            <h2>Landings por intención (SEO + AEO)</h2>
            <p>Páginas específicas para capturar demanda de mayor intención comercial.</p>
            <ul className="bullet-list">
              {intentPages.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </article>

          <article className="service-card" style={{ marginTop: '2rem' }}>
            <h2>Modelos de trabajo</h2>
            <div className="service-grid">
              {engagementModels.map((model) => (
                <div key={model.title} className="service-card">
                  <h3>{model.title}</h3>
                  <p>{model.detail}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="service-card" style={{ marginTop: '2rem' }}>
            <h2>Preguntas de alto intento (AEO)</h2>
            <p>Respuestas directas para consultas largas que traen tráfico más calificado.</p>
            <ul className="bullet-list">
              {answerFirstFaqs.map((item) => (
                <li key={item.slug}>
                  <Link href={`/faq/${item.slug}`}>{item.question}</Link>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </main>
  )
}
