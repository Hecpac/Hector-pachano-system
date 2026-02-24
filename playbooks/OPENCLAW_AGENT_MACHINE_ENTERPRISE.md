# OPENCLAW_AGENT_MACHINE_ENTERPRISE.md

Objetivo: orquestación profesional para OpenClaw (determinista, auditable, con costos controlados).

## 1) Arquitectura (SOTA práctica)

```text
Bouncer -> Planner -> Executors -> Reviewer -> Gatekeeper -> Deliver
             \___________________ Blackboard ___________________/
```

- **Bouncer (barato/rápido):** triaje, prompt-injection check, fast-path para tareas triviales.
- **Planner:** plan técnico + criterios de done + riesgos + rollback.
- **Executors:** implementación en sandbox con micro-ciclos (lint/build/test local).
- **Reviewer:** segunda opinión independiente (seguridad, edge-cases, desviaciones del plan).
- **Gatekeeper:** validación 100% determinista (sin LLM): tests/lint/typecheck/security.
- **Deliver:** resumen final + evidencia + próximos pasos.

## 2) Mapeo de modelos recomendado

- **Bouncer:** modelo económico y rápido.
- **Planner:** Gemini Pro (o Opus en decisiones críticas).
- **Executor principal:** GPT-5.3-Codex.
- **Reviewer:** Sonnet u Opus.
- **Gatekeeper:** comandos reales (CI local/remote), no LLM.

## 3) State Machine (obligatoria)

Estados:
1. `INTAKE`
2. `TRIAGE`
3. `PLAN`
4. `EXECUTE`
5. `REVIEW`
6. `GATE`
7. `DELIVER`
8. `ROLLBACK` (si falla gate o hay riesgo)

Reglas:
- No saltar de `EXECUTE` a `DELIVER`.
- Si `GATE=FAIL`, pasa a `ROLLBACK` o `EXECUTE` con scope acotado.
- `max_retries_execute: 3` (fail-fast después de 3).

## 4) Guardrails de presupuesto

- `max_agent_depth: 2`
- `max_children_per_agent: 3`
- `max_parallel_agents_total: 6`
- Definir por tarea: `token_budget`, `time_budget_min`, `cost_budget_usd`.
- Si se supera un límite: detener spawn de subagentes y devolver estado + recomendación.

## 5) Sandbox + Blackboard

- Ejecutar cambios en workspace aislado temporal para cada sub-tarea.
- Compartir contexto por archivos (`plan.md`, `decisions.md`, `risks.md`, `diff-summary.md`) y no por prompts enormes.
- Reviewer consume diffs + plan original, no repo completo cada vez.

## 6) HITL (human-in-the-loop)

Requieren aprobación explícita:
- deploy
- borrados/destructivos
- cambios de credenciales/secrets
- cambios irreversibles de infra
- acciones externas (mensajes públicos, email, etc.)

## 7) Gatekeeper determinista (mínimo)

Checklist de salida:
- `lint` ✅
- `build/typecheck` ✅
- `tests` ✅
- `security scan` ✅
- `rollback plan` documentado ✅

Sin este bloque en verde, no hay cierre.

## 8) Observabilidad mínima

Log por run:
- `run_id`, `task_id`, `state`, `model_used`, `tokens`, `cost_estimate`, `duration_ms`
- decisiones clave y motivo
- evidencia de gate y resultado

## 9) Protocolo de entrega

Formato final:
1. Qué se hizo
2. Evidencia (comandos/salidas)
3. Riesgos residuales
4. Rollback
5. Siguiente paso recomendado

---

Este playbook se usa como referencia operativa para implementar la “máquina” de agentes en OpenClaw.
