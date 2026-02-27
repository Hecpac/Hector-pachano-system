import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema, serviceSchema } from '@/lib/seo/schema'

const title = 'Diseño Web de Alto Rendimiento para Empresas B2B'
const description =
  'Diseño web B2B performance-first: narrativa comercial, UX/UI de conversión y Next.js. Mejora LCP/INP, CTR de CTA y tasa de formularios con medición real.'
const path = '/services/diseno-web'

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path
})

export default function DisenoWebPage() {
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
              'Arquitectura de contenido y UX comercial',
              'Implementación Next.js performance-first',
              'Optimización de conversión y CTAs'
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
          Construimos sitios que comunican autoridad y convierten visitas en oportunidades reales.
        </p>

        <h2>Para quién es / para quién no</h2>
        <div className="service-grid">
          <article className="service-card">
            <h3>Ideal para</h3>
            <ul className="bullet-list">
              <li>Equipos B2B que reciben tráfico, pero convierten poco.</li>
              <li>Marcas con propuesta fuerte y web débil/compleja.</li>
              <li>Empresas que quieren performance real + claridad comercial.</li>
            </ul>
          </article>
          <article className="service-card">
            <h3>No es ideal si</h3>
            <ul className="bullet-list">
              <li>Solo buscas “rediseño visual” sin objetivos de negocio.</li>
              <li>No habrá capacidad interna para responder leads.</li>
              <li>Esperas resultados sin medición ni iteración.</li>
            </ul>
          </article>
        </div>

        <h2>Entregables exactos</h2>
        <ul className="bullet-list">
          <li>Arquitectura de contenido por intención de compra.</li>
          <li>Diseño UX/UI orientado a conversión y lectura.</li>
          <li>Implementación Next.js performance-first.</li>
          <li>Tracking de eventos clave y CTAs.</li>
          <li>Checklist técnico de salida (SEO base + CWV + accesibilidad).</li>
        </ul>

        <h2>Proceso resumido (5 pasos)</h2>
        <ul className="bullet-list">
          <li>1) Diagnóstico de embudo, mensajes y fricción.</li>
          <li>2) Estructura de página y narrativa de decisión.</li>
          <li>3) Diseño visual con jerarquía comercial.</li>
          <li>4) Desarrollo y optimización técnica.</li>
          <li>5) Validación con métricas de conversión.</li>
        </ul>

        <h2>Métricas objetivo</h2>
        <ul className="bullet-list">
          <li>Conversion rate por landing.</li>
          <li>LCP e INP en móvil.</li>
          <li>CTR de CTA principal.</li>
          <li>Tasa de finalización de formulario.</li>
        </ul>

        <h2>Objeciones frecuentes</h2>
        <details>
          <summary>“¿Y si ya tengo sitio?”</summary>
          <p>No se reemplaza todo por defecto; priorizamos páginas críticas para acelerar impacto.</p>
        </details>
        <details>
          <summary>“¿Cuánto tarda en verse resultado?”</summary>
          <p>Las primeras señales de conversión suelen mejorar desde las primeras semanas con iteraciones de CTA/copy.</p>
        </details>

        <h2>Mini caso relacionado</h2>
        <p>
          Caso aplicado: <strong>+38% conversion rate</strong>, <strong>LCP móvil de 3.9s a 2.3s</strong> y{' '}
          <strong>+29% CTR en CTA principal</strong>.
        </p>
        <p>
          <Link href="/cases/landing-alta-conversion">Ver caso completo de diseño web →</Link>
        </p>
      </section>
    </main>
  )
}
