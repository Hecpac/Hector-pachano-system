# OpenClaw Agent Team Setup (2026-02-25)

Se configuró un equipo de 4 agentes por rol:

- dev → /Users/hector/agents/dev
- marketing → /Users/hector/agents/marketing
- ops → /Users/hector/agents/ops
- assistant → /Users/hector/agents/assistant

## Modelos
- dev: openai-codex/gpt-5.3-codex
- marketing: google-gemini-cli/gemini-3-pro-preview
- ops: anthropic/claude-sonnet-4-6
- assistant: anthropic/claude-opus-4-6

## Skills base creados
- dev/skills/bug-triage/SKILL.md
- marketing/skills/content-radar/SKILL.md
- ops/skills/health-audit/SKILL.md
- assistant/skills/daily-brief/SKILL.md

## Cron jobs creados
- dev-daily-triage (cada 1 día)
- marketing-content-radar (cada 12h)
- ops-health-audit (cada 6h)
- assistant-morning-brief (08:00 America/Chicago)

## Notas
- Se ejecutó `openclaw doctor --fix`.
- Los jobs entregan resultado por announce al canal último activo.
