# Auto-Improve Loop (operativo)

## Trigger
Activa este loop cuando pase cualquiera:
- salida no usable,
- error repetido,
- validación rota,
- retrabajo por instrucciones ambiguas.

## Loop corto (5 pasos)
1. **Falla**: describe el síntoma en 1 línea.
2. **Causa raíz**: técnica/proceso/datos/prompts.
3. **Micro-fix**: cambia prompt, checklist, script o skill mínima.
4. **Validación real**: comando/test/check que confirme mejora.
5. **Rollback**: define cómo volver al estado previo en <5 min.

## Salida mínima obligatoria
- Falla detectada
- Cambio aplicado
- Evidencia de validación
- Riesgo residual
- Siguiente prevención

## Regla
No cerrar tareas complejas sin registrar al menos una mejora del loop cuando hubo incidente.