import { boardLanes, projects, tasks } from "@/lib/seed";

export default function TasksPage() {
  return (
    <section className="page">
      <header className="page-header">
        <p className="eyebrow">Operacion</p>
        <h2>Tablero por proyecto</h2>
      </header>

      <div className="project-stack">
        {projects.map((project) => (
          <article key={project} className="project-card rise-in">
            <header className="project-title-row">
              <h3>{project}</h3>
            </header>

            <div className="lane-grid">
              {boardLanes.map((lane) => {
                const laneTasks = tasks.filter((task) => task.project === project && task.lane === lane);

                return (
                  <section key={`${project}-${lane}`} className="lane-column">
                    <h4>{lane}</h4>
                    {laneTasks.length === 0 ? (
                      <p className="item-meta">Sin tareas</p>
                    ) : (
                      laneTasks.map((task) => (
                        <div key={task.id} className="task-card">
                          <p className="item-title">{task.title}</p>
                          <p className="item-meta">
                            {task.owner} | Due {task.due}
                          </p>
                        </div>
                      ))
                    )}
                  </section>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
