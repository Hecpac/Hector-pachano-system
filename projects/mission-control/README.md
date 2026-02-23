# Mission Control (local)

Dashboard local en Next.js para prioridades, aprobaciones, tareas, agentes y guardrails.

## Instalar y correr

```bash
cd mission-control
npm install
npm run dev
```

Para lint:

```bash
npm run lint
```

## Estado cron real en `/`

La home incluye una seccion "Estado cron real" que lee cron jobs locales con `openclaw cron list --json` desde servidor (sin client-side fetching).
Depende de tener OpenClaw CLI instalado y el gateway local accesible; si falla, la UI muestra un mensaje claro sin romper la pagina.

## Editar seed data

Todo el mock data vive en:

`src/lib/seed.ts`

## Flujo diario recomendado

1. `Morning brief`: abre `/` para revisar prioridades activas.
2. `Prioridades`: confirma foco y riesgo por proyecto.
3. `Aprobaciones`: entra a `/approvals` y desbloquea pendientes.
4. `Closeout`: revisa `/tasks`, `/agents` y `/security` para cierre del dia.
