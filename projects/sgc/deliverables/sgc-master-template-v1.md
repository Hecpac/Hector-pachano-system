# SGC — Plantilla Maestra de Informe Técnico v1

**Código de plantilla:** `TPL-SGC-MEC-MASTER-v1`  
**Ámbito:** Emisión de informes técnicos SGC (inspección/certificación de equipos de izamiento)  
**Estados aplicables:** `BORRADOR` / `REVISION` / `FINAL`

---

## 0) Reglas de uso de esta plantilla

1. Esta plantilla define la estructura mínima obligatoria para emisión SGC.
2. Los placeholders controlados usan formato `{{NOMBRE_CAMPO}}`.
3. En estado `FINAL` no se permiten placeholders sin reemplazar.
4. Todo documento emitido debe cumplir la codificación vigente (ver `sgc-coding-standard-v1.md`).

---

## 1) Portada / Cabecera de control documental

**Código documental:** `{{CODIGO_DOCUMENTO}}`  
**Título:** `{{TITULO_DOCUMENTO}}`  
**Versión:** `{{VERSION_DOCUMENTO}}`  
**Estado:** `{{ESTADO_DOCUMENTO}}` (`BORRADOR|REVISION|FINAL|RECHAZADO`)  
**Empresa inspectora:** `{{EMPRESA_INSPECCION}}`  
**Cliente:** `{{CLIENTE_NOMBRE}}`  
**RIF/NIT:** `{{CLIENTE_ID_FISCAL}}`  
**Dirección cliente:** `{{CLIENTE_DIRECCION}}`  
**N° reporte:** `{{NUMERO_REPORTE}}`  
**Fecha de inspección:** `{{FECHA_INSPECCION_YYYY-MM-DD}}`  
**Fecha de emisión:** `{{FECHA_EMISION_YYYY-MM-DD}}`  
**Inspector líder:** `{{INSPECTOR_LIDER_NOMBRE}}` — `{{INSPECTOR_LIDER_CARGO}}`  
**Verificado por:** `{{VERIFICADOR_NOMBRE}}` — `{{VERIFICADOR_CARGO}}`  
**Aprobado por:** `{{APROBADOR_NOMBRE}}` — `{{APROBADOR_CARGO}}`

**Equipo evaluado:** `{{EQUIPO_TIPO}} {{EQUIPO_MARCA}} {{EQUIPO_MODELO}}`  
**Serial:** `{{EQUIPO_SERIAL}}`

---

## 2) Secciones técnicas obligatorias

> **Todas las secciones 2.1 a 2.15 son obligatorias para emisión `FINAL`.**

### 2.1 Alcance
`{{ALCANCE_TECNICO}}`

### 2.2 Datos del cliente
- Razón social: `{{CLIENTE_NOMBRE}}`
- RIF/NIT: `{{CLIENTE_ID_FISCAL}}`
- Dirección: `{{CLIENTE_DIRECCION}}`

### 2.3 Detalles del equipo inspeccionado
- Tipo/Descripción: `{{EQUIPO_TIPO}}`
- Marca: `{{EQUIPO_MARCA}}`
- Modelo: `{{EQUIPO_MODELO}}`
- Serial: `{{EQUIPO_SERIAL}}`
- Subtipo: `{{EQUIPO_SUBTIPO}}`
- Capacidad tabulada (TON): `{{EQUIPO_CAPACIDAD_TON}}`
- Año fabricación: `{{EQUIPO_ANIO_FABRICACION}}`

### 2.4 Responsabilidades del organismo de inspección
`{{RESPONSABILIDADES_ORGANISMO}}`

### 2.5 Equipos e instrumentos utilizados
| Equipo/Instrumento | Serial | Fecha calibración | Próxima calibración | Estado |
|---|---|---|---|---|
| `{{INST_1_NOMBRE}}` | `{{INST_1_SERIAL}}` | `{{INST_1_CAL_FECHA}}` | `{{INST_1_PROX_CAL}}` | `{{INST_1_ESTADO}}` |
| `{{INST_N_NOMBRE}}` | `{{INST_N_SERIAL}}` | `{{INST_N_CAL_FECHA}}` | `{{INST_N_PROX_CAL}}` | `{{INST_N_ESTADO}}` |

