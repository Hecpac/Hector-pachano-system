# Agent Sandbox Profile (v1)

Objetivo: ejecutar agentes rápido, sin abrir riesgo innecesario.

## Perfil por defecto: `DEV_SAFE`

### Permitido
- Leer/escribir dentro del repo objetivo.
- Crear ramas, commits locales, correr tests/lint/build.
- Abrir PR draft (si aplica) con resumen técnico.

### Bloqueado sin confirmación explícita
- Deploy / publish / envío externo.
- Borrados masivos o cambios irreversibles.
- Cambios de credenciales/secrets/permisos.
- Comandos con privilegios elevados (`sudo`, etc.).

## Niveles

1. **READ_ONLY**
- Solo inspección, diagnóstico y propuesta.

2. **DEV_SAFE** (default)
- Implementa cambios + validación local.
- Sin acciones externas sensibles.

3. **SENSITIVE_APPROVED**
- Solo con confirmación previa usando:
  - `playbooks/SENSITIVE_ACTION_GATE.md`

## Checklist pre-run (60 segundos)

- [ ] Scope exacto de archivos permitidos.
- [ ] Criterio de done (qué valida cierre).
- [ ] Rollback claro (revert commit / rollback plan).
- [ ] Timeout definido.
- [ ] Evidencia requerida al final (tests/logs).

## Checklist post-run

- [ ] Diff acotado al alcance.
- [ ] Validación técnica ejecutada.
- [ ] Riesgo residual documentado.
- [ ] Siguiente paso recomendado (1 opción).

## Kill switch (si algo se desvía)

- Detener agente/subagente inmediatamente.
- Guardar estado actual (logs + diff).
- Reanudar solo con alcance corregido.

## Política de secretos

- Nunca exponer secretos en logs/commits.
- `.env*` fuera de control de versiones.
- Si se detecta fuga: rotación inmediata + saneamiento de historial operativo.

## Resultado esperado

- Más velocidad de ejecución sin sacrificar gobernanza.
