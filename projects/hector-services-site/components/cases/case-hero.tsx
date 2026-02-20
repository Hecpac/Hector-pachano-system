import Link from 'next/link'

import type { CaseMetric } from '@/content/case-studies/cases'

import { CaseContextChips } from './case-context-chips'
import { CaseScoreboard } from './case-scoreboard'

type CaseHeroProps = {
  service: string
  title: string
  oneLiner: string
  scoreboard: CaseMetric[]
  contextChips: string[]
}

export function CaseHero({ service, title, oneLiner, scoreboard, contextChips }: CaseHeroProps) {
  return (
    <header className="case-hero">
      <div className="case-hero__main">
        <p className="eyebrow">{service}</p>
        <h1>{title}</h1>
        <p className="case-hero__one-liner">{oneLiner}</p>
        <CaseContextChips items={contextChips} />

        <div className="case-hero__actions">
          <Link href="/contact" className="btn-primary">
            Agenda diagnóstico
          </Link>
          <a href="#implementacion" className="btn-secondary">
            Ver implementación
          </a>
        </div>
      </div>

      <div className="case-hero__scoreboard">
        <CaseScoreboard items={scoreboard} title="Resultados clave" compact />
      </div>
    </header>
  )
}