### 2.6 Normativa y procedimientos aplicados
- Normas: `{{NORMAS_APLICADAS}}`
- Procedimientos internos: `{{PROCEDIMIENTOS_APLICADOS}}`

### 2.7 Criterios de aceptación/rechazo
- END/PT: `{{CRITERIO_END}}`
- Prueba de carga: `{{CRITERIO_CARGA}}`
- Operación segura/checklist: `{{CRITERIO_OPERACION_SEGURA}}`

### 2.8 Resultados obtenidos

#### 2.8.1 Checklist de inspección
- Total ítems: `{{CHECKLIST_TOTAL_ITEMS}}`
- Resultado global: `{{CHECKLIST_RESULTADO_GLOBAL}}`
- Observaciones críticas: `{{CHECKLIST_OBSERVACIONES_CRITICAS}}`

#### 2.8.2 Ensayo PT (si aplica)
- Material: `{{PT_MATERIAL}}`
- Superficie: `{{PT_SUPERFICIE}}`
- Temperatura: `{{PT_TEMPERATURA_RANGO}}`
- Código de referencia: `{{PT_CODIGO_REFERENCIA}}`
- Penetrante/Revelador/Solvente (con lote): `{{PT_LIQUIDOS_LOTES}}`
- Tiempos (penetración/secado): `{{PT_TIEMPOS_MIN}}`
- Área inspeccionada: `{{PT_AREA}}`
- Resultado: `{{PT_RESULTADO}}`
- Dictamen parcial: `{{PT_DICTAMEN_PARCIAL}}`

#### 2.8.3 Prueba de carga
- Configuración: `{{CARGA_CONFIGURACION}}`
- Pluma probada: `{{CARGA_PLUMA}}`
- Longitud (m): `{{CARGA_LONGITUD_M}}`
- Ángulo (°): `{{CARGA_ANGULO_DEG}}`
- Radio (m): `{{CARGA_RADIO_M}}`
- Partes de línea: `{{CARGA_PARTES_LINEA}}`
- Carga tabulada (TON): `{{CARGA_TABULADA_TON}}`
- Carga aplicada (TON): `{{CARGA_APLICADA_TON}}`
- Tiempo de prueba (min): `{{CARGA_TIEMPO_MIN}}`
- Resultado: `{{CARGA_RESULTADO}}`
- Observación cuantificada (si aplica): `{{CARGA_OBSERVACION_CRITICA}}`

### 2.9 Hallazgos críticos
`{{HALLAZGOS_CRITICOS}}`

### 2.10 Análisis de riesgo
- Severidad: `{{RIESGO_SEVERIDAD}}`
- Probabilidad: `{{RIESGO_PROBABILIDAD}}`
- Riesgo residual: `{{RIESGO_RESIDUAL}}`
- Impacto: `{{RIESGO_IMPACTO}}`

### 2.11 Dictamen final
**`{{DICTAMEN_FINAL_APTO_NO_APTO}}`**  
Justificación técnica: `{{DICTAMEN_JUSTIFICACION}}`

### 2.12 CAPA requerida (condicional)
> Obligatoria si dictamen es `NO_APTO`.

1. `{{CAPA_ACCION_1}}`
2. `{{CAPA_ACCION_2}}`
3. `{{CAPA_ACCION_3}}`
4. `{{CAPA_ACCION_4}}`

### 2.13 Trazabilidad y evidencias

#### 2.13.1 Índice de anexos
| ID anexo | Tipo | Sección que soporta | Descripción | Responsable | Fecha | Estado evidencia |
|---|---|---|---|---|---|---|
| `{{ANEXO_001_ID}}` | `{{ANEXO_001_TIPO}}` | `{{ANEXO_001_SECCION}}` | `{{ANEXO_001_DESC}}` | `{{ANEXO_001_RESP}}` | `{{ANEXO_001_FECHA}}` | `{{ANEXO_001_ESTADO}}` |
| `{{ANEXO_00N_ID}}` | `{{ANEXO_00N_TIPO}}` | `{{ANEXO_00N_SECCION}}` | `{{ANEXO_00N_DESC}}` | `{{ANEXO_00N_RESP}}` | `{{ANEXO_00N_FECHA}}` | `{{ANEXO_00N_ESTADO}}` |

