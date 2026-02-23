export const projects = ["PHD", "TCinsurance", "SGC", "QTS"] as const;

export type ProjectKey = (typeof projects)[number];
export type IsoDate = `${number}-${number}-${number}`;
export type RiskLevel = "alto" | "medio" | "bajo";

type ProgressPercent = number & { readonly __brand: "ProgressPercent" };

function asIsoDate(value: IsoDate): IsoDate {
  const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoDatePattern.test(value)) {
    throw new Error(`Fecha invalida en seed: ${value}`);
  }

  return value;
}

function asProgressPercent(value: number): ProgressPercent {
  if (!Number.isFinite(value) || value < 0 || value > 100) {
    throw new Error(`Progress fuera de rango [0..100]: ${value}`);
  }

  return value as ProgressPercent;
}

export type Priority = {
  project: ProjectKey;
  owner: string;
  focus: string;
  progress: ProgressPercent;
  nextStep: string;
  due: IsoDate;
  risk: RiskLevel;
};

export const priorities: Priority[] = [
  {
    project: "PHD",
    owner: "Hector",
    focus: "Cerrar entregables del sprint",
    progress: asProgressPercent(72),
    nextStep: "Validar flujo final con QA",
    due: asIsoDate("2026-02-25"),
    risk: "medio"
  },
  {
    project: "TCinsurance",
    owner: "Ops",
    focus: "Activar tracking base local",
    progress: asProgressPercent(45),
    nextStep: "Definir META_PIXEL_ID de produccion",
    due: asIsoDate("2026-02-26"),
    risk: "alto"
  },
  {
    project: "SGC",
    owner: "Compliance",
    focus: "Consolidar pilotos internos Fase 12",
    progress: asProgressPercent(81),
    nextStep: "Publicar reporte de control",
    due: asIsoDate("2026-02-24"),
    risk: "bajo"
  },
  {
    project: "QTS",
    owner: "Trading",
    focus: "Hardening de loop operativo",
    progress: asProgressPercent(63),
    nextStep: "Ejecutar runbook P0/P1 en horario de mercado",
    due: asIsoDate("2026-02-24"),
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
  due: IsoDate;
  status: ApprovalStatus;
};

export const approvals: Approval[] = [
  {
    id: "APR-101",
    project: "PHD",
    request: "Liberar deploy de cierre de sprint",
    requestedBy: "Producto",
    due: asIsoDate("2026-02-23"),
    status: "pendiente"
  },
  {
    id: "APR-102",
    project: "TCinsurance",
    request: "Confirmar variable NEXT_PUBLIC_META_PIXEL_ID",
    requestedBy: "Marketing",
    due: asIsoDate("2026-02-23"),
    status: "en_revision"
  },
  {
    id: "APR-103",
    project: "SGC",
    request: "Aprobacion legal de runbook piloto",
    requestedBy: "Compliance",
    due: asIsoDate("2026-02-24"),
    status: "pendiente"
  },
  {
    id: "APR-104",
    project: "QTS",
    request: "Go/No-Go de strict profile en live",
    requestedBy: "Riesgo",
    due: asIsoDate("2026-02-24"),
    status: "bloqueado"
  }
];

export type PendingApproval = Approval & { status: Exclude<ApprovalStatus, "aprobado"> };

function isPendingApproval(item: Approval): item is PendingApproval {
  return item.status !== "aprobado";
}

export const pendingApprovals: PendingApproval[] = approvals.filter(isPendingApproval);

export type TaskLane = "Por hacer" | "En curso" | "Hecho";

export const boardLanes: TaskLane[] = ["Por hacer", "En curso", "Hecho"];

export type Task = {
  id: string;
  project: ProjectKey;
  title: string;
  lane: TaskLane;
  owner: string;
  due: IsoDate;
};

export const tasks: Task[] = [
  {
    id: "T-01",
    project: "PHD",
    title: "Cerrar validacion de modulos finales",
    lane: "En curso",
    owner: "Hector",
    due: asIsoDate("2026-02-23")
  },
  {
    id: "T-02",
    project: "PHD",
    title: "Preparar checklist de closeout",
    lane: "Por hacer",
    owner: "PM",
    due: asIsoDate("2026-02-24")
  },
  {
    id: "T-03",
    project: "TCinsurance",
    title: "Agregar placeholders de entorno",
    lane: "Hecho",
    owner: "Ops",
    due: asIsoDate("2026-02-22")
  },
  {
    id: "T-04",
    project: "TCinsurance",
    title: "Definir id de pixel con negocio",
    lane: "En curso",
    owner: "Marketing",
    due: asIsoDate("2026-02-23")
  },
  {
    id: "T-05",
    project: "SGC",
    title: "Ejecutar preflight final del piloto",
    lane: "Hecho",
    owner: "QA",
    due: asIsoDate("2026-02-22")
  },
  {
    id: "T-06",
    project: "SGC",
    title: "Emitir minuta de no conformidades",
    lane: "Por hacer",
    owner: "Compliance",
    due: asIsoDate("2026-02-24")
  },
  {
    id: "T-07",
    project: "QTS",
    title: "Auditar timeout ambiguo en OMS",
    lane: "En curso",
    owner: "Trading",
    due: asIsoDate("2026-02-23")
  },
  {
    id: "T-08",
    project: "QTS",
    title: "Correr test focal de circuit breaker",
    lane: "Por hacer",
    owner: "Risk",
    due: asIsoDate("2026-02-24")
  }
];

export type AgentMode = "local";
export type AgentStatus = "Activo";

export type AgentConfig = {
  brain: {
    model: string;
    fallback: string;
    mode: AgentMode;
    notes: string;
  };
  muscles: Array<{
    id: "code" | "search" | "news";
    name: string;
    provider: string;
    purpose: string;
    status: AgentStatus;
  }>;
};

export const agentConfig: AgentConfig = {
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
