# GEMINI.md - Hector Services Site

## Project Overview
**Hector Services Site** is a high-performance B2B services platform built with **Next.js 16 (App Router)** and **React 19**. It is designed with a "cinematic" and "editorial" aesthetic (inspired by Foundry/Basement) to showcase and sell digital systems: **Automatizaciones**, **Diseño Web**, and **SEO/AEO**.

### Core Technologies
- **Framework:** Next.js 16 (App Router) + React 19
- **Language:** Strict TypeScript
- **Styling:** Tailwind CSS 4.0 + Custom CSS (`app/globals.css`)
- **Fonts:** Bebas Neue (Display) & DM Mono (Monospace)
- **Email:** Resend (for lead form submissions)
- **Analytics:** GTM/GA via custom dataLayer events (`lead_form_submit_success`, `calendar_click`)
- **Deployment:** Vercel

---

## Building and Running

### Commands
- **Install Dependencies:** `npm install`
- **Development Server:** `npm run dev`
- **Build for Production:** `npm run build`
- **Start Production Server:** `npm run start`
- **Linting:** `npm run lint`

### Environment Variables
Configure these in `.env.local` (see `.env.example` for details):
- `NEXT_PUBLIC_SITE_URL`: Base URL for SEO and canonicals.
- `NEXT_PUBLIC_CAL_LINK`: Link to Cal.com for diagnostics.
- `RESEND_API_KEY`: API key for email delivery.
- `GOOGLE_SITE_VERIFICATION`: Token for Google Search Console.
- `NEXT_PUBLIC_GTM_ID`: Google Tag Manager ID.

---

## Development Conventions

### SEO & Metadata
- **Page Metadata:** Always use the `buildPageMetadata` helper from `@/lib/seo/meta` within `page.tsx` files.
- **JSON-LD:** Include structural data using the `JsonLd` component from `@/components/ui/json-ld` and schemas from `@/lib/seo/schema`.
- **OpenGraph:** Images are dynamically served via `opengraph-image.tsx` routes in each directory.

### UI & Architecture
- **App Router:** Use the `app/` directory for routing and layouts.
- **Sections:** Reusable page sections reside in `components/sections/`.
- **UI Components:** Generic primitives are in `components/ui/`.
- **Content:** Blog posts and Case Studies are managed as static TypeScript objects in the `content/` directory.

### Styling Patterns
- Use **Tailwind CSS 4.0** for utility classes where applicable, but rely on **Global CSS** in `app/globals.css` for complex editorial layouts and motion effects.
- Adhere to the design tokens: `Orange (#FF4D00)` for primary actions and `Black/Dark` for the dominant aesthetic.

### Tracking
- Client-side events should be pushed to the `dataLayer` via the helpers in `lib/analytics/events.ts`.
- Critical events: `lead_form_submit_success` and `calendar_click`.

---

## Key Files & Directories
- `app/`: Next.js 16 routes and global layout.
- `components/`: UI library and page sections.
- `content/`: Source of truth for blog posts and case studies.
- `lib/seo/`: SEO configuration, meta builders, and schema definitions.
- `docs/`: Reference notes, wireframes, and SEO checklists.
- `public/images/`: Visual assets, including SVGs for case studies and logos.
