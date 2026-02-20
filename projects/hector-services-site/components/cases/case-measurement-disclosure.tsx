type CaseMeasurementDisclosureProps = {
  window: string
  sources: string[]
  conversionDefinition?: string
}

export function CaseMeasurementDisclosure({ window, sources, conversionDefinition }: CaseMeasurementDisclosureProps) {
  return (
    <section className="case-measurement" aria-label="Cómo se midió">
      <h3>Cómo se midió</h3>
      <ul>
        <li>
          <strong>Ventana:</strong> {window}
        </li>
        <li>
          <strong>Fuentes:</strong> {sources.join(' · ')}
        </li>
        {conversionDefinition ? (
          <li>
            <strong>Definición de conversión:</strong> {conversionDefinition}
          </li>
        ) : null}
      </ul>
    </section>
  )
}
