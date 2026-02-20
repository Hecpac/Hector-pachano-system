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
    slug: 'si-la-ia-no-te-ve-2026-w08',
    title: 'Si la IA no te ve: tu web antigua es invisible en búsquedas con IA y cómo resolverlo',
    excerpt:
      'Audita 5 páginas clave, agrega FAQs con schema y mejora velocidad móvil para que Google y asistentes de IA puedan citar tu negocio B2B.',
    publishedAt: '2026-02-20',
    readingTime: '4 min',
    tags: ['AEO', 'SEO', 'Web', 'Conversión'],
    content: [
      'Muchas webs B2B antiguas dependen de plantillas pesadas, contenido genérico y estructura pobre. Resultado: los motores generativos no entienden qué vendes, a quién ayudas ni por qué elegirte, y terminas fuera de respuestas y comparativas.',
      'La solución práctica es simple: primero, define una página por servicio con problema, resultado y casos reales; segundo, añade bloques de preguntas frecuentes con marcado schema (FAQ y Organization); tercero, corrige rendimiento móvil y enlaces internos para que el rastreo sea claro y rápido.',
      'Si quieres saber exactamente qué está bloqueando tu visibilidad, agenda un diagnóstico técnico-comercial: en una sesión te mostramos brechas concretas y un plan de ejecución en 30 días.'
    ]
  },
  {
    slug: 'agentes-ia-vs-automatizacion-tradicional',
    title: 'De Zapier a Agentes Autónomos: El futuro de la operación B2B en 2026',
    excerpt:
      'La automatización tradicional basada en reglas (if-then) se queda corta. Descubre cómo los flujos de trabajo "agentic" están transformando las ventas y la atención al cliente.',
    publishedAt: '2026-02-19',
    readingTime: '6 min',
    tags: ['Automatizaciones', 'Agentes IA', 'Operación'],
    content: [
      'Durante años, la automatización en B2B dependió de herramientas rígidas como Zapier o Make. Si pasaba X, entonces ocurría Y. Pero, ¿qué pasa cuando "X" es un correo ambiguo de un lead?',
      'En 2026, los Agentes Autónomos impulsados por LLMs han cambiado las reglas del juego. Ya no programas rutas cerradas, programas objetivos. Un agente puede leer un correo, decidir si es un prospecto calificado, redactar una respuesta personalizada consultando tu base de datos interna y agendar una reunión.',
      'Implementar flujos "agentic" en tu departamento de ventas o soporte no solo reduce el trabajo manual a casi cero, sino que mejora drásticamente la experiencia del cliente al ofrecer interacciones hiper-personalizadas y en tiempo real.'
    ]
  },
  {
    slug: 'rendimiento-web-react-19-conversion',
    title: 'React 19 y Next.js 16: Por qué el rendimiento técnico es tu mejor comercial',
    excerpt:
      'Un sitio web B2B lento pierde credibilidad. Cómo las nuevas capacidades de Server Components y Server Actions impactan directamente en tu pipeline comercial.',
    publishedAt: '2026-02-18',
    readingTime: '5 min',
    tags: ['Diseño Web', 'Performance', 'React 19'],
    content: [
      'El diseño visual atrapa, pero el rendimiento técnico retiene. Un usuario B2B evalúa inconscientemente la calidad de tus servicios basándose en cómo de rápido y fluido responde tu sitio web.',
      'Con la consolidación de React 19 y Next.js 16, hemos eliminado los temidos "waterfalls" (cargas en cascada) y los destellos de hidratación. Las Server Actions permiten enviar formularios de leads sin cargar pesadas librerías de JavaScript en el navegador del usuario.',
      '¿El resultado? Sitios web que cargan instantáneamente en dispositivos móviles y de escritorio. Cuando tu sitio transmite esta sensación de solidez técnica ("cinematic and snappy"), tu propuesta de valor se percibe como más confiable y profesional.'
    ]
  },
  {
    slug: 'estrategia-aeo-2026',
    title: 'Answer Engine Optimization (AEO): Sobreviviendo a la Búsqueda Generativa',
    excerpt:
      'Google y los asistentes de IA ya no solo listan enlaces, ahora responden directamente. Cómo adaptar tu contenido B2B para ser la fuente citada por la Inteligencia Artificial.',
    publishedAt: '2026-02-15',
    readingTime: '8 min',
    tags: ['SEO', 'AEO', 'Estrategia'],
    content: [
      'El paradigma ha cambiado por completo. Los usuarios B2B ya no buscan "agencias de diseño web" para abrir 10 pestañas. Le preguntan a su asistente de IA: "¿Qué agencias implementan React 19 y tienen casos de éxito comprobables?".',
      'Aquí es donde entra el AEO (Answer Engine Optimization). Para ser recomendado por motores generativos (LLMs), tu contenido debe ser estructurado, factual y semánticamente claro. Ya no sirve rellenar de palabras clave; necesitas construir "entidades" digitales sólidas.',
      'El primer paso es implementar schemas JSON-LD exhaustivos (FAQ, Organization, CaseStudy) y responder de forma directa y concisa a las preguntas de tu cliente ideal. Si tu sitio web facilita el trabajo de extracción de datos a la IA, la IA te recomendará como experto.'
    ]
  },
  {
    slug: 'automatizaciones-que-si-venden',
    title: 'Automatizaciones que sí venden: 5 flujos clave para crecer sin fricción',
    excerpt:
      'Cómo diseñar automatizaciones comerciales que reducen tiempos de respuesta y mejoran conversión desde la primera semana.',
    publishedAt: '2026-02-10',
    readingTime: '6 min',
    tags: ['Automatizaciones', 'Growth', 'Operación'],
    content: [
      'La mayoría de negocios automatiza tareas sueltas, pero no el flujo completo. El resultado: herramientas conectadas a medias y equipos que siguen resolviendo cuellos de botella manualmente.',
      'Un sistema que vende mejor comienza con lead intake limpio, enrutamiento por prioridad, seguimiento automático y visibilidad operativa. Sin esos cuatro bloques, la automatización se queda en “nice to have”.',
      'Empieza por medir tiempo de primera respuesta, tasa de contacto efectivo y número de leads sin seguimiento. Esas tres métricas te dirán dónde atacar primero para liberar capacidad y aumentar ingresos.'
    ]
  },
  {
    slug: 'escalabilidad-sin-caos',
    title: 'Escalabilidad sin Caos: Cuándo pasar de plantillas a desarrollo a medida',
    excerpt: 'Llega un punto en el que WordPress o Webflow te frenan. Descubre las señales clave para migrar a un stack moderno con Next.js y React.',
    publishedAt: '2026-02-05',
    readingTime: '7 min',
    tags: ['Diseño Web', 'Arquitectura', 'Escalabilidad'],
    content: [
      'Empezar con una plantilla de WordPress o un constructor visual es la decisión correcta para validar una idea. Pero cuando tu negocio escala y necesitas integraciones profundas o tiempos de carga de milisegundos, estas herramientas se convierten en tu mayor cuello de botella.',
      'Las señales son claras: tu equipo de marketing tarda horas en publicar un simple caso de estudio, los plugins entran en conflicto constante, y tu puntuación de Core Web Vitals está en rojo.',
      'Migrar a un desarrollo a medida con Next.js y React 19 no es un capricho técnico, es una inversión en estabilidad operativa. Ganas control total sobre la experiencia de usuario, flexibilidad para integrarte con cualquier CRM moderno, y una base técnica que soporta tu crecimiento sin tambalearse.'
    ]
  },
  {
    slug: 'seo-tecnico-b2b',
    title: 'SEO Técnico B2B: Más allá del contenido, la arquitectura que posiciona',
    excerpt: 'El mejor artículo del mundo no posiciona si los robots no pueden rastrearlo. Una guía sobre renderizado, canonicals y velocidad.',
    publishedAt: '2026-01-28',
    readingTime: '5 min',
    tags: ['SEO', 'Performance', 'Arquitectura'],
    content: [
      'Muchas empresas invierten miles de dólares en redactores de contenido, pero olvidan la base piramidal del SEO: la salud técnica de su plataforma web.',
      'Si tu sitio web utiliza Client-Side Rendering (CSR) sin pre-renderizado, le estás dificultando la vida a los rastreadores de Google. El Server-Side Rendering (SSR) o Static Site Generation (SSG) que ofrecen frameworks como Next.js aseguran que el contenido esté disponible desde el primer milisegundo.',
      'Además de la arquitectura de renderizado, pequeños detalles como etiquetas canonical correctamente configuradas, un sitemap dinámico sin errores 404, y una jerarquía de enlaces internos lógica, marcan la diferencia entre estar en la primera página o ser invisible para tu cliente ideal.'
    ]
  }
]

export function getBlogPosts() {
  return posts.toSorted((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
}

export function getBlogPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug)
}
