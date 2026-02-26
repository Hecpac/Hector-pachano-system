# SGC — Estándar de Codificación Documental v1 (REG/FRM/ANEXO)

**Código del estándar:** `STD-SGC-COD-v1`  
**Vigencia:** inmediata (Wave 2 — S4)  
**Aplicación:** todos los documentos controlados SGC

---

## 1) Objetivo

Definir una regla formal, validable y auditable para codificar documentos SGC de tipo:
- `REG` (registro/informe principal)
- `FRM` (formatos de captura)
- `ANEXO` (evidencias y adjuntos)

El estándar busca garantizar unicidad, trazabilidad y control de cambios.

---

## 2) Estructura general del código

Formato base:

`{TIPO}-SGC-{DISCIPLINA}-{ANIO}-{CORRELATIVO}`

Donde:
- `TIPO`: `REG` | `FRM` | `ANEXO`
- `DISCIPLINA`: 3 letras en mayúscula (ej.: `MEC`, `ELE`, `CIV`)
- `ANIO`: 4 dígitos (`YYYY`)
- `CORRELATIVO`: 3 dígitos (`001`–`999`) secuencial por combinación `{TIPO, DISCIPLINA, ANIO}`

---

## 3) Reglas por tipo documental

## 3.1 REG (registro técnico principal)

### Regla
`REG-SGC-{DISCIPLINA}-{ANIO}-{CORRELATIVO}`

### Regex de validación
`^REG-SGC-[A-Z]{3}-\d{4}-\d{3}$`

### Ejemplos válidos
- `REG-SGC-MEC-2026-003`
- `REG-SGC-ELE-2026-001`

### Ejemplos inválidos
- `REG-SGC-MEC-26-003` *(año incompleto)*
- `REG-SGC-MEC-2026-3` *(correlativo no padded a 3 dígitos)*
- `REG-SGC-MEC-2026-00X` *(comodín prohibido)*
- `REG-SGC-mec-2026-003` *(disciplina no mayúscula)*

---

## 3.2 FRM (formatos de captura)

### Regla
`FRM-SGC-{DISCIPLINA}-{SUBTIPO}-{CORRELATIVO}`

Donde `SUBTIPO` identifica la naturaleza del formato (3–5 letras):
- `CHK` (checklist)
- `PT` (ensayo penetrantes)
- `PC` (prueba de carga)
- `MET` (metrología)
- otros subtipos autorizados por SGC

### Regex de validación
`^FRM-SGC-[A-Z]{3}-[A-Z]{2,5}-\d{3}$`

### Ejemplos válidos
- `FRM-SGC-MEC-CHK-001`
- `FRM-SGC-MEC-PT-001`
- `FRM-SGC-MEC-PC-002`
- `FRM-SGC-MEC-MET-001`

### Ejemplos inválidos
- `FRM-SGC-MEC-XXX` *(comodín sin correlativo)*
- `FRM-SGC-MEC-pt-001` *(subtipo en minúsculas)*
- `FRM-SGC-MEC-PRUEBA-001` *(subtipo excede longitud)*
- `FRM-SGC-MEC-CHK-01` *(correlativo no padded a 3)*

---

## 3.3 ANEXO (evidencias y adjuntos)

### Regla
`ANEXO-SGC-{DISCIPLINA}-{SUBTIPO}-{ANIO}-{CORRELATIVO}`

Subtipos recomendados:
- `FOTO` (registro fotográfico)
- `MET` (calibración/instrumentación)
- `MED` (mediciones)
- `EVD` (evidencia general)

### Regex de validación
`^ANEXO-SGC-[A-Z]{3}-[A-Z]{3,5}-\d{4}-\d{3}$`

### Ejemplos válidos
- `ANEXO-SGC-MEC-FOTO-2026-001`
- `ANEXO-SGC-MEC-MET-2026-001`
- `ANEXO-SGC-ELE-EVD-2026-015`

