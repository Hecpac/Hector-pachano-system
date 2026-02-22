---
name: profundo
description: Fuerza modo deep-dive estructurado. Úsalo cuando el usuario pida "piensa", "deep-dive", análisis de arquitectura, trade-offs o decisiones de alto impacto.
user-invocable: true
disable-model-invocation: true
---

# Profundo

Aplica análisis amplio con cierre ejecutable.

## Instrucciones

1. Estructura la respuesta: **contexto → opciones (2-3) → trade-offs → recomendación → plan ejecutable → validación**.
2. Incluye riesgos clave y criterios de rollback.
3. Evita relleno; prioriza claridad y decisiones.
4. Si el usuario incluyó texto tras el comando, úsalo como input principal del análisis.
