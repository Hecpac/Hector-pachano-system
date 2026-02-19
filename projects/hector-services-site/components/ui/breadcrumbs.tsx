import Link from 'next/link'

type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`}>
              {item.href && !isLast ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
