import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { getAnswerFirstFaqs } from '@/content/faqs/answer-first'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema, faqSchema } from '@/lib/seo/schema'

const generalItems = [
  {
    question: '¿Cuál es el tiempo típico de implementación?',
    answer: 'Un MVP comercial suele estar en 1 a 2 semanas, dependiendo del alcance.'
  },
  {
    question: '¿Puedo comenzar con un solo servicio?',
    answer: 'Sí. Se puede iniciar por automatización, web o SEO/AEO y escalar luego a plan integral.'
  },
  {
    question: '¿Trabajas por proyecto o retainer?',
    answer: 'Ambos modelos son posibles. Se define según prioridad, velocidad y nivel de soporte requerido.'
  }
]

const answerFirstFaqs = getAnswerFirstFaqs()

export const metadata: Metadata = buildPageMetadata({
  title: 'FAQ',
  description: 'Preguntas frecuentes sobre alcance, tiempos y forma de trabajo.',
  path: '/faq'
})

export default function FAQPage() {
  return (
    <main className="page-shell" id="main-content">
      <JsonLd
        data={[
          faqSchema(generalItems),
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'FAQ', path: '/faq' }
          ])
        ]}
      />

      <section className="section section--faq reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'FAQ' }]} />
        <p className="eyebrow">FAQ</p>
        <h1>Preguntas frecuentes</h1>

        <h2>Answer-first (AEO) — consultas de alto intento</h2>
        <p className="lead">
          Estas guías están diseñadas para responder preguntas largas con intención comercial y facilitar descubrimiento en
          buscadores y motores de respuesta con IA.
        </p>

        <ul className="bullet-list">
          {answerFirstFaqs.map((item) => (
            <li key={item.slug}>
              <Link href={`/faq/${item.slug}`}>{item.question}</Link>
            </li>
          ))}
        </ul>

        <h2>FAQ general</h2>
        {generalItems.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </section>
    </main>
  )
}
