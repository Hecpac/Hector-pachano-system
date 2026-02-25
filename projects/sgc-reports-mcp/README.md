# sgc-reports-mcp

MCP server local para generar reportes SGC en:
- **Word (.docx)**
- **Excel (.xlsx)**
- **PDF (.pdf)**

Sin Microsoft 365. Todo local/open-source.

## Tools expuestos

1. `build_report_data(title, summary, sections, metrics)`
2. `render_docx(data, output_name, template_path?)`
3. `render_xlsx(data, output_name)`
4. `render_pdf(data, output_name)`

## Uso rápido

```bash
cd projects/sgc-reports-mcp
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python server.py
```

## Conectar desde un host MCP (STDIO)

Ejemplo de config:

```json
{
  "mcpServers": {
    "sgc-reports": {
      "command": "python",
      "args": ["/ABSOLUTE/PATH/projects/sgc-reports-mcp/server.py"]
    }
  }
}
```

## Notas

- Salidas se guardan en `./out/`.
- Incluye plantilla base: `templates/sgc_template.docx`.
- Si `template_path` no existe, se usa plantilla simple generada en runtime.
- PDF usa WeasyPrint desde HTML.

## Generar ejemplo completo

```bash
cd projects/sgc-reports-mcp
source .venv/bin/activate
python examples_generate_sample.py
```
