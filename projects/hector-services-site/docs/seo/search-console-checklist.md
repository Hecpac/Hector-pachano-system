# Search Console + Analytics Checklist

## Antes de conectar
- [ ] Definir dominio final en `.env.local`: `NEXT_PUBLIC_SITE_URL`
- [ ] Publicar sitio en producción (HTTPS activo)
- [ ] Confirmar que `robots.txt` y `sitemap.xml` responden

## Google Search Console
- [ ] Crear propiedad por **Dominio** o **URL Prefix**
- [ ] Agregar token en `.env.local`: `GOOGLE_SITE_VERIFICATION`
- [ ] Desplegar nuevamente y validar propiedad
- [ ] Enviar sitemap: `https://tu-dominio.com/sitemap.xml`
- [ ] Verificar páginas indexadas en informe de cobertura

## Conversion tracking base (ya implementado)
Eventos expuestos en cliente:
- `lead_form_submit_success`
- `calendar_click`

### Integración rápida con GTM/dataLayer
- [ ] Definir `NEXT_PUBLIC_GTM_ID` (o `NEXT_PUBLIC_GA_ID` si no usarás GTM)
- [ ] Confirmar que `window.dataLayer` esté presente en producción
- [ ] Crear triggers por evento en GTM
- [ ] Crear conversiones en GA4 para ambos eventos

## Revisión semanal (30 min)
- [ ] Consultas top en Search Console
- [ ] CTR de páginas /services/*
- [ ] Errores de cobertura/indexación
- [ ] Core Web Vitals en producción
