type AnnotationArrowProps = {
  label: string
  direction?: 'left' | 'right'
}

const ARROW_PATH = 'M2 24 C20 7 39 7 54 18 L48 14 L54 18 L47 22'

export function AnnotationArrow({ label, direction = 'right' }: AnnotationArrowProps) {
  return (
    <span className={`annotation-arrow${direction === 'left' ? ' annotation-arrow--left' : ''}`} aria-hidden="true">
      <svg width="60" height="30" viewBox="0 0 60 30" role="presentation" focusable="false">
        <path d={ARROW_PATH} />
      </svg>
      <span className="annotation-arrow__label">{label}</span>
    </span>
  )
}
