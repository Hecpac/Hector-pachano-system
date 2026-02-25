from server import build_report_data, render_docx, render_xlsx, render_pdf

sections = [
    {"heading": "Estado operativo", "body": "El sistema se mantuvo estable durante la ventana de monitoreo."},
    {"heading": "Incidentes", "body": "No se registraron incidentes críticos. Se atendieron 2 alertas menores."},
    {"heading": "Siguientes pasos", "body": "1) Afinar umbrales de alertas\n2) Automatizar distribución semanal"},
]

metrics = {
    "Reportes generados": 14,
    "SLA cumplimiento": "99.2%",
    "Alertas críticas": 0,
    "Alertas menores": 2,
}

data = build_report_data(
    title="SGC - Reporte Semanal",
    summary="Resumen ejecutivo del estado operativo y métricas clave de la semana.",
    sections=sections,
    metrics=metrics,
)

print(render_docx(data, "sgc-reporte-semanal", "templates/sgc_template.docx"))
print(render_xlsx(data, "sgc-reporte-semanal"))
print(render_pdf(data, "sgc-reporte-semanal"))
