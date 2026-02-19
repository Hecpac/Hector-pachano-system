import type { Metadata } from 'next'

import { JsonLd } from '@/components/ui/json-ld'
import { faqSchema } from '@/lib/seo/schema'
import { SITE_URL } from '@/lib/seo/site'

const items = [
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

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Preguntas frecuentes sobre alcance, tiempos y forma de trabajo.',
  alternates: {
    canonical: `${SITE_URL}/faq`
  }
}

export default function FAQPage() {
  return (
    <main className="page-shell" id="main-content">
      <JsonLd data={faqSchema(items)} />

      <section className="section section--faq reveal-on-scroll cinematic-panel is-visible">
        <p className="eyebrow">FAQ</p>
        <h1>Preguntas frecuentes</h1>
        {items.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </section>
    </main>
  )
}