#### 2.13.2 Referencias mínimas
- Registro fotográfico: `{{ANEXOS_FOTO_IDS}}`
- Metrología/calibración: `{{ANEXO_METROLOGIA_ID}}`
- Formatos de captura relacionados: `{{FRM_RELACIONADOS_IDS}}`

### 2.14 Bloque de firmas

| Rol | Nombre | Cargo | Firma | Fecha |
|---|---|---|---|---|
| Realizado por | `{{FIRMA_REALIZADO_NOMBRE}}` | `{{FIRMA_REALIZADO_CARGO}}` | `{{FIRMA_REALIZADO}}` | `{{FIRMA_REALIZADO_FECHA}}` |
| Verificado por | `{{FIRMA_VERIFICADO_NOMBRE}}` | `{{FIRMA_VERIFICADO_CARGO}}` | `{{FIRMA_VERIFICADO}}` | `{{FIRMA_VERIFICADO_FECHA}}` |
| Aprobado por *(obligatorio en FINAL)* | `{{FIRMA_APROBADO_NOMBRE}}` | `{{FIRMA_APROBADO_CARGO}}` | `{{FIRMA_APROBADO}}` | `{{FIRMA_APROBADO_FECHA}}` |

### 2.15 Resumen ejecutivo
`{{RESUMEN_EJECUTIVO}}`

---

## 3) Checklist pre-emisión (gate obligatorio)

Marcar `OK/NO` antes de emitir en `FINAL`.

| Ítem de control | Resultado |
|---|---|
| Código documental válido y único según estándar SGC | `{{QA_CODIGO_VALIDO}}` |
| Estado documental correcto (`FINAL`) | `{{QA_ESTADO_VALIDO}}` |
| 100% de campos obligatorios completos | `{{QA_CAMPOS_COMPLETOS}}` |
| No existen placeholders controlados sin reemplazar | `{{QA_SIN_PLACEHOLDERS}}` |
| Fechas consistentes (`inspección <= emisión`) | `{{QA_FECHAS_OK}}` |
| Resultados técnicos completos (checklist/PT/carga) | `{{QA_RESULTADOS_OK}}` |
| Dictamen final definido (`APTO/NO_APTO`) | `{{QA_DICTAMEN_OK}}` |
| CAPA incluida cuando aplica (`NO_APTO`) | `{{QA_CAPA_OK}}` |
| Trazabilidad completa de anexos y evidencias | `{{QA_TRAZABILIDAD_OK}}` |
| Bloque de firmas completo (realizado/verificado/aprobado) | `{{QA_FIRMAS_OK}}` |
| Revisión técnica aprobada | `{{QA_REV_TECNICA_OK}}` |
| Aprobación documental autorizada | `{{QA_APROBACION_DOC_OK}}` |

**Resultado del gate pre-emisión:** `{{QA_RESULTADO_GLOBAL_APROBADO_NO}}`  
**Observaciones QA:** `{{QA_OBSERVACIONES}}`

---

## 4) Placeholders controlados (política)

### 4.1 Permitidos solo en `BORRADOR` y `REVISION`
Se permite mantener placeholders `{{...}}` únicamente durante elaboración y revisión.

### 4.2 Prohibidos en `FINAL`
No puede existir ninguno de los siguientes en el documento final:
- Tokens `{{...}}` sin reemplazar.
- Códigos temporales o comodines (`XXX`, `00X`, `00?`).

### 4.3 Regla de verificación sugerida
- Regex detección placeholder: `\{\{[A-Z0-9_\-\.]+\}\}`
- Regex detección comodines prohibidos: `\b(XXX|00X|00\?)\b`

**Si una detección es positiva en estado `FINAL`: la emisión debe bloquearse.**

---

## 5) Control de cambios de plantilla

| Versión | Fecha | Autor | Cambio |
|---|---|---|---|
| v1 | 2026-02-26 | Equipo SGC | Creación de plantilla maestra Wave 2 (S3). |
