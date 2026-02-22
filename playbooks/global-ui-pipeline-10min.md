# Playbook Global — UI Pipeline (10 min)

Objetivo: pasar de idea → dirección visual → implementación sin fricción.

## 0) Inputs (1 min)
Define en 3 líneas:
- Usuario objetivo
- Acción principal (CTA)
- Restricciones (brand, tech, accesibilidad, performance)

Plantilla rápida:
```txt
Usuario: ...
CTA principal: ...
Restricciones: ...
```

## 1) Ideación rápida con Gemini (2–3 min)
Usa Gemini para generar baseline + 3 variantes.

Prompt:
```txt
Diseña una interfaz para: [contexto].
Usuario objetivo: [usuario].
Acción principal: [CTA].
Restricciones: [restricciones].

Quiero 4 propuestas:
1) Baseline equilibrado
2) Variante A (más densa)
3) Variante B (más estratégica/minimal)
4) Variante C (más táctica/orientada a acción)

Para cada propuesta entrega:
- Estructura por secciones
- Jerarquía visual (H1/H2/CTA)
- Componentes clave
- Riesgos UX
- Notas de accesibilidad (contraste, foco, labels, teclado)
```

## 2) Selección (2 min)
Evalúa cada variante (1-5):
- Claridad del objetivo
- Jerarquía visual
- Probabilidad de conversión
- Accesibilidad base
- Facilidad de implementación

Quédate con **1 dirección** (sin mezclar todo).

## 3) Implementación con Codex (3 min)
Pasa a Codex solo la variante elegida.

Prompt:
```txt
Implementa esta UI en React + Tailwind.
Dirección elegida: [pega variante final].

Requisitos:
- Componentes reutilizables (evitar prop-drilling innecesario)
- Semántica HTML correcta
- Estados de foco visibles
- aria-labels donde aplique
- Responsive mobile-first
- Evitar renders innecesarios

Entrega:
1) Código final
2) Decisiones técnicas clave
3) Checklist a11y/perf/composición validado
```

## 4) QA express (1–2 min)
Checklist final:
- [ ] Lint/typecheck OK
- [ ] No errores de consola
- [ ] Navegable con teclado
- [ ] Contraste y foco correctos
- [ ] CTA principal visible above-the-fold (mobile)

Comandos sugeridos:
```bash
npm run lint
npm run typecheck
npm run build
```

## Regla operativa (global)
- **Gemini**: ideación, variantes, framing.
- **Codex**: implementación, validación, cierre técnico.
- Evitar iteraciones infinitas: baseline + 3 variantes + 1 decisión + ship.
