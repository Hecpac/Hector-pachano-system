# Visual Library v1 (Gemini ideación → Codex implementación)

Objetivo: reducir tiempo brief→mock y mantener consistencia visual.

## Estructura mínima sugerida

- `design/library/v1/prompts/`
- `design/library/v1/styles/`
- `design/library/v1/examples/`

## Presets de prompt (copiar/usar)

### 1) Hero de conversión
```
Diseña 3 variantes de hero para [producto].
Audiencia: [audiencia].
CTA principal: [CTA].
Restricciones: [brand/accesibilidad/performance].

Entrega por variante:
- titular + subtítulo
- layout
- bloques de confianza
- riesgo UX principal
```

### 2) Landing de servicio (B2B)
```
Propón estructura de landing orientada a lead:
- problema
- solución
- prueba social
- oferta
- CTA
Incluir versión corta mobile-first.
```

### 3) Tarjetas comparativas
```
Genera diseño de comparación (2-3 columnas) con foco en claridad.
Evitar tablas pesadas; priorizar scan rápido.
```

### 4) UI de dashboard
```
Proponer layout dashboard con prioridad en:
- estado crítico arriba
- alertas accionables
- densidad media, legible
- navegación por teclado
```

## Rubrica de selección (1-5)

- Claridad del objetivo
- Jerarquía visual
- Probabilidad de conversión
- Accesibilidad base
- Facilidad de implementación

Regla: elegir **1 dirección** (no mezclar 4 propuestas).

## Gate de implementación (Codex)

Antes de cerrar:
- [ ] semántica HTML correcta
- [ ] foco visible
- [ ] responsive mobile-first
- [ ] lint/test/build OK
- [ ] checklist: `playbooks/pr-ui-a11y-perf-checklist.md`

## KPIs visuales

- Tiempo brief→mock aprobado
- Iteraciones hasta aprobación
- % variantes reutilizables
- Costo por iteración
