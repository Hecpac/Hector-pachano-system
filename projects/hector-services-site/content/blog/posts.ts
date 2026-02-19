export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  readingTime: string
  tags: string[]
  content: string[]
}

const posts: BlogPost[] = [
  {
    slug: 'automatizaciones-que-si-venden',
    title: 'Automatizaciones que sí venden: 5 flujos clave para crecer sin fricción',
    excerpt:
      'Cómo diseñar automatizaciones comerciales que reducen tiempos de respuesta y mejoran conversión desde la primera semana.',
    publishedAt: '2026-02-19',
    readingTime: '6 min',
    tags: ['Automatizaciones', 'Growth', 'Operación'],
    content: [
      'La mayoría de negocios automatiza tareas sueltas, pero no el flujo completo. El resultado: herramientas conectadas a medias y equipos que siguen resolviendo cuellos de botella manualmente.',
      'Un sistema que vende mejor comienza con lead intake limpio, enrutamiento por prioridad, seguimiento automático y visibilidad operativa. Sin esos cuatro bloques, la automatización se queda en “nice to have”.',
      'Empieza por medir tiempo de primera respuesta, tasa de contacto efectivo y número de leads sin seguimiento. Esas tres métricas te dirán dónde atacar primero para liberar capacidad y aumentar ingresos.'
    ]
  },
  {
    slug: 'diseno-web-conversion-b2b',
    title: 'Diseño web B2B orientado a conversión: estructura antes que decoración',
    excerpt:
      'Un framework práctico para diseñar páginas de servicios que transmiten autoridad y convierten tráfico en oportunidades.',
    publishedAt: '2026-02-18',
    readingTime: '5 min',
    tags: ['Diseño Web', 'B2B', 'Conversión'],
    content: [
      'El error más común en webs de servicios es priorizar estética sin estrategia de lectura. Un sitio bonito que no guía decisión comercial pierde dinero.',
      'La estructura base debe resolver en orden: propuesta de valor, prueba de capacidad, claridad de proceso y llamada a la acción. Cuando ese flujo está bien planteado, el diseño potencia en lugar de distraer.',
      'Antes de cambiar colores o animaciones, valida si el visitante entiende qué haces, para quién y qué sigue después. Si esa respuesta no es inmediata, el problema no es visual: es arquitectura de contenido.'
    ]
  },
  {
    slug: 'seo-aeo-para-marcas-de-servicio',
    title: 'SEO + AEO para marcas de servicio: cómo ganar visibilidad en Google y en respuestas IA',
    excerpt:
      'Qué cambia con AEO, cómo afecta tu estrategia de contenidos y qué implementar primero para capturar demanda orgánica.',
    publishedAt: '2026-02-17',
    readingTime: '7 min',
    tags: ['SEO', 'AEO', 'Contenido'],
    content: [
      'Hoy no basta con rankear en resultados clásicos. También necesitas aparecer en respuestas generadas por sistemas de IA que sintetizan fuentes.',
      'La base sigue siendo SEO técnico y contenido útil, pero AEO exige estructura semántica, entidades claras y páginas que respondan preguntas concretas con contexto verificable.',
      'En la práctica: define clusters por intención, implementa schema en páginas clave y mejora consistencia de marca en todo el sitio. Esa combinación aumenta tu probabilidad de ser citado por buscadores y asistentes.'
    ]
  }
]

export function getBlogPosts() {
  return posts.toSorted((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
}

export function getBlogPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug)
}
