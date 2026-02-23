import { approvalLabels, pendingApprovals } from "@/lib/seed";

export default function ApprovalsPage() {
  return (
    <section className="page">
      <header className="page-header">
        <p className="eyebrow">Control</p>
        <h2>Aprobaciones pendientes</h2>
      </header>

      <ul className="stack-list">
        {pendingApprovals.map((item) => (
          <li key={item.id} className="list-row rise-in">
            <div>
              <p className="item-title">{item.request}</p>
              <p className="item-meta">
                {item.project} | {item.requestedBy} | Due {item.due}
              </p>
            </div>
            <span className={`badge badge-${item.status}`}>{approvalLabels[item.status]}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
