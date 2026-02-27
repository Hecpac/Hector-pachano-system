import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getAnswerFirstFaqBySlug, getAnswerFirstFaqs } from '@/content/faqs/answer-first'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buildPageMetadata } from '@/lib/seo/meta'

type FAQPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: FAQPageProps): Promise<Metadata> {
  const { slug } = await params
  const item = getAnswerFirstFaqBySlug(slug)

  if (!item) {
    return buildPageMetadata({
      title: 'FAQ not found',
      description: 'Requested FAQ is not available.',
      path: `/en/faq/${slug}`,
      noindex: true
    })
  }

  return buildPageMetadata({
    title: item.title,
    description: item.description,
    path: `/en/faq/${item.slug}`
  })
}

export function generateStaticParams() {
  return getAnswerFirstFaqs().map((item) => ({ slug: item.slug }))
}

export default async function FAQPageEn({ params }: FAQPageProps) {
  const { slug } = await params
  const item = getAnswerFirstFaqBySlug(slug)
  if (!item) notFound()

  return (
    <main className="page-shell" id="main-content" lang="en">
      <section className="section section--faq reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/en' },
            { label: 'FAQ', href: '/en/faq' },
            { label: item.question }
          ]}
        />
        <p className="eyebrow">FAQ</p>
        <h1>{item.question}</h1>
        <p className="lead">{item.shortAnswer}</p>
        <p>
          If you want this FAQ fully localized, we can publish a complete EN editorial version as next step.
        </p>
        <p>
          <Link href={`/faq/${item.slug}`} className="service-link">
            Open Spanish version →
          </Link>
        </p>
      </section>
    </main>
  )
}
