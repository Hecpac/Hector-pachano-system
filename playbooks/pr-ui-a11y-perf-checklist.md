# PR Checklist — UI / A11y / Performance (Obligatorio)

> Marcar todo antes de pedir merge.

## A) UI / Diseño
- [ ] Se respetan tokens de diseño (tipografía, spacing, color, sombras, motion).
- [ ] No hay cambios visuales accidentales fuera del scope.
- [ ] Componentes reutilizables (sin proliferación de boolean props innecesarias).
- [ ] Estados vacíos/error/loading diseñados y consistentes.

## B) Accesibilidad (A11y)
- [ ] Navegación por teclado funciona (Tab/Shift+Tab/Enter/Escape).
- [ ] Focus visible en elementos interactivos.
- [ ] Semántica correcta (headings, landmarks, labels, roles).
- [ ] Formularios con `label`, mensajes de error claros y `aria-invalid` cuando aplica.
- [ ] Contraste visual suficiente en texto e interacción.
- [ ] Touch targets móviles >= 44x44px.
- [ ] `prefers-reduced-motion` respetado para animaciones relevantes.

## C) Performance
- [ ] Imágenes con `sizes`/lazy/priority correctos según contexto.
- [ ] No se agregaron client components innecesarios.
- [ ] Se aplicó code-splitting para secciones pesadas cuando aplica.
- [ ] Evitar trabajo en render que pueda moverse a build/server.
- [ ] Se revisó impacto en métricas básicas (LCP/TBT/CLS) cuando el cambio toca Home o vistas críticas.

## D) QA multi-dispositivo
- [ ] Verificación desktop (ancho amplio).
- [ ] Verificación móvil realista (ej. 390x844 y/o 360x740).
- [ ] Sin overflow horizontal.
- [ ] Flujos críticos funcionando (navegación, CTA, formularios).

## E) Evidencia en PR (requerida)
- [ ] Resumen de cambios en 3-5 bullets.
- [ ] Capturas/video antes-después (si aplica UI).
- [ ] Resultado de lint/test/build adjunto.
- [ ] Riesgos conocidos + plan de rollback breve.
