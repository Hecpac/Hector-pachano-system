# SGC Wave 3 — S6 Flujo de Aprobación v1

**Código:** `WF-SGC-APR-v1`  
**Estados normados:** `Draft` / `Review` / `Approved` / `Rejected`  
**Aplica a:** informes SGC tipo REG y sus anexos asociados.

## 1) Objetivo
Definir un flujo único de control documental con roles, reglas de transición y condiciones de bloqueo para garantizar trazabilidad y calidad antes de emitir un informe.

## 2) Roles

| Rol | Responsabilidad principal | Permisos |
|---|---|---|
| **Autor (Inspector líder)** | Elaborar contenido técnico y anexar evidencias iniciales. | Crear/editar en `Draft`, enviar a `Review`. |
| **Revisor técnico (Inspector END / Verificador)** | Verificar consistencia técnica, normativa y metrológica. | Aprobar/rechazar en `Review` con observaciones obligatorias. |
| **Aprobador documental/técnico** | Autorizar emisión final y cumplimiento SGC. | Mover de `Review` a `Approved` o `Rejected`. |
| **QA documental (custodio SGC)** | Control de forma, codificación y trazabilidad. | Bloquear promoción si falla validador S5 o naming/anexos. |

## 3) Definición de estados

### 3.1 Draft
- Documento en elaboración.
- Puede contener placeholders y anexos legacy temporales.
- No apto para emisión externa.

### 3.2 Review
- Documento congelado para revisión técnica.
- Requiere ejecución del validador S5 y registro de resultados.
- Cambios solo por ciclo de observaciones.

### 3.3 Approved
- Documento autorizado para emisión `FINAL`.
- Requisitos: `FAIL=0` en S5, firmas completas, trazabilidad conforme, dictamen válido.
- Código y versión quedan controlados (no mutar código).

### 3.4 Rejected
- Documento rechazado por incumplimiento técnico/documental.
- Debe registrar motivo y acciones correctivas.
- Puede volver a `Draft` para retrabajo con nueva iteración de revisión.

## 4) Reglas de transición

| Origen | Destino | Quién ejecuta | Condiciones |
|---|---|---|---|
| Draft | Review | Autor | Estructura completa mínima + anexos referenciados + autochequeo inicial. |
| Review | Draft | Revisor/QA | Observaciones abiertas o correcciones solicitadas. |
| Review | Approved | Aprobador | `FAIL=0` en S5, dictamen final explícito, firmas completas, trazabilidad válida. |
| Review | Rejected | Aprobador | Hallazgos críticos no resueltos o evidencia insuficiente. |
| Rejected | Draft | Autor | Plan de corrección documentado y aceptación de retrabajo. |

## 5) Reglas obligatorias (gate)
1. **Ningún documento pasa a `Approved` con `FAIL>0` en S5.**
2. En estado equivalente a `FINAL`, no se permiten placeholders (`{{...}}`, `[...]`, `XXX`, `00X`).
3. Si dictamen es `NO APTO`, CAPA es obligatoria y debe estar accionable.
4. Bloque de firmas completo para aprobación final (Realizado, Verificado, Aprobado).
5. Todo anexo citado debe tener referencia trazable en la sección técnica correspondiente.

## 6) SLA y gobierno operativo
- Tiempo objetivo de revisión técnica: **<= 2 días hábiles**.
- Tiempo objetivo de aprobación final tras revisión conforme: **<= 1 día hábil**.
- Si un documento permanece >5 días hábiles en `Review`, escalar a coordinación SGC.

## 7) Registro mínimo de auditoría por transición
Cada transición debe registrar:
- `documento_codigo`
- `version`
- `estado_origen`
- `estado_destino`
- `usuario_rol`
- `fecha_hora`
- `resultado_validacion_s5` (PASS/WARN/FAIL + conteos)
- `comentarios`

## 8) Ejemplo de flujo resumido
`Draft` (Autor) → `Review` (Revisor + QA) → `Approved` (Aprobador) → Emisión.

Si hay incumplimiento:
`Review` → `Rejected` → `Draft` (corrección) → `Review`.
