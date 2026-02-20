import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getCaseMetaTitle, getCaseStudies, getCaseStudyBySlug } from '@/content/case-studies/cases'
import { CaseCTA } from '@/components/cases/case-cta'
import { CaseChapter } from '@/components/cases/case-chapter'
import { CaseHero } from '@/components/cases/case-hero'
import { CaseResults } from '@/components/cases/case-results'
import { CaseTOCSticky } from '@/components/cases/case-toc-sticky'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { breadcrumbSchema } from '@/lib/seo/schema'
import { SITE_NAME, SITE_URL } from '@/lib/seo/site'

type CasePageProps = {
  params: Promise<{ slug: string }>
}

const tocItems = [
  { id: 'resumen-ejecutivo', label: 'Resumen ejecutivo' },
  { id: 'baseline-objetivo', label: 'Baseline y objetivo' },
  { id: 'estrategia', label: 'Estrategia' },
  { id: 'implementacion', label: 'Implementación' },
  { id: 'resultados', label: 'Resultados' },
  { id: 'aprendizajes', label: 'Aprendizajes' }
]

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    return {
      title: {
        absolute: 'Caso no encontrado'
      },
      description: 'El caso solicitado no está disponible.',
      robots: {
        index: false,
        follow: false
      }
    }
  }

  const title = getCaseMetaTitle(caseStudy)
  const path = `/cases/${caseStudy.slug}`
  const canonical = `${SITE_URL}${path}`
  const ogImagePath = `${path}/opengraph-image`

  return {
    title: {
      absolute: title
    },
    description: caseStudy.metaDescription,
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description: caseStudy.metaDescription,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'es_MX',
      type: 'article',
      images: [ogImagePath]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: caseStudy.metaDescription,
      images: [ogImagePath]
    },
    robots: {
      index: true,
      follow: true
    }
  }
}

export function generateStaticParams() {
  return getCaseStudies().map((caseStudy) => ({ slug: caseStudy.slug }))
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) notFound()

  const caseSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: caseStudy.title,
    description: caseStudy.metaDescription,
    url: `${SITE_URL}/cases/${caseStudy.slug}`,
    author: {
      '@type': 'Person',
      name: SITE_NAME
    },
    keywords: [caseStudy.service, ...caseStudy.contextChips].join(', ')
  }

  return (
    <main className="page-shell page-shell--case" id="main-content">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Casos', path: '/cases' },
            { name: caseStudy.title, path: `/cases/${caseStudy.slug}` }
          ]),
          caseSchema
        ]}
      />

      <article className="case-study">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Casos', href: '/cases' },
            { label: caseStudy.title }
          ]}
        />

        <CaseHero
          service={caseStudy.service}
          title={caseStudy.title}
          oneLiner={caseStudy.oneLiner}
          scoreboard={caseStudy.scoreboard}
          contextChips={caseStudy.contextChips}
        />

        <div className="case-study__layout">
          <CaseTOCSticky items={tocItems} />

          <div className="case-study__content">
            <section className="case-block" id="resumen-ejecutivo">
              <h2>Resumen ejecutivo</h2>
              <div className="case-two-column">
                <article>
                  <h3>Problema real</h3>
                  <ul>
                    {caseStudy.executiveSummary.problem.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article>
                  <h3>La decisión</h3>
                  <p>{caseStudy.executiveSummary.decision}</p>

                  <h3>Entregables</h3>
                  <ul>
                    {caseStudy.executiveSummary.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>

            <section className="case-block" id="baseline-objetivo">
              <h2>Baseline y objetivo</h2>

              <div className="case-baseline-grid">
                <article>
                  <h3>Antes</h3>
                  <ul>
                    {caseStudy.baseline.before.map((item) => (
                      <li key={item.label}>
                        <strong>{item.label}:</strong> {item.value}
                      </li>
                    ))}
                  </ul>
                </article>

                <article>
                  <h3>Objetivo</h3>
                  <p>{caseStudy.baseline.target}</p>
                </article>

                <article>
                  <h3>Restricciones</h3>
                  <ul>
                    {caseStudy.baseline.constraints.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>

            <section className="case-block" id="estrategia">
              <h2>Estrategia</h2>
              <div className="case-diagram" role="img" aria-label={caseStudy.strategy.diagramTitle}>
                {caseStudy.strategy.diagramFlow.map((node) => (
                  <span key={node}>{node}</span>
                ))}
              </div>

              <div className="case-two-column">
                <article>
                  <h3>Principios</h3>
                  <ul>
                    {caseStudy.strategy.principles.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article>
                  <h3>Plan por fases</h3>
                  <ul>
                    {caseStudy.strategy.phases.map((phase) => (
                      <li key={phase.label}>
                        <strong>{phase.label}:</strong> {phase.summary}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>

            <section className="case-block" id="implementacion">
              <h2>Implementación</h2>
              <div className="case-chapter-list">
                {caseStudy.chapters.map((chapter) => (
                  <CaseChapter key={chapter.id} chapter={chapter} />
                ))}
              </div>
            </section>

            <CaseResults
              scoreboard={caseStudy.scoreboard}
              beforeAfter={caseStudy.results.beforeAfter}
              businessImpact={caseStudy.results.businessImpact}
              measurement={caseStudy.results.measurement}
            />

            <section className="case-block" id="aprendizajes">
              <h2>Aprendizajes y siguientes pasos</h2>
              <div className="case-two-column">
                <article>
                  <h3>Lo que aprendimos</h3>
                  <ul>
                    {caseStudy.learnings.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article>
                  <h3>Próximos 30-60 días</h3>
                  <ul>
                    {caseStudy.nextSteps.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>

            <CaseCTA
              title="¿Quieres replicar este sistema en tu negocio?"
              description="Te propongo una arquitectura realista, priorizada por impacto y adaptada a tu operación actual."
            />
          </div>
        </div>
      </article>
    </main>
  )
}
