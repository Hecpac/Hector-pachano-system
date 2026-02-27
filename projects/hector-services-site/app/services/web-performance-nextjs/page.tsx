import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo/schema'

const title = 'Web Performance con Next.js para conversiones B2B'
const path = '/services/web-performance-nextjs'
const description =
  'Optimización de rendimiento en Next.js con foco en conversión: CWV, arquitectura de contenido y UX comercial.'

const faqs = [
  {
    question: '¿Qué métricas son prioridad hoy?',
    answer: 'LCP, INP y CLS en móvil, además de CTR de CTA y completitud de formulario en páginas de alto intento.'
  },
  {
    question: '¿Conviene rediseñar todo para mejorar performance?',
    answer:
      'No siempre. En muchos casos basta con reordenar arquitectura, reducir JS interactivo y optimizar recursos críticos.'
  },
  {
    question: '¿Cómo se conecta performance con ventas?',
    answer:
      'Menor fricción técnica = más tiempo útil en página y más probabilidad de avanzar hacia acciones comerciales.'
  }
]

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path
})

export default function WebPerformanceNextjsPage() {
  return (
    <main className="page-shell" id="main-content">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Servicios', path: '/services' },
            { name: 'Web Performance Next.js', path }
          ]),
          serviceSchema({
            name: title,
            description,
            path,
            offers: ['Diagnóstico CWV', 'Optimización de render y assets', 'UX orientada a conversión']
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Servicios', href: '/services' },
            { label: 'Web Performance Next.js' }
          ]}
        />

        <p className="eyebrow">LANDING DE INTENCIÓN</p>
        <h1>{title}</h1>
        <p className="lead">Mejora de velocidad, interacción y claridad comercial sin sacrificar identidad visual.</p>

        <h2>Qué es / para quién</h2>
        <p>
          Para equipos que ya tienen web activa pero pierden oportunidades por lentitud, fricción de UX o embudos poco
          claros en móvil.
        </p>

        <h2>Cómo lo implementamos</h2>
        <ul className="bullet-list">
          <li>Auditoría técnica de CWV + interacción real en móvil (INP).</li>
          <li>Optimización de recursos críticos y carga no bloqueante.</li>
          <li>Refuerzo de narrativa/CTA para mejorar avance comercial.</li>
        </ul>

        <h2>Qué resultados esperar</h2>
        <p>
          Mejora en experiencia percibida y mayor eficiencia del tráfico actual para convertir más sin aumentar inversión
          publicitaria de inmediato.
        </p>
        <p>
          <Link href="/cases/landing-alta-conversion">Ver caso: +38% conversión y mejor LCP móvil →</Link>
        </p>

        <h2>FAQ rápida</h2>
        {faqs.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}

        <p>
          <Link href="/auditor" className="service-link">
            Solicitar auditoría de rendimiento →
          </Link>
        </p>
      </section>
    </main>
  )
}
