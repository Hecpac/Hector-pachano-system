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
- **SEO/AEO:** Metadata API + Open Graph por ruta + JSON-LD + robots/sitemap
- **Tracking base:** eventos `lead_form_submit_success` y `calendar_click` (dataLayer)

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
   - `NEXT_PUBLIC_GTM_ID` o `NEXT_PUBLIC_GA_ID`
   - `LEAD_WEBHOOK_URL`, `LEAD_WEBHOOK_BACKUP_URL`, `LEAD_WEBHOOK_BEARER_TOKEN` (recomendado para CRM/n8n)
   - `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (fallback email)

Comportamiento de seguridad:
- En **desarrollo**, si no hay canales de entrega configurados, el formulario usa modo local.
- En **producción**, si no hay webhook ni Resend configurado, devuelve error (evita pérdida silenciosa de leads).

## SEO / Search Console

Checklist operativo:
- `docs/seo/search-console-checklist.md`

## Estructura clave

- `app/` rutas y páginas
- `lib/seo/` metadata helpers y schemas
- `lib/analytics/` tracking client-side
- `public/images/` assets visuales
- `docs/` wireframes, referencias y checklists
