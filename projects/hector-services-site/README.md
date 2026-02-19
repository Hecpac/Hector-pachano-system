# Hector Services Site

Sitio inspirado en la referencia visual de Foundry (Basement), adaptado a venta de servicios B2B:
- Automatizaciones
- Diseño Web
- SEO/AEO

## Stack propuesto

- **Framework:** Next.js 15 (App Router) + React 19
- **Lenguaje:** TypeScript estricto
- **Estilos:** CSS global (base) + Tailwind v4 listo para activar
- **Deploy:** Vercel
- **SEO/AEO:** Metadata API + Open Graph + Schema (siguiente fase)
- **Analytics (siguiente fase):** Vercel Analytics o Plausible

## Ejecutar local

```bash
npm install
npm run dev
```

## Estructura clave

- `app/` rutas y páginas
- `public/images/` placeholders visuales para reemplazo posterior
- `content/` casos, testimonios y FAQs
- `docs/` wireframes y copy

## Próximos pasos (inmediatos)

1. Reemplazar placeholders por imágenes reales de casos
2. Definir color acento definitivo (índigo o verde neón)
3. Conectar formulario de contacto (Resend/Cal)
4. Cargar 2-3 casos con métricas reales
5. Agregar schema de `ProfessionalService` + FAQ

