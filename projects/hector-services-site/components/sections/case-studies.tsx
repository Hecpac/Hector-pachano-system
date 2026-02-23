import Image from 'next/image'
import Link from 'next/link'

import { caseStudies } from '@/content/case-studies/cases'

export function CaseStudiesSection() {
  return (
    <section className="section reveal-on-scroll cinematic-panel" id="casos">
      <div className="case-grid__header">
        <h2 className="eyebrow">CASOS</h2>
        <Link href="/cases" className="case-grid__all-link" aria-label="Ver todos los casos">
          Ver todos
        </Link>
      </div>

      <div className="case-grid stagger-fade-in">
        {caseStudies.map((item) => (
          <Link
            key={item.id}
            href={`/cases/${item.slug}`}
            className={`case-card ${item.featured ? 'case-card--wide' : ''}`}
          >
            <Image src={item.image} alt={item.alt} width={1600} height={1000} />
            <div className="case-card__meta">
              <p className="case-card__service">{item.service}</p>
              <h3>{item.title}</h3>
              <p className="case-card__metric">{item.metric}</p>
              <p className="case-card__detail">{item.detail}</p>
              <p className="case-card__cta">Abrir caso →</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
