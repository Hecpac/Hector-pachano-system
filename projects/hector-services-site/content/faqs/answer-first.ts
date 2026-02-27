export type AnswerFirstFaq = {
  slug: string
  question: string
  title: string
  description: string
  shortAnswer: string
  process: string[]
  proof: string[]
  ctaLabel: string
  ctaHref: string
  relatedCase: {
    title: string
    href: string
    metric: string
  }
}

const answerFirstFaqs: AnswerFirstFaq[] = [
  {
    slug: 'que-es-aeo-para-b2b',
    question: '¿Qué es AEO para empresas B2B y cómo ayuda a vender más?',
    title: '¿Qué es AEO para empresas B2B y cómo impacta ventas?',
    description:
      'Guía rápida de AEO para B2B: qué es, cuándo aplicarlo y cómo convertirlo en pipeline comercial medible.',
    shortAnswer:
      'AEO (Answer Engine Optimization) es diseñar contenido para que motores de respuesta (Google AI Overviews, Copilot, ChatGPT, etc.) puedan entender, citar y recomendar tu propuesta con claridad. En B2B, funciona cuando cada página responde preguntas concretas con prueba y CTA claro.',
    process: [
      'Definir 10-15 preguntas de alto intento comercial por servicio.',
      'Crear páginas answer-first: respuesta directa arriba, evidencia en medio, CTA al final.',
      'Añadir estructura semántica y schema FAQ/Service para aumentar citabilidad.'
    ],
    proof: [
      'Caso SEO/AEO: +123% tráfico orgánico en 10 semanas.',
      'Queries comerciales top 10: +44% tras reestructurar arquitectura de intención.'
    ],
    ctaLabel: 'Quiero una auditoría AEO',
    ctaHref: '/auditor',
    relatedCase: {
      title: 'Visibilidad orgánica y AEO para capturar demanda de alto intento',
      href: '/cases/visibilidad-organica-aeo',
      metric: '+123% tráfico orgánico'
    }
  },
  {
    slug: 'cuanto-cuesta-diseno-web-b2b',
    question: '¿Cuánto cuesta un diseño web B2B orientado a conversión?',
    title: '¿Cuánto cuesta un sitio web B2B orientado a conversión?',
    description:
      'Rango de inversión para un sitio B2B con foco comercial, performance y SEO técnico en Next.js.',
    shortAnswer:
      'Depende del alcance, pero en práctica se define por sistema comercial (mensaje + prueba + CTA + medición), no por cantidad de páginas. Un MVP de captación serio suele requerir arquitectura, implementación performance-first e instrumentación de conversión.',
    process: [
      'Diagnóstico de embudo actual (mensaje, objeciones y fricciones).',
      'Definición de alcance por impacto: páginas críticas primero.',
      'Entrega por fases con medición real de conversión y performance.'
    ],
    proof: [
      'Caso landing B2B: +38% conversion rate con mismo tráfico.',
      'LCP móvil: de 3.9s a 2.3s tras optimización técnica + narrativa.'
    ],
    ctaLabel: 'Solicitar propuesta',
    ctaHref: '/contact',
    relatedCase: {
      title: 'Landing comercial de alta conversión con enfoque performance-first',
      href: '/cases/landing-alta-conversion',
      metric: '+38% conversion rate'
    }
  },
  {
    slug: 'como-automatizar-captura-leads-b2b',
    question: '¿Cómo automatizar captura y seguimiento de leads B2B sin perder calidad?',
    title: '¿Cómo automatizar leads B2B sin perder calidad comercial?',
    description:
      'Proceso práctico para automatizar captura, enrutamiento y seguimiento de leads con control operativo.',
    shortAnswer:
      'La clave no es solo conectar herramientas: es estandarizar datos, enrutar por intención y activar seguimiento con SLA visible. Sin eso, la automatización solo mueve el caos de lugar.',
    process: [
      'Normalizar formularios y campos críticos para evitar duplicados.',
      'Configurar reglas de enrutamiento por servicio, mercado y fit comercial.',
      'Automatizar seguimiento y alertas de SLA con dashboard diario.'
    ],
    proof: [
      'Caso automatización: -62% tiempo operativo semanal.',
      'Primera respuesta: de 4h a 43 min; tasa de contacto: +31%.'
    ],
    ctaLabel: 'Mapear mi flujo de leads',
    ctaHref: '/services/automatizaciones',
    relatedCase: {
      title: 'Pipeline de leads automatizado para reducir fricción operativa',
      href: '/cases/pipeline-leads-automatizado',
      metric: '-62% tiempo operativo'
    }
  },
  {
    slug: 'cuanto-tarda-seo-aeo-b2b',
    question: '¿Cuánto tarda ver resultados en SEO/AEO para B2B?',
    title: '¿Cuánto tarda SEO/AEO en generar resultados B2B?',
    description:
      'Expectativas realistas de tiempos para SEO/AEO en empresas B2B y cómo medir avance semanal.',
    shortAnswer:
      'La señal inicial suele verse en semanas (indexación, impresiones y consultas), pero el impacto comercial sostenido llega cuando hay arquitectura por intención + contenido citable + medición de conversiones, normalmente en ciclos de 8-12 semanas.',
    process: [
      'Semana 1-2: limpieza técnica (indexación, sitemap, canónicas, enlazado).',
      'Semana 3-6: páginas por intención + FAQs answer-first.',
      'Semana 7-12: iteración por queries comerciales y mejora de CTA.'
    ],
    proof: [
      'Caso real: +123% sesiones orgánicas en ventana de 10 semanas.',
      'Clicks en queries comerciales: +71% tras estrategia por intención.'
    ],
    ctaLabel: 'Ver servicio SEO/AEO',
    ctaHref: '/services/seo-aeo',
    relatedCase: {
      title: 'Visibilidad orgánica y AEO para capturar demanda de alto intento',
      href: '/cases/visibilidad-organica-aeo',
      metric: '+71% clicks cualificados'
    }
  },
  {
    slug: 'migrar-wordpress-webflow-a-nextjs-b2b',
    question: '¿Cuándo conviene migrar de WordPress/Webflow a Next.js en B2B?',
    title: '¿Cuándo migrar de WordPress o Webflow a Next.js en B2B?',
    description:
      'Señales claras para migrar tu stack web a Next.js cuando buscas velocidad, control y conversiones estables.',
    shortAnswer:
      'Conviene migrar cuando tu sitio limita performance, personalización comercial o integraciones. Si el equipo tarda en publicar cambios clave, hay conflicto de plugins o el embudo no permite iterar rápido, ya estás pagando costo de oportunidad.',
    process: [
      'Auditar fricciones técnicas y comerciales del stack actual.',
      'Priorizar una migración por fases (páginas de mayor impacto primero).',
      'Mantener SEO técnico y medición para evitar caída de demanda.'
    ],
    proof: [
      'Mejoras recurrentes en Core Web Vitals en implementaciones Next.js.',
      'Mayor velocidad de iteración para tests de copy/CTA y embudo.'
    ],
    ctaLabel: 'Evaluar migración técnica',
    ctaHref: '/contact',
    relatedCase: {
      title: 'Landing comercial de alta conversión con enfoque performance-first',
      href: '/cases/landing-alta-conversion',
      metric: 'LCP móvil -41%'
    }
  }
]

export function getAnswerFirstFaqs() {
  return answerFirstFaqs
}

export function getAnswerFirstFaqBySlug(slug: string) {
  return answerFirstFaqs.find((item) => item.slug === slug)
}
