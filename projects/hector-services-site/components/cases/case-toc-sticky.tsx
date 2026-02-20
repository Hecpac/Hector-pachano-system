type TocItem = {
  id: string
  label: string
}

type CaseTOCStickyProps = {
  items: TocItem[]
}

export function CaseTOCSticky({ items }: CaseTOCStickyProps) {
  return (
    <nav className="case-toc" aria-label="Tabla de contenido del caso">
      <p className="case-toc__title">Contenido</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
