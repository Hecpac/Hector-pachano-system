import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getCaseStudies, getCaseStudyBySlug } from '@/content/case-studies/cases'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buildPageMetadata } from '@/lib/seo/meta'

type CasePageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    return buildPageMetadata({
      title: 'Case not found',
      description: 'Requested case study is not available.',
      path: `/en/cases/${slug}`,
      noindex: true
    })
  }

  return buildPageMetadata({
    title: caseStudy.title,
    description: caseStudy.metaDescription,
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

  return (
    <main className="page-shell page-shell--cases" id="main-content" lang="en">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/en' },
            { label: 'Case studies', href: '/en/cases' },
            { label: caseStudy.title }
          ]}
        />
        <p className="eyebrow">CASE STUDY</p>
        <h1>{caseStudy.title}</h1>
        <p className="lead">{caseStudy.metric}</p>
        <p>
          Full editorial translation is in progress. You can open the Spanish case version here:
        </p>
        <p>
          <Link href={`/cases/${caseStudy.slug}`} className="service-link">
            Open Spanish case →
          </Link>
        </p>
      </section>
    </main>
  )
}
