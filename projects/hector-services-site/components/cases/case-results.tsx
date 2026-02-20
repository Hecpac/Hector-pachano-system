import type { CaseMetric, CaseTableRow } from '@/content/case-studies/cases'

import { CaseMeasurementDisclosure } from './case-measurement-disclosure'
import { CaseScoreboard } from './case-scoreboard'

type CaseResultsProps = {
  scoreboard: CaseMetric[]
  beforeAfter: CaseTableRow[]
  businessImpact: string
  measurement: {
    window: string
    sources: string[]
    conversionDefinition?: string
  }
}

export function CaseResults({ scoreboard, beforeAfter, businessImpact, measurement }: CaseResultsProps) {
  return (
    <section className="case-results" id="resultados" aria-labelledby="resultados-title">
      <h2 id="resultados-title">Resultados</h2>
      <CaseScoreboard items={scoreboard} title="Scoreboard final" />

      <div className="case-results__table-wrap">
        <table>
          <caption className="sr-only">Antes y después del caso</caption>
          <thead>
            <tr>
              <th scope="col">KPI</th>
              <th scope="col">Antes</th>
              <th scope="col">Después</th>
            </tr>
          </thead>
          <tbody>
            {beforeAfter.map((row) => (
              <tr key={row.kpi}>
                <th scope="row">{row.kpi}</th>
                <td>{row.before}</td>
                <td>{row.after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="case-results__impact">{businessImpact}</p>

      <CaseMeasurementDisclosure
        window={measurement.window}
        sources={measurement.sources}
        conversionDefinition={measurement.conversionDefinition}
      />
    </section>
  )
}
