# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### Telegram

- Primary DM chatId (Hector): 574707975

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

### Subagent preset (quick reference)

- Depth máximo: `2`
- Hijos por agente: `2-3`
- Paralelos totales: `<=6`
- Siempre definir: objetivo, entregable, criterio de done, límite de tiempo/costo/tokens
- Siempre cerrar con: validación técnica final de Codex + checks reales

### Regla fija — Codex vs Gemini

- Implementación, refactor, debug, tests, cierre técnico → **Codex**.
- Deep-dive estratégico, hipótesis, diseño de experimentos → **Gemini**.
- Tareas mixtas (estrategia + código) → **Gemini diseña, Codex ejecuta y valida**.
- Cambios sensibles en riesgo/producción → **Codex como gate final**.

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.
