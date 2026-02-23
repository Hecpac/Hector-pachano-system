# Sensitive Action Gate (pre-ejecución)

Usar antes de: deploy, publicación, emails, borrado, cambios de seguridad o credenciales.

## Checklist obligatorio
- [ ] Objetivo y alcance claros (qué se toca / qué no).
- [ ] Impacto estimado (usuarios, datos, servicio).
- [ ] Riesgo principal identificado.
- [ ] Rollback definido y probado en papel (<5 min).
- [ ] Evidencia mínima lista (logs/comandos/archivos).
- [ ] Confirmación explícita del usuario recibida.

## Formato de confirmación
"Voy a ejecutar: <acción>. Impacto: <impacto>. Riesgo: <riesgo>. Rollback: <rollback>. ¿Confirmas?"

## Si NO hay confirmación
- No ejecutar la acción.
- Proponer alternativa segura/read-only.
