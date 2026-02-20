import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { getCaseStudies } from '@/content/case-studies/cases'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema } from '@/lib/seo/schema'

export const metadata: Metadata = buildPageMetadata({
  title: 'Casos',
  description: 'Casos de automatizaciones, diseño web y SEO/AEO con método, evidencia y resultados medibles.',
  path: '/cases'
})

export default function CasesPage() {
  const cases = getCaseStudies()

  return (
    <main className="page-shell page-shell--cases" id="main-content">
      <JsonLd
        data={
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Casos', path: '/cases' }
          ])
        }
      />

      <section className="section reveal-on-scroll cinematic-panel is-visible cases-index__hero">
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Casos' }]} />
        <p className="eyebrow">CASOS</p>
        <h1>Case studies con enfoque sistema + evidencia</h1>
        <p className="lead">
          Cada caso sigue el mismo framework: problema real, baseline, estrategia, implementación, resultados y
          método de medición.
        </p>
      </section>

      <section className="section reveal-on-scroll cinematic-panel is-visible cases-index__grid-wrap" aria-label="Listado de casos">
        <div className="cases-index__grid">
          {cases.map((caseStudy) => (
            <article key={caseStudy.id} className={`cases-index-card ${caseStudy.featured ? 'cases-index-card--wide' : ''}`}>
              <Link href={`/cases/${caseStudy.slug}`} aria-label={`Abrir caso ${caseStudy.title}`}>
                <Image src={caseStudy.image} alt={caseStudy.alt} width={1600} height={1000} />
                <div className="cases-index-card__meta">
                  <p className="cases-index-card__service">{caseStudy.service}</p>
                  <h2>{caseStudy.title}</h2>
                  <p className="cases-index-card__metric">{caseStudy.metric}</p>
                  <p className="cases-index-card__detail">{caseStudy.detail}</p>
                  <p className="cases-index-card__open">Ver caso completo →</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
