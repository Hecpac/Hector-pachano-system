import type { Metadata } from 'next'

import { submitAuditorAction } from '@/app/actions'
import { WebAuditorForm } from '@/components/sections/web-auditor'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema } from '@/lib/seo/schema'

export const metadata: Metadata = buildPageMetadata({
  title: 'Auditor IA para Webs B2B',
  description:
    'Ingresa la URL de tu sitio web y recibe un diagnóstico IA gratuito sobre rendimiento, SEO, accesibilidad y capacidad de conversión.',
  path: '/auditor'
})

export default function WebAuditorPage() {
  return (
    <main className="page-shell" id="main-content">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', path: '/' },
          { name: 'Auditor IA', path: '/auditor' }
        ])}
      />

      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Auditor IA' }]} />
        <p className="eyebrow">DIAGNÓSTICO IA</p>
        <h1>Descubre por qué tu web no convierte como debería</h1>
        <p className="lead">
          La mayoría de sitios B2B pierden leads por tiempos de carga lentos, falta de optimización
          AEO o fallos estructurales en móviles. Haz nuestro test gratuito y descubre qué falla.
        </p>

        <div className="stagger-fade-in" style={{ marginTop: '2rem' }}>
          <WebAuditorForm action={submitAuditorAction} />
        </div>
      </section>

      <section className="section reveal-on-scroll cinematic-panel">
        <h2>¿Qué analizamos exactamente?</h2>
        <div className="service-grid stagger-fade-in">
          <article className="service-card">
            <h2>Velocidad y Core Web Vitals</h2>
            <p>Un sitio que tarda más de 2.5 segundos pierde hasta un 40% de conversiones. Analizamos tu TTFB, LCP y fallos de renderizado.</p>
          </article>
          <article className="service-card">
            <h2>AEO y Respuesta de IA</h2>
            <p>Verificamos si tu contenido está semánticamente preparado (schemas JSON-LD) para que Gemini o ChatGPT te citen como fuente técnica.</p>
          </article>
          <article className="service-card">
            <h2>Conversión y Fricción</h2>
            <p>Auditoría visual de tus formularios, tiempos de respuesta, barreras de accesibilidad móvil y diseño B2B defectuoso.</p>
          </article>
        </div>
      </section>
    </main>
  )
}
