import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getCaseStudies, getCaseStudyBySlug } from '@/content/case-studies/cases'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { caseEn } from '@/app/en/content'
import { buildPageMetadata } from '@/lib/seo/meta'

type CasePageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)
  const t = caseEn[slug]

  if (!caseStudy) {
    return buildPageMetadata({
      title: 'Case not found',
      description: 'Requested case study is not available.',
      path: `/en/cases/${slug}`,
      noindex: true
    })
  }

  return buildPageMetadata({
    title: t?.title ?? caseStudy.title,
    description: t?.summary ?? caseStudy.metaDescription,
    path: `/en/cases/${caseStudy.slug}`
  })
}

export function generateStaticParams() {
  return getCaseStudies().map((caseStudy) => ({ slug: caseStudy.slug }))
}

export default async function CasePageEn({ params }: CasePageProps) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)
  if (!caseStudy) notFound()

  const t = caseEn[caseStudy.slug]

  return (
    <main className="page-shell page-shell--cases" id="main-content" lang="en">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/en' },
            { label: 'Case studies', href: '/en/cases' },
            { label: t?.title ?? caseStudy.title }
          ]}
        />
        <p className="eyebrow">CASE STUDY</p>
        <h1>{t?.title ?? caseStudy.title}</h1>
        <p className="lead">{t?.summary ?? caseStudy.detail}</p>

        <h2>Outcome</h2>
        <p>{t?.metric ?? caseStudy.metric}</p>

        {t?.highlights?.length ? (
          <>
            <h2>Highlights</h2>
            <ul>
              {t.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        ) : null}

        <h2>Source version</h2>
        <p>
          Full case narrative in Spanish:
          {' '}
          <Link href={`/cases/${caseStudy.slug}`} className="service-link">
            open original case →
          </Link>
        </p>
      </section>
    </main>
  )
}
