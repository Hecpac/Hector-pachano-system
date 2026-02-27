import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getAnswerFirstFaqBySlug, getAnswerFirstFaqs } from '@/content/faqs/answer-first'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { faqEn } from '@/app/en/content'
import { buildPageMetadata } from '@/lib/seo/meta'

type FAQPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: FAQPageProps): Promise<Metadata> {
  const { slug } = await params
  const item = getAnswerFirstFaqBySlug(slug)
  const t = faqEn[slug]

  if (!item) {
    return buildPageMetadata({
      title: 'FAQ not found',
      description: 'Requested FAQ is not available.',
      path: `/en/faq/${slug}`,
      noindex: true
    })
  }

  return buildPageMetadata({
    title: t?.question ?? item.title,
    description: t?.answer ?? item.description,
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

  const t = faqEn[item.slug]

  return (
    <main className="page-shell" id="main-content" lang="en">
      <section className="section section--faq reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/en' },
            { label: 'FAQ', href: '/en/faq' },
            { label: t?.question ?? item.question }
          ]}
        />
        <p className="eyebrow">FAQ</p>
        <h1>{t?.question ?? item.question}</h1>
        <p className="lead">{t?.answer ?? item.shortAnswer}</p>

        <h2>Service context</h2>
        <p>
          This FAQ is part of our B2B growth framework combining Web, Automations and SEO/AEO.
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
