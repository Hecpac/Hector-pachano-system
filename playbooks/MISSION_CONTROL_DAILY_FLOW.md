# Mission Control — Flujo diario operativo

## Objetivo
Convertir el día en un loop estable: brief útil, prioridades claras, aprobaciones sin bloqueo y cierre con control de riesgo.

## Flujo recomendado
1. **Morning brief (08:05 CT)**
   - IA global (máx 3 bullets con fuente+link)
   - Prioridades del día (PHD, TCinsurance, SGC; QTS si aplica)
   - Aprobaciones/bloqueos críticos
   - Acción #1 (<5 min)

2. **Bloque de ejecución (mañana/tarde)**
   - Ejecutar por impacto y no por ruido.
   - Usar reverse prompting para destrabar y elegir ruta.

3. **Aprobaciones**
   - Revisar pendientes que frenan deploy/operación.
   - Resolver primero bloqueos de dependencia externa.

4. **Closeout (18:00 CT)**
   - Estado final por proyecto.
   - Riesgo principal abierto.
   - Acción única para mañana.

## Prompts rápidos
- Reverse prompt:
  - "Con base en mi meta [META], propón la mejor ruta hoy. Devuelve: objetivo, primer paso (<5 min), riesgo principal y criterio de terminado."
- Cierre corto:
  - "Cierra el día en 5 bullets: qué avanzó, qué quedó bloqueado, riesgo principal, acción única de mañana y criterio de éxito."