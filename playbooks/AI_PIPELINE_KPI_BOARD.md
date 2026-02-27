# AI Pipeline KPI Board (v1)

Objetivo: medir **velocidad + calidad + control** en el flujo issue → PR → merge.

## KPIs obligatorios

1) **Lead time issue→PR (h)**
- Fórmula: `hora_apertura_PR - hora_inicio_issue`
- Meta: `< 8h` (verde), `8-24h` (amarillo), `>24h` (rojo)

2) **First-pass gate rate (%)**
- Fórmula: `PR que pasan lint+test+build en primer intento / PR totales`
- Meta: `>= 70%` verde

3) **Merge sin retrabajo (%)**
- Fórmula: `PR mergeadas sin round extra de fixes / PR mergeadas`
- Meta: `>= 60%` verde

4) **PR asistidas por agente (%)**
- Fórmula: `PR con apoyo de agente / PR totales`
- Meta: `>= 50%` (adopción mínima)

5) **Defectos post-merge 7d**
- Fórmula: `incidentes o hotfixes dentro de 7 días`
- Meta: `0-1` verde, `2` amarillo, `>=3` rojo

## Cadencia

- **Diario (5 min):** actualizar fila del día por proyecto activo (PHD/QTS).
- **Semanal (15 min):** revisar semáforos + elegir 1 mejora de proceso.

## Plantilla de captura (copiar/pegar)

| Fecha | Proyecto | Lead time (h) | First-pass gate | Merge sin retrabajo | PR asistida por agente | Defectos 7d | Nota |
|---|---|---:|---:|---:|---:|---:|---|
| YYYY-MM-DD | QTS |  |  |  |  |  |  |

## Reglas operativas

- Si **First-pass gate < 60%** por 2 días seguidos → pausar paralelismo y reforzar checklist pre-PR.
- Si **Defectos 7d >= 2** → activar revisión profunda (Sonnet) + cierre técnico de Codex.
- Si **Lead time > 24h** frecuente → recortar scope por ticket (máx 1 objetivo técnico por PR).

## Evidencia mínima por PR

- Comandos de validación corridos (lint/test/build o equivalente).
- Riesgo residual + rollback en comentario de cierre.
- Enlace al issue original.

Relacionado:
- `playbooks/task-start-template.md`
- `playbooks/task-close-template.md`
- `playbooks/model-routing-stack.md`
