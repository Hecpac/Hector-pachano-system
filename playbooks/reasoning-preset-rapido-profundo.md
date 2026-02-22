# Preset fijo — Rápido vs Profundo

Objetivo: alternar de forma consistente entre ejecución rápida y análisis profundo.

## 1) Selector automático

Usa **RÁPIDO** por defecto.

Cambia a **PROFUNDO** si ocurre cualquiera:
- decisión de arquitectura o estrategia
- impacto alto (producción / datos / irreversibilidad)
- ambigüedad alta o requisitos incompletos
- tarea multi-etapa (investigar + implementar + validar)

## 2) Plantilla Modo RÁPIDO (copiar/pegar)

```txt
Modo rápido.
Dame: (1) qué harás, (2) evidencia mínima/verificación, (3) siguiente paso.
Sin teoría larga. Enfócate en ejecutar.
```

Salida esperada:
- Qué haré
- Evidencia/check
- Siguiente paso

## 3) Plantilla Modo PROFUNDO (copiar/pegar)

```txt
Modo profundo.
Haz deep-dive con: contexto, 2-3 opciones, trade-offs, recomendación, plan ejecutable y validación.
Incluye riesgos + rollback.
```

Salida esperada:
- Contexto
- Opciones + trade-offs
- Recomendación
- Plan por pasos
- Validación (comandos/checks)
- Riesgos y rollback

## 4) Regla de cierre

Siempre terminar con una línea de control:
- **Rápido:** “Listo para ejecutar: sí/no”
- **Profundo:** “Recomendación final + primer paso hoy”

## 5) Trigger phrases útiles

- `rápido`: fuerza síntesis + acción inmediata.
- `profundo` o `deep-dive`: fuerza análisis amplio y estructurado.
- `cierre técnico`: exige validación real y criterio de done.
