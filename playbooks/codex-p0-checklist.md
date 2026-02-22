# Codex P0 Checklist (Repo)

Objetivo: bajar riesgo y subir velocidad con un loop estable para agentes.

## P0 — Obligatorio

- [ ] **Entry point único**: `make build`, `make test`, `make run`.
- [ ] **Errores visibles**: salida limpia + códigos de salida correctos.
- [ ] **Loop corto**: ejecutar → revisar diff → corregir (iteraciones pequeñas).

## P1 — Muy recomendado

- [ ] **Recovery playbook**: rollback/triage cuando un cambio rompe.
- [ ] **Check-ins de agente**: checkpoints cada 10–20 min o por milestone.

## P2 — Si hay UI nativa / E2E visual

- [ ] Herramienta para dar “ojos” al agente (capturas/simulator/UI automation).

---

## Definition of Done (rápida)

- [ ] `make lint` pasa
- [ ] `make typecheck` pasa
- [ ] `make test` pasa
- [ ] `make build` pasa
- [ ] No hay cambios no explicados en el diff final
- [ ] Quedó documentado *qué se cambió* y *por qué*

---

## Command contract (equipo)

Todos los prompts para agentes deben pedir explícitamente:

1. Ejecuta `make check` antes de cerrar.
2. Si falla, reporta error exacto y propone fix mínimo.
3. No hagas cambios masivos sin checkpoint intermedio.
4. Si hay riesgo alto, abre rama/commit de seguridad antes de refactor.
