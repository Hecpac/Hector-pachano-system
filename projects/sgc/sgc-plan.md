# SGC — Estandarización y Operación Documental

## Objetivo
Implementar flujo SGC confiable para generación, revisión, aprobación y trazabilidad de informes técnicos.

## Done (gate)
- Plantillas estandarizadas y versionadas.
- Validación automática de campos críticos.
- Flujo Draft → Review → Approved con trazabilidad.
- Folios únicos y consistentes.
- Evidencia anexada y audit trail completo.

## Tareas

- [ ] S1 Levantamiento de formatos y normativa
  - depends_on: []
  - salida: inventario de formatos + reglas obligatorias

- [ ] S2 Modelo de datos SGC (campos obligatorios/opcionales)
  - depends_on: [S1]
  - salida: diccionario de datos oficial

- [x] S3 Plantilla maestra de informe
  - depends_on: [S2]
  - salida: plantilla única con secciones obligatorias (objetivo, alcance, resultados, dictamen, CAPA, trazabilidad)

- [x] S4 Regla de codificación documental
  - depends_on: [S1]
  - salida: estándar tipo `REG-SGC-MEC-YYYY-###`

- [x] S5 Validador automático de calidad documental
  - depends_on: [S2, S3, S4]
  - checks: campos vacíos, fechas, firmas, unidades, anexos

- [x] S6 Flujo de aprobación (roles y estados)
  - depends_on: [S3]
  - estados: Draft / Revisión Técnica / Aprobado / Rechazado

- [x] S7 Trazabilidad de anexos y evidencias
  - depends_on: [S4]
  - salida: convención de nombres + índice de anexos

- [ ] S8 Checklist QA pre-emisión
  - depends_on: [S5, S6, S7]
  - salida: checklist final obligatorio

- [ ] S9 Piloto con 3 informes reales
  - depends_on: [S8]
  - salida: hallazgos + ajustes

- [ ] S10 Cierre operativo
  - depends_on: [S9]
  - salida: SOP + guía de uso + métricas de cumplimiento

## Validación mínima
- 100% de campos obligatorios completos.
- 0 códigos duplicados.
- 100% de anexos referenciados en informe.
- Checklist QA aprobado antes de emitir.

## Estrategia de ejecución (waves)
- Wave 1: S1 S2
- Wave 2: S3 S4
- Wave 3: S5 S6 S7
- Wave 4: S8 S9
- Wave 5: S10
