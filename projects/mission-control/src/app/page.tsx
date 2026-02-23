import { priorities } from "@/lib/seed";

export default function DashboardPage() {
  return (
    <section className="page">
      <header className="page-header">
        <p className="eyebrow">Resumen diario</p>
        <h2>Prioridades activas</h2>
      </header>

      <div className="card-grid">
        {priorities.map((item) => (
          <article key={item.project} className="card rise-in">
            <div className="card-top">
              <h3>{item.project}</h3>
              <span className={`chip chip-${item.risk}`}>Riesgo {item.risk}</span>
            </div>
            <p className="card-focus">{item.focus}</p>
            <p className="card-meta">Owner: {item.owner}</p>
            <p className="card-meta">Siguiente: {item.nextStep}</p>
            <p className="card-meta">Due: {item.due}</p>
            <div className="progress-track" aria-label={`progreso ${item.project}`}>
              <span className="progress-fill" style={{ width: `${item.progress}%` }} />
            </div>
            <p className="card-meta">{item.progress}% completado</p>
          </article>
        ))}
      </div>
    </section>
  );
}
