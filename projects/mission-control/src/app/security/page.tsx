import { securityGuardrails } from "@/lib/seed";

export default function SecurityPage() {
  return (
    <section className="page">
      <header className="page-header">
        <p className="eyebrow">Privado</p>
        <h2>Guardrails locales</h2>
      </header>

      <ul className="stack-list">
        {securityGuardrails.map((item) => (
          <li key={item.id} className="list-row rise-in">
            <div>
              <p className="item-title">{item.title}</p>
              <p className="item-meta">{item.detail}</p>
            </div>
            <span className={item.done ? "check-state check-done" : "check-state check-open"}>
              {item.done ? "[x]" : "[ ]"}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
