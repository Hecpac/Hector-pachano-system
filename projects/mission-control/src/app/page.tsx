import { getCronStatus } from "@/lib/cron-status";
import { priorities } from "@/lib/seed";

export const dynamic = "force-dynamic";

function formatDate(value: string | null): string {
  if (!value) {
    return "Sin dato";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString("es-ES", {
    dateStyle: "short",
    timeStyle: "short"
  });
}

function formatDuration(value: number | null): string {
  if (value === null) {
    return "Sin dato";
  }

  if (value < 1000) {
    return `${value} ms`;
  }

  return `${(value / 1000).toFixed(1)} s`;
}

export default async function DashboardPage() {
  const cron = await getCronStatus();

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

      <article className="card rise-in cron-card">
        <div className="card-top">
          <h3>Estado cron real</h3>
          <span className="badge badge-en_revision">OpenClaw</span>
        </div>

        {cron.error ? <p className="card-meta cron-error">{cron.error}</p> : null}

        <ul className="stack-list cron-list">
          {cron.jobs.map((job) => (
            <li key={job.name} className="list-row">
              <div>
                <p className="item-title">{job.name}</p>
                <p className="item-meta">Proximo run (nextRunAt): {formatDate(job.nextRunAt)}</p>
                <p className="item-meta">Ultimo estado (lastStatus): {job.lastStatus ?? "Sin dato"}</p>
              </div>
              <div className="cron-meta">
                <p className="item-meta">Duracion (lastDurationMs): {formatDuration(job.lastDurationMs)}</p>
                <p className="item-meta">
                  Estado de delivery (deliveryStatus): {job.deliveryStatus ?? "No reportado"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
