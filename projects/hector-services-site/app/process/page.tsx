import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema } from '@/lib/seo/schema'

const path = '/process'

export const metadata: Metadata = buildPageMetadata({
  title: 'Proceso',
  description: 'Cómo ejecutamos sistemas digitales en 5 pasos: diagnóstico, diseño, implementación, validación y mejora.',
  path
})

const steps = [
  {
    title: '1) Diagnóstico',
    detail: 'Alineamos objetivo comercial, fricciones actuales y métricas base.'
  },
  {
    title: '2) Diseño de sistema',
    detail: 'Definimos arquitectura de páginas, flujos y decisiones técnicas por impacto.'
  },
  {
    title: '3) Implementación',
    detail: 'Construimos en fases con entregables funcionales desde semana 1.'
  },
  {
    title: '4) Validación',
    detail: 'Medimos rendimiento, conversiones y estabilidad operativa con evidencia real.'
  },
  {
    title: '5) Optimización continua',
    detail: 'Priorizamos backlog P0/P1 para mantener crecimiento y reducir fricción.'
  }
]

export default function ProcessPage() {
  return (
    <main className="page-shell" id="main-content">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', path: '/' },
          { name: 'Proceso', path }
        ])}
      />

      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Proceso' }]} />
        <p className="eyebrow">PROCESO</p>
        <h1>Sistema de ejecución en 5 pasos</h1>
        <p className="lead">Diseñado para mover negocio, no solo para entregar piezas sueltas.</p>

        <ul className="bullet-list">
          {steps.map((step) => (
            <li key={step.title}>
              <strong>{step.title}</strong>: {step.detail}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
