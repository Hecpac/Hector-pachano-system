import { agentConfig } from "@/lib/seed";

export default function AgentsPage() {
  return (
    <section className="page">
      <header className="page-header">
        <p className="eyebrow">Router</p>
        <h2>Brain + Muscles</h2>
      </header>

      <article className="card rise-in">
        <h3>Brain model</h3>
        <p className="card-meta">Modelo: {agentConfig.brain.model}</p>
        <p className="card-meta">Fallback: {agentConfig.brain.fallback}</p>
        <p className="card-meta">Modo: {agentConfig.brain.mode}</p>
        <p className="card-focus">{agentConfig.brain.notes}</p>
      </article>

      <section className="muscle-grid">
        {agentConfig.muscles.map((muscle) => (
          <article key={muscle.id} className="card rise-in">
            <h3>{muscle.name}</h3>
            <p className="card-meta">Proveedor: {muscle.provider}</p>
            <p className="card-meta">Uso: {muscle.purpose}</p>
            <span className="badge badge-aprobado">{muscle.status}</span>
          </article>
        ))}
      </section>
    </section>
  );
}
