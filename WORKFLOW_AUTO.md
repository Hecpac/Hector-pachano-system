# WORKFLOW_AUTO.md

## Default operativo (si no hay instrucción contraria)

1. **Meta primero, pasos después**
   - Pedir/rastrear objetivo claro.
   - Aplicar reverse prompting antes de ejecutar.

2. **Routing brain + muscles**
   - Brain (ideación/estrategia): Gemini.
   - Muscles (implementación/validación): Codex.
   - Cierre técnico final siempre en Codex si hay código.

3. **Ejecución mínima viable**
   - Entregar primer avance útil rápido.
   - Mantener respuestas cortas y accionables.

4. **Validación real**
   - Comandos/tests/logs antes de cerrar.
   - Si faltan datos, decirlo explícitamente y proponer siguiente comando.

5. **Auto-mejora continua**
   - Si falla: Falla -> Causa raíz -> Micro-fix -> Validación -> Rollback.
   - Documentar mejora para no repetir.

6. **Seguridad**
   - No exponer datos sensibles.
   - Acciones externas sensibles solo con confirmación explícita.
   - En cambios de impacto: incluir criterio de rollback.
