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
   - `LEAD_WEBHOOK_URL`, `LEAD_WEBHOOK_BACKUP_URL`, `LEAD_WEBHOOK_BEARER_TOKEN` (recomendado para CRM)
   - `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (fallback email)
   - `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `CRON_SECRET` (cola de reintentos sin n8n)

Comportamiento de seguridad:
- En **desarrollo**, si no hay canales de entrega configurados, el formulario usa modo local.
- En **producción**, si no hay webhook ni Resend configurado, devuelve error (evita pérdida silenciosa de leads).

## Automatización directa (sin n8n)

El flujo de leads soporta reintentos automáticos nativos en Vercel:

- Realtime: intenta enviar al webhook (primario + backup) y a Resend.
- Si todo falla: encola el lead en Vercel KV.
- Cron: `vercel.json` ejecuta `/api/leads/retry` cada 10 minutos.
- Seguridad: la ruta de retry valida `Authorization: Bearer <CRON_SECRET>` en producción.

Ruta de retry manual:

```bash
curl -X POST "https://tu-dominio.com/api/leads/retry?max=20" \
  -H "Authorization: Bearer $CRON_SECRET"
```

## SEO / Search Console

Checklist operativo:
- `docs/seo/search-console-checklist.md`

## Estructura clave

- `app/` rutas y páginas
- `lib/seo/` metadata helpers y schemas
- `lib/analytics/` tracking client-side
- `public/images/` assets visuales
- `docs/` wireframes, referencias y checklists
