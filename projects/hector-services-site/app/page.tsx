import { submitLeadAction } from './actions'

import { CaseStudiesSection } from '@/components/sections/case-studies'
import { LeadForm } from '@/components/sections/lead-form'

const services = [
  {
    id: '01',
    title: 'Automatizaciones',
    description: 'Reducimos tareas manuales con flujos y APIs para que tu operación escale sin fricción.',
    result: 'Menos tiempo operativo, más foco en ventas.'
  },
  {
    id: '02',
    title: 'Diseño Web',
    description: 'Sitios rápidos y con diseño editorial que convierten visitas en oportunidades reales.',
    result: 'Más confianza y mejor tasa de conversión.'
  },
  {
    id: '03',
    title: 'SEO / AEO',
    description: 'Posicionamiento orgánico y optimización para motores de búsqueda y respuestas de IA.',
    result: 'Tráfico constante sin depender solo de anuncios.'
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

export default function HomePage() {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK || 'https://cal.com'

  return (
    <main className="page-shell">
      <header className="top-nav">
        <span className="eyebrow">HECTOR // DIGITAL SYSTEMS</span>
        <a href="#contact" className="button button--small">
          Agenda diagnóstico
        </a>
      </header>

      <section className="hero section" id="top">
        <p className="eyebrow">AUTOMATIZACIONES · DISEÑO WEB · SEO/AEO</p>
        <h1>Design. Automate. Rank.</h1>
        <p className="lead">
          Construyo sistemas digitales que generan ingresos: web de alto rendimiento, procesos automáticos
          y posicionamiento estratégico.
        </p>
        <div className="hero-cta">
          <a href="#contact" className="button">
            Agenda diagnóstico
          </a>
          <a href="#casos" className="button button--ghost">
            Ver casos
          </a>
        </div>
      </section>

      <section className="section" id="services">
        <p className="eyebrow">SERVICIOS</p>
        <div className="service-grid">
          {services.map((service) => (
            <article key={service.id} className="service-card">
              <p className="service-id">{service.id}</p>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <p className="service-result">{service.result}</p>
            </article>
          ))}
        </div>
      </section>

      <CaseStudiesSection />

      <section className="section" id="process">
        <p className="eyebrow">PROCESO</p>
        <ol className="process-list">
          <li>Diagnóstico</li>
          <li>Implementación</li>
          <li>Optimización</li>
          <li>Escalado</li>
        </ol>
      </section>

      <section className="section section--faq" id="faq">
        <p className="eyebrow">FAQ</p>
        {faqItems.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </section>

      <section className="section cta" id="contact">
        <h2>¿Listo para dejar de improvisar tu presencia digital?</h2>
        <p className="lead lead--center">
          Cuéntame tu objetivo y te propongo un plan claro con alcance, tiempos e inversión.
        </p>
        <LeadForm action={submitLeadAction} calLink={calLink} />
      </section>
    </main>
  )
}
