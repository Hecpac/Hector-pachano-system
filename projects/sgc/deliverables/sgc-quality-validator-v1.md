# SGC Wave 3 — S5 Validador Automático de Calidad Documental v1

**Código:** `SPEC-SGC-VAL-v1`  
**Script CLI:** `scripts/validate_sgc_report.py`  
**Alcance:** validación local de informes SGC (`.md`, `.html`, `.txt`) previo a emisión.

## 1) Objetivo
Estandarizar una validación mínima, repetible y auditable para bloquear emisiones con errores críticos de calidad documental, alineada con:
- `sgc-data-dictionary-v1.md`
- `sgc-master-template-v1.md`
- `sgc-coding-standard-v1.md`
- `sgc-format-inventory.md`

## 2) Modo de uso
```bash
cd /Users/hector/.openclaw/workspace/projects/sgc
python3 scripts/validate_sgc_report.py <ruta_documento>
python3 scripts/validate_sgc_report.py <ruta_documento> --json
```

### Códigos de salida
- `0`: validación sin fallos críticos (`FAIL=0`).
- `1`: se detectaron fallos críticos (`FAIL>0`).
- `2`: error de uso (archivo inexistente o inválido).

## 3) Reglas implementadas (v1)

| Regla | Severidad base | Descripción | Referencia |
|---|---|---|---|
| `S5-001` | ERROR | Código documental `REG-SGC-XXX-YYYY-###` válido. | S2 + S4 |
| `S5-002` | ERROR en FINAL / WARN en no FINAL | Bloqueo por placeholders/comodines (`{{...}}`, `[...]`, `XXX`, `00X`). | S3 + S4 |
| `S5-003` | ERROR | Presencia de secciones mínimas obligatorias (alcance, datos cliente, resultados, dictamen, trazabilidad, etc.). | S3 |
| `S5-004` | ERROR | Fechas válidas y consistentes (`fecha_inspección <= fecha_emisión`). | S1 + S2 |
| `S5-005` | ERROR en FINAL / WARN en no FINAL | Firmas requeridas (`Realizado/Verificado/Aprobado`) completas y sin placeholders. | S1 + S2 + S3 |
| `S5-006` | ERROR | Dictamen final explícito `APTO` o `NO APTO`. | S2 + S3 |
| `S5-007` | ERROR condicional / WARN informativo | Si `NO APTO`, CAPA con acciones numeradas obligatoria. | S2 |
| `S5-008` | ERROR/WARN según caso | Unidades críticas técnicas detectadas (TON, min y mm cuando aplica). | S1 + S2 |
| `S5-009` | ERROR en FINAL / WARN en no FINAL | Trazabilidad de anexos/formatos y conformidad de naming (`ANEXO-SGC-*`, `FRM-SGC-*`). | S1 + S4 |
| `S5-010` | ERROR | Completitud mínima de resultados técnicos (checklist, PT, prueba de carga). | S3 |

## 4) Criterio de conformidad documental
Documento **Conforme** para gate de pre-emisión cuando:
1. `FAIL = 0`.
2. No hay reglas críticas incumplidas para el estado del documento.
3. Las advertencias (`WARN`) se registran como tareas de cierre antes de pasar a `FINAL`.

## 5) Limitaciones conocidas (v1)
1. El parser es textual y no reemplaza revisión técnica especializada.
2. No interpreta firmas digitales criptográficas (solo evidencia textual).
3. Validación de anexos es por referencia/naming en contenido; no verifica apertura binaria del anexo.
4. Acepta documentos legacy en estados no finales con severidad `WARN`.

## 6) Próximos incrementos recomendados (fuera de Wave 3)
- Validar existencia física de anexos contra índice CSV.
- Validar unicidad de códigos contra registro maestro.
- Exportar reporte SARIF/CSV para QA.
- Integrar con checklist S8 pre-emisión.
