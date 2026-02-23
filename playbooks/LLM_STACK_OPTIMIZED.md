# LLM Stack Optimizado (Hector)

## Objetivo
Usar cada modelo donde más rinde (calidad/costo/velocidad) y evitar usar modelos caros en tareas rutinarias.

## Modelo por tipo de trabajo

- **Codex (`openai-codex/gpt-5.3-codex`)**
  - Implementación, refactor, debug, tests, validación técnica final.
  - Tareas con comandos/shell y cambios de código.

- **Codex Spark (`openai-codex/gpt-5.3-codex-spark`)**
  - Operaciones repetitivas y ejecuciones simples (status, envíos, recordatorios).
  - Resúmenes técnicos de baja complejidad.

- **Gemini Pro (`google/gemini-3.1-pro-preview`)**
  - Brief estratégico diario, investigación amplia, síntesis de contexto largo.
  - Noticias IA globales con contraste de fuentes.

- **Gemini Flash (`google/gemini-2.5-flash`)**
  - Checks cortos de operación (approvals/closeout) y recordatorios.
  - Salidas rápidas, bajo costo.

- **Sonnet (`anthropic/claude-sonnet-4-6`)**
  - Segunda opinión profunda, revisión editorial/investigación con trade-offs.

- **Opus (`anthropic/claude-opus-4-6`)**
  - Escalación para decisiones críticas de alto impacto.

## Routing operativo (regla corta)
1. Si hay código -> **Codex** cierra sí o sí.
2. Si hay ideación/estrategia -> **Gemini Pro**.
3. Si hay revisión profunda/segunda opinión -> **Sonnet**.
4. Si es monitoreo breve/rutina -> **Gemini Flash** o **Codex Spark**.
5. Si es decisión crítica -> **Opus**.

## Cron alineado
- Mission control approvals/closeout -> **Gemini Flash**.
- QTS cierre + healthchecks + weekly eval -> **Codex**.
- Morning brief + X digest -> **Gemini Pro**.
- Newsletter research -> **Sonnet**.
- Newsletter publish -> **Codex**.
- Newsletter send / update-status -> **Codex Spark**.

## Guardrails
- Sin fuentes verificadas -> no afirmar.
- Cambios sensibles -> pasar por `playbooks/SENSITIVE_ACTION_GATE.md`.
- Tareas complejas -> usar `playbooks/task-start-template.md` + `playbooks/task-close-template.md`.
