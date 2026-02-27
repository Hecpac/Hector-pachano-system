import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo/schema'

const title = 'Web Performance Next.js B2B: INP, LCP y conversión'
const path = '/services/web-performance-nextjs'
const description =
  'Web Performance Next.js para B2B: baseline CWV, fixes de INP/LCP y optimización de UX comercial. Mejora CTR de CTA y tasa de formularios con medición real.'

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
        <p className="lead">Mejoramos velocidad y UX comercial para que tu tráfico actual convierta mejor sin subir gasto publicitario.</p>

        <ul className="bullet-list">
          <li><strong>Para quién:</strong> equipos con web lenta o fricción móvil en el embudo.</li>
          <li><strong>Qué incluye:</strong> baseline CWV, refactor, estrategia de assets y fixes de interacción.</li>
          <li><strong>Prueba:</strong> +38% conversion rate y mejora de LCP móvil en caso real.</li>
        </ul>

        <div className="money-hero-actions">
          <Link href="/auditor" className="button">
            Agenda diagnóstico
          </Link>
          <Link href="/cases/landing-alta-conversion" className="button button--ghost">
            Ver caso
          </Link>
        </div>

        <h2>Tabla de entregables</h2>
        <div className="money-table-wrap">
          <table className="money-table">
            <thead>
              <tr>
                <th>Entregable</th>
                <th>Qué resuelve</th>
                <th>Cómo se mide (KPI)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Baseline técnico + mapa de fricción</td>
                <td>Detecta cuellos de botella reales del embudo.</td>
                <td>LCP/INP/CLS + drop-off por sección.</td>
              </tr>
              <tr>
                <td>Optimización de assets y render</td>
                <td>Reduce latencia percibida y bloqueo de interacción.</td>
                <td>INP móvil + tiempo interactivo.</td>
              </tr>
              <tr>
                <td>Ajuste de CTA y flujo</td>
                <td>Mejora avance comercial del tráfico existente.</td>
                <td>CTR de CTA + tasa de formulario.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Proceso (5 pasos)</h2>
        <ul className="bullet-list">
          <li>Semana 1: auditoría de rendimiento y UX comercial.</li>
          <li>Semana 2: plan de optimización priorizado por impacto.</li>
          <li>Semana 3: implementación técnica (render, assets, scripts).</li>
          <li>Semana 4: ajustes de copy/CTA y pruebas de flujo.</li>
          <li>Semana 5+: iteración por métricas y cierre de fricción.</li>
        </ul>

        <h2>Caso relacionado</h2>
        <p>
          Problema: web pesada y baja conversión. Intervención: optimización técnica + narrativa + CTA. Resultado:{' '}
          <strong>+38% conversion rate</strong>, <strong>LCP 3.9s → 2.3s</strong>, <strong>+29% CTR principal</strong>.
        </p>
        <p>
          <Link href="/cases/landing-alta-conversion">Ver caso completo →</Link>
        </p>

        <h2>Objeciones frecuentes</h2>
        {faqs.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}

        <h2>Señales de confianza</h2>
        <ul className="bullet-list">
          <li>Validación por métricas técnicas y comerciales en paralelo.</li>
          <li>Stack Next.js performance-first con control de regresiones.</li>
          <li>Qué NO hacemos: optimizar score sin impacto en conversión.</li>
        </ul>

        <section className="money-final-cta">
          <h2>¿Quieres una web más rápida que convierta más?</h2>
          <p>Respuesta en menos de 24h. Sin spam. Te damos plan técnico-comercial accionable.</p>
          <Link href="/auditor" className="service-link">
            Solicitar auditoría de rendimiento →
          </Link>
        </section>
      </section>
    </main>
  )
}
