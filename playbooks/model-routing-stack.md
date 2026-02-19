# Playbook — Router Multi-LLM (OpenClaw stack actual)

## Objetivo
Usar cada modelo donde rinde mejor y mantener un cierre técnico consistente.

## Flujo por tipo de tarea
1. **Ideación / diseño / variantes** → `google-gemini-cli/gemini-3-pro-preview`
2. **Implementación / refactor / fixes / pruebas** → `openai-codex/gpt-5.3-codex`
3. **Review profundo / análisis de riesgo** → `anthropic/claude-sonnet-4-6`
4. **Escalación crítica** → `anthropic/claude-opus-4-6`

## Regla de oro
- Si Sonnet/Opus/Gemini generan código, **Codex hace validación final y cierre técnico**.

## Checklist mínimo de cierre
- [ ] Cambios implementados
- [ ] Verificación real (comandos/tests/logs)
- [ ] Riesgos/pendientes explícitos
- [ ] Resumen corto y accionable

## Notas del stack actual
- Primary: `openai-codex/gpt-5.3-codex`
- Fallbacks: Gemini → Sonnet 4.5 → Opus 4.6 → Sonnet 4.6 → GPT-5.2 → GPT-5.2-codex
- Anthropic en modo `api_key`
