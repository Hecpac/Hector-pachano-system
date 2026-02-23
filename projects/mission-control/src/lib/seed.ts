export type ProjectKey = "PHD" | "TCinsurance" | "SGC" | "QTS";

export const projects: ProjectKey[] = ["PHD", "TCinsurance", "SGC", "QTS"];

export type Priority = {
  project: ProjectKey;
  owner: string;
  focus: string;
  progress: number;
  nextStep: string;
  due: string;
  risk: "alto" | "medio" | "bajo";
};

export const priorities: Priority[] = [
  {
    project: "PHD",
    owner: "Hector",
    focus: "Cerrar entregables del sprint",
    progress: 72,
    nextStep: "Validar flujo final con QA",
    due: "2026-02-25",
    risk: "medio"
  },
  {
    project: "TCinsurance",
    owner: "Ops",
    focus: "Activar tracking base local",
    progress: 45,
    nextStep: "Definir META_PIXEL_ID de produccion",
    due: "2026-02-26",
    risk: "alto"
  },
  {
    project: "SGC",
    owner: "Compliance",
    focus: "Consolidar pilotos internos Fase 12",
    progress: 81,
    nextStep: "Publicar reporte de control",
    due: "2026-02-24",
    risk: "bajo"
  },
  {
    project: "QTS",
    owner: "Trading",
    focus: "Hardening de loop operativo",
    progress: 63,
    nextStep: "Ejecutar runbook P0/P1 en horario de mercado",
    due: "2026-02-24",
    risk: "medio"
  }
];

export type ApprovalStatus = "pendiente" | "en_revision" | "bloqueado" | "aprobado";

export const approvalLabels: Record<ApprovalStatus, string> = {
  pendiente: "Pendiente",
  en_revision: "En revision",
  bloqueado: "Bloqueado",
  aprobado: "Aprobado"
};

export type Approval = {
  id: string;
  project: ProjectKey;
  request: string;
  requestedBy: string;
  due: string;
  status: ApprovalStatus;
};

export const approvals: Approval[] = [
  {
    id: "APR-101",
    project: "PHD",
    request: "Liberar deploy de cierre de sprint",
    requestedBy: "Producto",
    due: "2026-02-23",
    status: "pendiente"
  },
  {
    id: "APR-102",
    project: "TCinsurance",
    request: "Confirmar variable NEXT_PUBLIC_META_PIXEL_ID",
    requestedBy: "Marketing",
    due: "2026-02-23",
    status: "en_revision"
  },
  {
    id: "APR-103",
    project: "SGC",
    request: "Aprobacion legal de runbook piloto",
    requestedBy: "Compliance",
    due: "2026-02-24",
    status: "pendiente"
  },
  {
    id: "APR-104",
    project: "QTS",
    request: "Go/No-Go de strict profile en live",
    requestedBy: "Riesgo",
    due: "2026-02-24",
    status: "bloqueado"
  }
];

export const pendingApprovals = approvals.filter((item) => item.status !== "aprobado");

export type TaskLane = "Por hacer" | "En curso" | "Hecho";

export const boardLanes: TaskLane[] = ["Por hacer", "En curso", "Hecho"];

export type Task = {
  id: string;
  project: ProjectKey;
  title: string;
  lane: TaskLane;
  owner: string;
  due: string;
};

export const tasks: Task[] = [
  {
    id: "T-01",
    project: "PHD",
    title: "Cerrar validacion de modulos finales",
    lane: "En curso",
    owner: "Hector",
    due: "2026-02-23"
  },
  {
    id: "T-02",
    project: "PHD",
    title: "Preparar checklist de closeout",
    lane: "Por hacer",
    owner: "PM",
    due: "2026-02-24"
  },
  {
    id: "T-03",
    project: "TCinsurance",
    title: "Agregar placeholders de entorno",
    lane: "Hecho",
    owner: "Ops",
    due: "2026-02-22"
  },
  {
    id: "T-04",
    project: "TCinsurance",
    title: "Definir id de pixel con negocio",
    lane: "En curso",
    owner: "Marketing",
    due: "2026-02-23"
  },
  {
    id: "T-05",
    project: "SGC",
    title: "Ejecutar preflight final del piloto",
    lane: "Hecho",
    owner: "QA",
    due: "2026-02-22"
  },
  {
    id: "T-06",
    project: "SGC",
    title: "Emitir minuta de no conformidades",
    lane: "Por hacer",
    owner: "Compliance",
    due: "2026-02-24"
  },
  {
    id: "T-07",
    project: "QTS",
    title: "Auditar timeout ambiguo en OMS",
    lane: "En curso",
    owner: "Trading",
    due: "2026-02-23"
  },
  {
    id: "T-08",
    project: "QTS",
    title: "Correr test focal de circuit breaker",
    lane: "Por hacer",
    owner: "Risk",
    due: "2026-02-24"
  }
];

export const agentConfig = {
  brain: {
    model: "openai-codex/gpt-5.3-codex",
    fallback: "openai-codex/gpt-5.3-codex-spark",
    mode: "local",
    notes: "Codex valida y cierra cuando hay codigo"
  },
  muscles: [
    {
      id: "code",
      name: "Codigo",
      provider: "Codex",
      purpose: "Implementacion, refactor y tests",
      status: "Activo"
    },
    {
      id: "search",
      name: "Busqueda",
      provider: "Gemini",
      purpose: "Ideacion, research y contexto largo",
      status: "Activo"
    },
    {
      id: "news",
      name: "Noticias",
      provider: "OpenClaw + Web",
      purpose: "Monitoreo IA global y resumen diario",
      status: "Activo"
    }
  ]
};

export type Guardrail = {
  id: string;
  title: string;
  detail: string;
  done: boolean;
};

export const securityGuardrails: Guardrail[] = [
  {
    id: "SEC-1",
    title: "Workspace privado",
    detail: "No publicar ni enviar datos del workspace a canales externos.",
    done: true
  },
  {
    id: "SEC-2",
    title: "Sin acceso a passwords guardadas",
    detail: "No abrir gestores de contrasenas ni secretos no solicitados.",
    done: true
  },
  {
    id: "SEC-3",
    title: "Acciones externas solo con confirmacion",
    detail: "Email, posts, deploy y mensajes fuera de local requieren permiso.",
    done: true
  },
  {
    id: "SEC-4",
    title: "Rollback definido",
    detail: "Todo cambio de alto impacto debe tener criterio de rollback.",
    done: false
  }
];
