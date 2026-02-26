# SGC Wave 3 — S7 Estándar de Trazabilidad de Anexos y Evidencias v1

**Código:** `STD-SGC-TRZ-v1`  
**Objetivo:** asegurar vínculo verificable entre secciones técnicas del informe y evidencia documental/anexos.

## 1) Alcance
Aplica a todo informe `REG-SGC-*` y a sus anexos `ANEXO-SGC-*` / formatos `FRM-SGC-*` durante `Draft`, `Review` y `Approved`.

## 2) Convención de nombres (naming)

### 2.1 Documento principal
- `REG-SGC-{DISCIPLINA}-{ANIO}-{CORRELATIVO}`
- Ejemplo: `REG-SGC-MEC-2026-003`

### 2.2 Anexos de evidencia
- `ANEXO-SGC-{DISCIPLINA}-{SUBTIPO}-{ANIO}-{CORRELATIVO}`
- Subtipos sugeridos: `FOTO`, `MET`, `MED`, `EVD`.
- Ejemplo: `ANEXO-SGC-MEC-FOTO-2026-001`

### 2.3 Formatos de captura asociados
- `FRM-SGC-{DISCIPLINA}-{SUBTIPO}-{CORRELATIVO}`
- Ejemplos: `FRM-SGC-MEC-CHK-001`, `FRM-SGC-MEC-PT-001`

## 3) Regla de vínculo sección ↔ anexo
Cada anexo debe mapearse explícitamente a una sección del informe usando etiqueta normalizada:
- `2.8.1` Checklist
- `2.8.2` PT
- `2.8.3` Prueba de carga
- `2.9` Hallazgos
- `2.10` Riesgo
- `2.12` CAPA

**Regla:** ninguna afirmación técnica crítica debe quedar sin soporte de evidencia/anexo.

## 4) Índice de anexos obligatorio
Cada informe debe incluir tabla/índice de anexos con mínimo:
1. `annex_id`
2. `annex_type`
3. `section_ref`
4. `evidence_title`
5. `file_name`
6. `responsible`
7. `capture_date`
8. `integrity_status`

Plantilla oficial: `sgc-annex-index-template-v1.csv`.

## 5) Reglas de integridad documental
1. **Unicidad:** `annex_id` único por informe.
2. **Bidireccionalidad:**
   - El informe cita el `annex_id`.
   - El índice define `section_ref` y ubicación del archivo.
3. **Legibilidad:** `integrity_status` debe ser `OK` para emisión final.
4. **Fechas válidas:** `capture_date` en formato `YYYY-MM-DD`.
5. **Responsable trazable:** cada evidencia con autor/capturista.
6. **Compatibilidad transición:** IDs legacy (`ANEXO-FOTO-001`) solo permitidos en borrador con plan de migración.

## 6) Estructura recomendada de carpetas
```text
<raiz_informe>/
  REG-SGC-MEC-2026-003.md
  anexos/
    ANEXO-SGC-MEC-FOTO-2026-001.jpg
    ANEXO-SGC-MEC-FOTO-2026-002.jpg
    ANEXO-SGC-MEC-MET-2026-001.pdf
  indices/
    REG-SGC-MEC-2026-003_annex-index_v1.csv
```

## 7) Reglas de control de cambios en anexos
- Si cambia un anexo luego de revisión, actualizar índice con:
  - `version`
  - `change_note`
  - `updated_at`
- No sobrescribir evidencia aprobada sin trazabilidad de cambio.

## 8) Criterios de aceptación S7
Un informe cumple S7 cuando:
1. 100% de anexos citados cumplen naming vigente.
2. 100% de anexos citados están indexados y vinculados a sección.
3. 100% de secciones críticas tienen al menos un soporte de evidencia.
4. No hay anexos huérfanos en carpeta sin índice.
