import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { getAnswerFirstFaqBySlug, getAnswerFirstFaqs } from '@/content/faqs/answer-first'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema, faqSchema } from '@/lib/seo/schema'

type FAQDetailPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: FAQDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const item = getAnswerFirstFaqBySlug(slug)

  if (!item) {
    return buildPageMetadata({
      title: 'FAQ no encontrada',
      description: 'La respuesta que buscas no está disponible.',
      path: `/faq/${slug}`,
      noindex: true
    })
  }

  return buildPageMetadata({
    title: item.title,
    description: item.description,
    path: `/faq/${item.slug}`
  })
}

export function generateStaticParams() {
  return getAnswerFirstFaqs().map((item) => ({ slug: item.slug }))
}

export default async function FAQDetailPage({ params }: FAQDetailPageProps) {
  const { slug } = await params
  const item = getAnswerFirstFaqBySlug(slug)

  if (!item) notFound()

  return (
    <main className="page-shell" id="main-content">
      <JsonLd
        data={[
          faqSchema([
            {
              question: item.question,
              answer: item.shortAnswer
            }
          ]),
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'FAQ', path: '/faq' },
            { name: item.title, path: `/faq/${item.slug}` }
          ])
        ]}
      />

      <section className="section section--faq reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'FAQ', href: '/faq' },
            { label: item.title }
          ]}
        />
        <p className="eyebrow">ANSWER-FIRST FAQ</p>
        <h1>{item.question}</h1>

        <h2>Respuesta corta</h2>
        <p className="lead">{item.shortAnswer}</p>

        <h2>Cómo lo ejecutamos</h2>
        <ul className="bullet-list">
          {item.process.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>

        <h2>Pruebas y resultados (E-E-A-T)</h2>
        <ul className="bullet-list">
          {item.proof.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <h2>Caso relacionado</h2>
        <p>
          <Link href={item.relatedCase.href}>
            {item.relatedCase.title} ({item.relatedCase.metric})
          </Link>
        </p>

        <p>
          <Link href={item.ctaHref} className="service-link">
            {item.ctaLabel} →
          </Link>
        </p>
      </section>
    </main>
  )
}
