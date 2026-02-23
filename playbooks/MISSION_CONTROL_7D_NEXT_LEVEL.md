# Mission Control — Siguiente nivel (7 días)

## Objetivo
Pasar de “dashboard útil” a operación agentic estable: reverse prompting, brain+muscles, auto-mejora y guardrails estrictos.

## Día 1 — Mission Control operativo
- Confirmar tablero diario: PHD, TCinsurance, SGC, QTS.
- Definir 1 KPI por proyecto para el día.
- Cierre: prioridad única de alto impacto para mañana.

## Día 2 — Reverse prompting por defecto
- Usar plantilla `playbooks/OPENCLAW_REVERSE_PROMPTS.md` en todas las tareas críticas.
- Regla de salida mínima en cada respuesta: objetivo, primer paso, riesgo principal, criterio de terminado.
- Cierre: documentar qué prompt produjo mejor resultado.

## Día 3 — Brain + Muscles (routing real)
- Brain: Gemini para ideación/estrategia.
- Muscles: Codex para implementación/validación técnica.
- Regla fija: si otro modelo propone código, Codex hace cierre final.
- Cierre: registrar ahorro de tiempo/costo vs flujo anterior.

## Día 4 — Auto-mejora continua
- Loop por fallo: Falla -> Causa raíz -> Micro-tool/skill -> Validación -> Rollback.
- No repetir errores sin remediación documentada.
- Cierre: 1 mejora implementada por día (mínimo).

## Día 5 — Config por objetivos, no por micro-management
- Priorizar instrucciones de resultado (qué lograr) en vez de pasos rígidos (cómo hacerlo).
- Solo tocar config manual si hay bloqueo real o riesgo.
- Cierre: documentar 1 ajuste de config y su motivo (si aplica).

## Día 6 — Seguridad estricta
- Checklist previo para acciones sensibles: impacto, permisos, rollback.
- Confirmación explícita antes de emails/deploy/publicación/borrado.
- Mantener flujo privado (sin inputs públicos no confiables en operación crítica).

## Día 7 — Cierre y hardening
- Revisión semanal: qué funcionó, qué falló, qué automatizar.
- Consolidar playbooks y métricas operativas.
- Definir backlog P0/P1 para siguiente semana.

## Reglas transversales
- Respuestas cortas, accionables y con evidencia real.
- Si no hay datos suficientes: explicitarlo y proponer siguiente comando.
- Siempre incluir criterio de rollback en cambios de impacto.
