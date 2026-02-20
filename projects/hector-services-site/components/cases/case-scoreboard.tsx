import type { CaseMetric } from '@/content/case-studies/cases'

type CaseScoreboardProps = {
  items: CaseMetric[]
  title?: string
  compact?: boolean
}

export function CaseScoreboard({ items, title = 'Resultados', compact = false }: CaseScoreboardProps) {
  return (
    <section className={`case-scoreboard${compact ? ' case-scoreboard--compact' : ''}`} aria-label={title}>
      <p className="case-scoreboard__label">{title}</p>
      <ul>
        {items.map((item) => (
          <li key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </li>
        ))}
      </ul>
    </section>
  )
}
