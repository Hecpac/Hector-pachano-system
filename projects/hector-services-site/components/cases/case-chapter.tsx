import type { CaseChapter as CaseChapterType } from '@/content/case-studies/cases'

type CaseChapterProps = {
  chapter: CaseChapterType
}

export function CaseChapter({ chapter }: CaseChapterProps) {
  return (
    <article className="case-chapter" id={chapter.id}>
      <h3>{chapter.title}</h3>

      <div className="case-chapter__stack">
        <div>
          <h4>Qué cambiamos</h4>
          <p>{chapter.what}</p>
        </div>

        <div>
          <h4>Por qué</h4>
          <p>{chapter.why}</p>
        </div>

        <div>
          <h4>Cómo se implementó</h4>
          <ul>
            {chapter.implementation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Prueba</h4>
          <p>{chapter.proof}</p>
        </div>
      </div>
    </article>
  )
}
