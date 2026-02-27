import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema, serviceSchema } from '@/lib/seo/schema'

const title = 'SEO y AEO para Empresas B2B'
const description =
  'SEO + AEO para B2B: intención comercial, landings answer-first + schema y contenido citable para IA. Aumenta clicks cualificados, CTR y leads orgánicos medibles.'
const path = '/services/seo-aeo'

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path
})

export default function SeoAeoPage() {
  return (
    <main className="page-shell" id="main-content">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Servicios', path: '/services' },
            { name: title, path }
          ]),
          serviceSchema({
            name: title,
            description,
            path,
            offers: [
              'Technical SEO e indexación',
              'Estrategia de contenidos por intención',
              'Optimización AEO para respuestas de IA'
            ]
          })
        ]}
      />

      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Servicios', href: '/services' },
            { label: title }
          ]}
        />
        <p className="eyebrow">SERVICIO</p>
        <h1>{title}</h1>
        <p className="lead">
          Posicionamos tu marca para capturar demanda orgánica en Google y en sistemas de respuestas con IA.
        </p>

        <h2>Para quién es / para quién no</h2>
        <div className="service-grid">
          <article className="service-card">
            <h3>Ideal para</h3>
            <ul className="bullet-list">
              <li>Empresas B2B con autoridad técnica, pero baja visibilidad de intención.</li>
              <li>Equipos que necesitan que SEO contribuya a pipeline, no solo tráfico.</li>
              <li>Marcas que quieren ser más citables en respuestas de IA.</li>
            </ul>
          </article>
          <article className="service-card">
            <h3>No es ideal si</h3>
            <ul className="bullet-list">
              <li>No existe capacidad mínima de publicación o actualización de páginas.</li>
              <li>Se esperan resultados sin alinear oferta y mensaje comercial.</li>
              <li>No habrá seguimiento de métricas de negocio.</li>
            </ul>
          </article>
        </div>

        <h2>Entregables exactos</h2>
        <ul className="bullet-list">
          <li>Auditoría técnica SEO (indexación, arquitectura, rendimiento).</li>
          <li>Mapa de intención y priorización de páginas por impacto comercial.</li>
          <li>Bloques answer-first + schema en landings clave.</li>
          <li>Backlog editorial accionable por clusters.</li>
          <li>Dashboard de queries, CTR y conversión.</li>
        </ul>

        <h2>Proceso resumido (5 pasos)</h2>
        <ul className="bullet-list">
          <li>1) Diagnóstico técnico y de intención comercial.</li>
          <li>2) Reestructura de páginas prioritarias.</li>
          <li>3) Implementación de contenido citable + schema.</li>
          <li>4) Iteración por datos de Search Console y conversión.</li>
          <li>5) Escalado editorial con control de canibalización.</li>
        </ul>

        <h2>Métricas objetivo</h2>
        <ul className="bullet-list">
          <li>Clicks cualificados por query de intención.</li>
          <li>Queries en top 10 por servicio.</li>
          <li>CTR en páginas de servicio.</li>
          <li>Leads orgánicos y activación de CTA.</li>
        </ul>

        <h2>Objeciones frecuentes</h2>
        <details>
          <summary>“¿SEO todavía funciona con IA?”</summary>
          <p>Sí: SEO + AEO hoy se complementan. La clave es estructura + contenido útil + señales de autoridad.</p>
        </details>
        <details>
          <summary>“¿Cuánto tarda?”</summary>
          <p>Las primeras señales aparecen en semanas; la consolidación suele verse en ciclos de 8-12 semanas.</p>
        </details>

        <h2>Mini caso relacionado</h2>
        <p>
          Caso aplicado: <strong>+123% tráfico orgánico</strong>, <strong>+71% clicks cualificados</strong> y{' '}
          <strong>+44% queries top 10</strong>.
        </p>
        <p>
          <Link href="/cases/visibilidad-organica-aeo">Ver caso completo de SEO/AEO →</Link>
        </p>
      </section>
    </main>
  )
}
