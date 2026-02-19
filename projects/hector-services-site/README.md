# Hector Services Site

Sitio inspirado en la referencia visual de Foundry (Basement), adaptado a venta de servicios B2B:
- Automatizaciones
- Diseño Web
- SEO/AEO

## Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Lenguaje:** TypeScript estricto
- **Estilos:** CSS global custom + sistema de motion responsive
- **Deploy:** Vercel
- **SEO/AEO:** Metadata API + Open Graph dinámico + JSON-LD + robots/sitemap
- **Tracking base:** eventos `lead_form_submit_success` y `calendar_click`

## Ejecutar local

```bash
npm install
npm run dev
```

## Variables de entorno

1. Copia `.env.example` a `.env.local`
2. Configura:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_CAL_LINK`
   - `GOOGLE_SITE_VERIFICATION` (recomendado)
   - `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`

Si faltan variables de Resend, el formulario sigue operando en modo local (sin envío externo) para no bloquear desarrollo.

## SEO / Search Console

Checklist operativo:
- `docs/seo/search-console-checklist.md`

## Estructura clave

- `app/` rutas y páginas
- `lib/seo/` metadata helpers y schemas
- `lib/analytics/` tracking client-side
- `public/images/` assets visuales
- `docs/` wireframes, referencias y checklists
