type CaseContextChipsProps = {
  items: string[]
}

export function CaseContextChips({ items }: CaseContextChipsProps) {
  return (
    <ul className="case-context-chips" aria-label="Contexto del caso">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
