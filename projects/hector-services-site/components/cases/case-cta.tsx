import Link from 'next/link'

type CaseCTAProps = {
  title: string
  description: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export function CaseCTA({
  title,
  description,
  primaryLabel = 'Agenda diagnóstico',
  primaryHref = '/contact',
  secondaryLabel = 'Ver todos los casos',
  secondaryHref = '/cases'
}: CaseCTAProps) {
  return (
    <section className="case-final-cta" aria-labelledby="case-final-cta-title">
      <h2 id="case-final-cta-title">{title}</h2>
      <p>{description}</p>

      <div className="case-final-cta__actions">
        <Link href={primaryHref} className="btn-primary">
          {primaryLabel}
        </Link>
        <Link href={secondaryHref} className="btn-secondary">
          {secondaryLabel}
        </Link>
      </div>
    </section>
  )
}
