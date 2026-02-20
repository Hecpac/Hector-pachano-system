import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema } from '@/lib/seo/schema'

export const metadata: Metadata = buildPageMetadata({
  title: 'About',
  description:
    'Perfil y enfoque de trabajo: ejecución técnica en automatizaciones, web y posicionamiento orgánico.',
  path: '/about'
})

export default function AboutPage() {
  return (
    <main className="page-shell" id="main-content">
      <JsonLd
        data={
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'About', path: '/about' }
          ])
        }
      />

      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'About' }]} />
        <p className="eyebrow">ABOUT</p>
        <h1>Operación técnica con foco en resultados</h1>
        <p className="lead">
          Trabajo como partner de ejecución para equipos que necesitan mover rápido sin sacrificar calidad.
        </p>
        
        <div className="blog-article__content" style={{ marginTop: '2rem' }}>
          <h2>Mi enfoque de trabajo</h2>
          <p>
            Llevo años viendo cómo las empresas gastan miles en diseño o herramientas SaaS, solo para descubrir 
            meses después que los sistemas no se comunican, que el SEO no despega porque la arquitectura técnica 
            es deficiente, o que el diseño "bonito" espanta a los usuarios por tiempos de carga lentos.
          </p>
          <p>
            No me defino solo como un desarrollador o consultor, sino como un <strong>constructor de sistemas digitales</strong>.
            Mi metodología se basa en tres pilares inquebrantables:
          </p>
          <ul className="bullet-list" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
            <li><strong>Desempeño técnico (Performance) como prioridad:</strong> Un sitio que carga al instante retiene al doble de usuarios.</li>
            <li><strong>Automatización inteligente:</strong> Reemplazo el trabajo repetitivo con flujos de datos confiables (n8n, Make, scripts a medida).</li>
            <li><strong>Crecimiento sostenido (SEO/AEO):</strong> Construyo con código semántico, jerarquías lógicas y JSON-LD. Si Google no lo entiende, el usuario tampoco lo hará.</li>
          </ul>

          <h2>Credenciales y experiencia</h2>
          <p>
            He ayudado a escalar infraestructuras web y operativas de startups y empresas B2B en Estados Unidos, Europa y América Latina. 
            Me enfoco en stacks modernos y de alto impacto: <strong>React, Next.js, Node.js, y arquitecturas Serverless</strong>.
          </p>

          <h2 style={{ marginTop: '2rem' }}>¿Por qué trabajar conmigo?</h2>
          <ul className="bullet-list" style={{ marginBottom: '2rem' }}>
            <li><strong>Comunicación directa:</strong> Sin intermediarios, sin gestores de cuenta. Hablas directamente con quien ejecuta.</li>
            <li><strong>Entregables claros:</strong> Roadmaps cortos (generalmente ciclos de 1-3 semanas) con impacto medible inmediato.</li>
            <li><strong>Integración total:</strong> No trato el diseño, el desarrollo y el SEO como departamentos aislados, sino como un solo producto.</li>
          </ul>
          
          <div style={{ marginTop: '3rem' }}>
            <Link href="/contact" className="button">Agenda un diagnóstico</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