### Ejemplos inválidos
- `ANEXO-FOTO-001` *(legacy sin estructura SGC completa)*
- `ANEXO-SGC-MEC-FOTO-26-001` *(año incompleto)*
- `ANEXO-SGC-MEC-FOTO-2026-01` *(correlativo no padded a 3)*
- `ANEXO-SGC-MEC-XXX-2026-001` *(subtipo no autorizado/placeholder)*

---

## 4) Reglas transversales de validación

1. **Unicidad:** no se permite duplicar código dentro del mismo año para la misma familia (`REG`, `FRM`, `ANEXO`).
2. **Mayúsculas:** todos los segmentos alfabéticos deben emitirse en mayúsculas.
3. **Sin placeholders:** prohibidos `XXX`, `00X`, `{{...}}`, `[... ]` en estado `FINAL`.
4. **Secuencialidad:** correlativos deben crecer de forma monotónica; no reutilizar números anulados.
5. **Inmutabilidad del código:** una vez emitido `FINAL`, el código no cambia; la evolución ocurre por versión/control de cambios.

### Regex de detección de placeholders (bloqueo en FINAL)
- Token de plantilla llaves: `\{\{[A-Z0-9_\-\.]+\}\}`
- Token de plantilla corchetes: `\[[^\]]+\]`
- Comodines de código: `\b(XXX|00X|00\?)\b`

---

## 5) Compatibilidad con documentos legacy

Durante transición, pueden existir referencias históricas como:
- `ANEXO-FOTO-001..N`
- `FRM-SGC-MEC-XXX`

**Política:**
1. Se aceptan solo para lectura histórica/no emisión.
2. En una nueva emisión o reemisión, deben migrarse al estándar formal vigente.
3. Toda migración debe documentarse en matriz de trazabilidad de anexos.

---

## 6) Política de versionado documental

## 6.1 Versión de contenido
- Formato recomendado: `v{n}` (ej.: `v1`, `v2`, `v3`).
- Alternativa permitida (si sistema lo requiere): semver interno `MAJOR.MINOR.PATCH`.

## 6.2 Regla de incremento
- `MAJOR` / salto de versión principal: cambios estructurales o normativos.
- `MINOR` / versión incremental: ampliaciones sin romper estructura base.
- `PATCH` / ajuste menor: corrección editorial sin impacto técnico.

## 6.3 Relación código vs versión
- El **código documental** identifica el documento controlado.
- La **versión** identifica su evolución.
- Ejemplo: `REG-SGC-MEC-2026-003` puede existir como `v1`, `v2`, `v3`.

---

## 7) Política de control de cambios

Cada documento debe incorporar tabla mínima:

| Versión | Fecha | Autor | Tipo de cambio | Descripción | Aprobador |
|---|---|---|---|---|---|
| v1 | YYYY-MM-DD | Nombre | Alta | Emisión inicial | Nombre |
| v2 | YYYY-MM-DD | Nombre | Modificación | Ajuste técnico | Nombre |

### Reglas
1. Ningún cambio en `FINAL` sin registro en tabla de cambios.
2. Cambios técnicos en criterios, resultados o dictamen requieren revisión y aprobación.
3. Cambios de forma/editoriales deben quedar trazados (aunque no cambien dictamen).
4. Si hay reemisión por error crítico, conservar mismo código + nueva versión + justificación explícita.

---

## 8) Checklist de validación rápida de código

| Control | Criterio | Resultado |
|---|---|---|
| Patrón regex correcto | Cumple regex del tipo documental | `OK/NO` |
| Segmentos en mayúscula | `TIPO/SGC/DISCIPLINA/SUBTIPO` en mayúscula | `OK/NO` |
| Año válido | `YYYY` realista (>= 2000) | `OK/NO` |
| Correlativo válido | 3 dígitos `001-999` | `OK/NO` |
| No placeholder | Sin `XXX`, `00X`, `{{...}}`, `[...]` | `OK/NO` |
| Unicidad | No duplicado en registro maestro | `OK/NO` |

---

## 9) Control de cambios del estándar

| Versión | Fecha | Autor | Cambio |
|---|---|---|---|
| v1 | 2026-02-26 | Equipo SGC | Creación de estándar formal REG/FRM/ANEXO (Wave 2 — S4). |
