import Image from 'next/image'

import { caseStudies } from '@/content/case-studies/cases'

export function CaseStudiesSection() {
  return (
    <section className="section reveal-on-scroll" id="casos">
      <p className="eyebrow">CASOS</p>
      <div className="case-grid stagger-fade-in">
        {caseStudies.map((item) => (
          <article key={item.id} className={`case-card ${item.featured ? 'case-card--wide' : ''}`}>
            <Image src={item.image} alt={item.alt} width={1600} height={1000} />
            <div className="case-card__meta">
              <p className="case-card__service">{item.service}</p>
              <h3>{item.title}</h3>
              <p className="case-card__metric">{item.metric}</p>
              <p className="case-card__detail">{item.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
