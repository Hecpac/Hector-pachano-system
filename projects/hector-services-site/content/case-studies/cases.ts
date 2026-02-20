export type CaseService = 'Automatizaciones' | 'Diseño Web' | 'SEO/AEO'

export type CaseMetric = {
  label: string
  value: string
}

export type CaseTableRow = {
  kpi: string
  before: string
  after: string
}

export type CaseChapter = {
  id: string
  title: string
  what: string
  why: string
  implementation: string[]
  proof: string
}

export type CaseStudy = {
  id: string
  slug: string
  title: string
  service: CaseService
  metric: string
  detail: string
  image: string
  alt: string
  featured?: boolean
  timeline: string
  systemType: string
  oneLiner: string
  contextChips: string[]
  scoreboard: CaseMetric[]
  executiveSummary: {
    problem: string[]
    decision: string
    deliverables: string[]
  }
  baseline: {
    before: Array<{ label: string; value: string }>
    target: string
    constraints: string[]
  }
  strategy: {
    diagramTitle: string
    diagramFlow: string[]
    principles: string[]
    phases: Array<{ label: string; summary: string }>
  }
  chapters: CaseChapter[]
  results: {
    beforeAfter: CaseTableRow[]
    businessImpact: string
    measurement: {
      window: string
      sources: string[]
      conversionDefinition?: string
    }
  }
  learnings: string[]
  nextSteps: string[]
  metaDescription: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'case-01',
    slug: 'pipeline-leads-automatizado',
    title: 'Pipeline de leads automatizado para reducir fricción operativa',
    service: 'Automatizaciones',
    metric: '-62% tiempo operativo',
    detail: 'Integración formularios + CRM + seguimiento automático con SLA visible.',
    image: '/images/cases/case-automation.svg',
    alt: 'Diagrama de pipeline de leads automatizado',
    timeline: '8 semanas',
    systemType: 'Sistema de automatización comercial',
    oneLiner:
      'Integramos captura, validación, enrutamiento y seguimiento para responder más rápido y operar sin tareas manuales repetitivas.',
    contextChips: ['B2B', 'Servicios profesionales', 'LATAM', '8 semanas', 'Rol: estrategia + implementación'],
    scoreboard: [
      { label: 'Tiempo operativo', value: '-62%' },
      { label: 'Primera respuesta', value: '43 min' },
      { label: 'Tasa de contacto', value: '+31%' }
    ],
    executiveSummary: {
      problem: [
        'Leads entraban por múltiples formularios y el seguimiento era manual y lento.',
        'Campos inconsistentes y datos duplicados generaban errores de operación.',
        'No había visibilidad clara de qué etapa del pipeline estaba fallando.'
      ],
      decision:
        'No era “automatizar por automatizar”. Se diseñó un sistema end-to-end: captura → validación → enrutamiento → seguimiento → medición.',
      deliverables: [
        'Mapa de datos y reglas de negocio por intención comercial.',
        'Automatización de seguimiento con SLA y alertas.',
        'Dashboard operativo con métricas de contacto y avance.'
      ]
    },
    baseline: {
      before: [
        { label: 'Tiempo operativo semanal', value: '18 h / semana' },
        { label: 'Tiempo de primera respuesta', value: '4 h promedio' },
        { label: 'Leads sin contacto <24h', value: '38%' }
      ],
      target:
        'Reducir fricción operativa sin contratar más equipo y asegurar seguimiento consistente de todos los leads calificados.',
      constraints: [
        'Equipo comercial pequeño (2 personas).',
        'CRM heredado con configuración parcial.',
        'Implementación sin downtime del canal de captación.'
      ]
    },
    strategy: {
      diagramTitle: 'Flujo del sistema',
      diagramFlow: ['Formulario', 'Validación', 'Enriquecimiento', 'CRM', 'Seguimiento', 'Dashboard'],
      principles: [
        'Performance-first: si el flujo se rompe o retrasa, el lead se enfría.',
        'Automatización con control: reglas claras, logs y trazabilidad.',
        'Medición desde día uno: cada etapa con un KPI operativo.'
      ],
      phases: [
        {
          label: 'Semana 1',
          summary: 'Auditoría de flujo existente, mapeo de datos y definición de reglas de enrutamiento.'
        },
        {
          label: 'Semana 2',
          summary: 'Implementación de validaciones, deduplicación y automatización de tareas en CRM.'
        },
        {
          label: 'Semana 3-4',
          summary: 'Seguimiento automático, alertas de SLA y tablero operativo para el equipo comercial.'
        }
      ]
    },
    chapters: [
      {
        id: 'normalizacion-datos',
        title: 'Normalización de datos',
        what: 'Se unificaron campos críticos y validaciones en todos los puntos de captura.',
        why: 'Sin estructura de datos consistente, la automatización produce errores en cascada.',
        implementation: [
          'Campos obligatorios por tipo de lead e intención.',
          'Reglas de deduplicación por email y dominio.',
          'Normalización de origen y estado del lead.'
        ],
        proof: 'Se eliminó duplicidad operativa y se redujo el retrabajo manual en CRM.'
      },
      {
        id: 'enrutamiento-intencion',
        title: 'Enrutamiento por intención',
        what: 'Cada lead se distribuye automáticamente según servicio, país y fit comercial.',
        why: 'Responder rápido requiere asignación correcta desde el primer minuto.',
        implementation: [
          'Matriz de decisión por servicio y mercado.',
          'Asignación automática de owner en CRM.',
          'Reglas de fallback para leads incompletos.'
        ],
        proof: 'Menos escalaciones manuales y mayor velocidad de contacto en primer intento.'
      },
      {
        id: 'seguimiento-automatico',
        title: 'Seguimiento automático',
        what: 'Se activaron secuencias de contacto y recordatorios con estado trazable.',
        why: 'El principal cuello de botella era la dependencia de tareas manuales repetitivas.',
        implementation: [
          'Email transaccional inmediato con contexto del lead.',
          'Recordatorios automáticos por SLA no cumplido.',
          'Creación de tareas en CRM por etapa.'
        ],
        proof: 'Aumento de cobertura de seguimiento sin incrementar carga operativa del equipo.'
      },
      {
        id: 'visibilidad-operativa',
        title: 'Visibilidad operativa',
        what: 'Se construyó un dashboard simple para monitorear salud del pipeline diario.',
        why: 'Sin observabilidad, la mejora no es sostenible en el tiempo.',
        implementation: [
          'KPIs: leads/día, primera respuesta, tasa de contacto y estados.',
          'Alertas para SLA vencido.',
          'Vista semanal para decisiones de capacidad.'
        ],
        proof: 'La operación pasó de reactiva a predecible y con acciones priorizadas.'
      }
    ],
    results: {
      beforeAfter: [
        { kpi: 'Tiempo operativo semanal', before: '18 h', after: '6.8 h' },
        { kpi: 'Tiempo de primera respuesta', before: '4 h', after: '43 min' },
        { kpi: 'Tasa de contacto', before: '46%', after: '77%' }
      ],
      businessImpact:
        'La operación comercial ganó velocidad y consistencia: más leads atendidos a tiempo, menos oportunidades perdidas por seguimiento tardío y mejor previsibilidad del pipeline.',
      measurement: {
        window: '2025-10-28 → 2025-12-23',
        sources: ['Logs de automatización', 'CRM (HubSpot)', 'Dashboard operativo'],
        conversionDefinition: 'Lead contactado por primera vez en menos de 24 horas.'
      }
    },
    learnings: [
      'Automatizar sin estandarizar datos primero solo traslada el caos.',
      'Un SLA simple y visible al equipo tiene más impacto que reglas complejas.',
      'Dashboard pequeño, diario y accionable > reporte grande mensual.'
    ],
    nextSteps: [
      'Scoring automático de leads por fit comercial.',
      'Playbooks por segmento para personalizar secuencias.',
      'Loop de retroalimentación ventas → marketing para mejorar calidad de entrada.'
    ],
    metaDescription:
      'Leads sin seguimiento y horas manuales. Diseñamos un sistema captura→CRM→seguimiento automático y reducimos 62% el tiempo operativo en 8 semanas.'
  },
  {
    id: 'case-02',
    slug: 'landing-alta-conversion',
    title: 'Landing comercial de alta conversión con enfoque performance-first',
    service: 'Diseño Web',
    metric: '+38% conversion rate',
    detail: 'Rediseño del embudo: mensaje, prueba, objeciones y CTA.',
    image: '/images/cases/case-web.svg',
    alt: 'Landing B2B optimizada para conversión',
    timeline: '6 semanas',
    systemType: 'Sistema de captación web B2B',
    oneLiner:
      'Reestructuramos la landing de punta a punta para que el valor sea claro en segundos y el embudo convierta con el mismo tráfico.',
    contextChips: ['B2B', 'SaaS', 'Next.js', '6 semanas', 'Rol: UX + frontend + analítica'],
    scoreboard: [
      { label: 'Conversion rate', value: '+38%' },
      { label: 'LCP mobile', value: '-41%' },
      { label: 'CTR de CTA', value: '+29%' }
    ],
    executiveSummary: {
      problem: [
        'La propuesta de valor estaba enterrada y la página pedía demasiado contexto al usuario.',
        'El scroll no guiaba decisión: faltaban pruebas y manejo explícito de objeciones.',
        'El rendimiento móvil degradaba intención y elevaba abandono.'
      ],
      decision:
        'No era un “refresh visual”. Se rediseñó el sistema comercial completo: mensaje → prueba → objeciones → llamada a la acción.',
      deliverables: [
        'Arquitectura de contenido orientada a decisión.',
        'Implementación en Next.js optimizada para Core Web Vitals.',
        'Instrumentación de eventos para medir cada paso del embudo.'
      ]
    },
    baseline: {
      before: [
        { label: 'Conversion rate', value: '2.9%' },
        { label: 'LCP mobile', value: '3.9 s' },
        { label: 'CTR CTA principal', value: '5.4%' }
      ],
      target:
        'Elevar conversion rate con el mismo volumen de tráfico, sin sacrificar velocidad ni claridad del mensaje.',
      constraints: [
        'Mantener stack actual en Next.js.',
        'Sin rediseño del backend de formularios.',
        'Ventana corta para pruebas A/B iniciales.'
      ]
    },
    strategy: {
      diagramTitle: 'Arquitectura de la landing',
      diagramFlow: ['Promesa', 'Prueba', 'Cómo funciona', 'Objeciones', 'CTA'],
      principles: [
        'Claridad en 5 segundos: qué haces, para quién y qué resultado prometes.',
        'Prueba temprano: evidencia antes de pedir una acción.',
        'Performance-first: velocidad como parte de la conversión.'
      ],
      phases: [
        {
          label: 'Semana 1-2',
          summary: 'Research de mensajes, jerarquía de contenido y mapa de objeciones prioritarias.'
        },
        {
          label: 'Semana 3-4',
          summary: 'Implementación de nueva arquitectura, módulos de prueba y CTA progresivos.'
        },
        {
          label: 'Semana 5-6',
          summary: 'Optimización de Core Web Vitals y medición de eventos para iteración continua.'
        }
      ]
    },
    chapters: [
      {
        id: 'arquitectura-contenido',
        title: 'Arquitectura de contenido',
        what: 'Reordenamos la narrativa para que la propuesta comercial sea escaneable y accionable.',
        why: 'Un usuario B2B decide rápido: sin jerarquía clara, no avanza a CTA.',
        implementation: [
          'Hero con promesa específica y alcance.',
          'Sección de prueba movida al primer tercio del scroll.',
          'Bloque de objeciones con respuestas directas.'
        ],
        proof: 'Más sesiones alcanzando el bloque de CTA final y menor drop-off en primer scroll.'
      },
      {
        id: 'performance-real',
        title: 'Performance real',
        what: 'Se optimizaron recursos críticos para mejorar percepción y velocidad efectiva.',
        why: 'La intención cae rápido cuando el contenido principal tarda en aparecer.',
        implementation: [
          'Optimización de imágenes y carga diferida no crítica.',
          'Reducción de JavaScript inicial y limpieza de dependencias.',
          'Tipografía y estilos ajustados para paint estable.'
        ],
        proof: 'Mejora sostenida en LCP móvil y mayor retención en primeros 10 segundos.'
      },
      {
        id: 'conversion-ux',
        title: 'Conversión y UX de formularios',
        what: 'Se simplificaron puntos de fricción y se clarificó expectativa de contacto.',
        why: 'Cada campo extra y cada duda sin resolver reduce tasa de envío.',
        implementation: [
          'Formulario con menor carga cognitiva y microcopy explícito.',
          'CTA contextual repetido en momentos de alta intención.',
          'Estados de éxito/error más claros para reducir abandono.'
        ],
        proof: 'Aumento de envíos completados y mejora del CTR en CTA principal.'
      },
      {
        id: 'instrumentacion-eventos',
        title: 'Instrumentación de eventos',
        what: 'Se definieron eventos clave para entender el embudo completo.',
        why: 'Sin instrumentación, no hay forma de iterar con certeza.',
        implementation: [
          'Eventos: view CTA, click CTA, submit y abandono por sección.',
          'Panel simple para lectura semanal de conversiones.',
          'Etiquetado consistente para comparar experimentos.'
        ],
        proof: 'El equipo pudo priorizar mejoras por impacto real, no por intuición.'
      }
    ],
    results: {
      beforeAfter: [
        { kpi: 'Conversion rate', before: '2.9%', after: '4.0%' },
        { kpi: 'LCP mobile', before: '3.9 s', after: '2.3 s' },
        { kpi: 'CTR CTA principal', before: '5.4%', after: '7.0%' }
      ],
      businessImpact:
        'Con el mismo tráfico se generaron más oportunidades comerciales y mejor calidad de conversación inicial, gracias a una narrativa más clara y una experiencia más rápida.',
      measurement: {
        window: '2025-12-02 → 2026-01-16',
        sources: ['GA4', 'Search Console', 'Eventos frontend (Next.js)'],
        conversionDefinition: 'Formulario enviado con datos completos para contacto comercial.'
      }
    },
    learnings: [
      'El orden del mensaje impacta más que agregar más secciones.',
      'Mejorar LCP sin claridad de oferta no mueve conversion rate por sí solo.',
      'Un CTA repetido con contexto convierte mejor que múltiples CTAs genéricos.'
    ],
    nextSteps: [
      'Iterar titulares por segmento y canal de adquisición.',
      'Probar variantes de prueba social según industria.',
      'Refinar scoring de leads para priorizar seguimiento comercial.'
    ],
    metaDescription:
      'La landing tenía fricción y bajo rendimiento móvil. Rediseñamos mensaje, prueba y CTA con implementación performance-first y logramos +38% de conversión en 6 semanas.'
  },
  {
    id: 'case-03',
    slug: 'visibilidad-organica-aeo',
    title: 'Visibilidad orgánica y AEO para capturar demanda de alto intento',
    service: 'SEO/AEO',
    metric: '+123% tráfico orgánico',
    detail: 'Arquitectura semántica + schema + contenido citable para IA.',
    image: '/images/cases/case-seo.svg',
    alt: 'Crecimiento orgánico con estrategia SEO y AEO',
    featured: true,
    timeline: '10 semanas',
    systemType: 'Sistema SEO/AEO orientado a intención comercial',
    oneLiner:
      'Se rediseñó la arquitectura SEO/AEO para que Google y sistemas de respuesta entiendan, relacionen y citen la oferta con mayor precisión.',
    contextChips: ['B2B', 'Servicios', 'Search Console', '10 semanas', 'Rol: estrategia + implementación técnica'],
    scoreboard: [
      { label: 'Tráfico orgánico', value: '+123%' },
      { label: 'Clicks cualificados', value: '+71%' },
      { label: 'Queries top 10', value: '+44%' }
    ],
    executiveSummary: {
      problem: [
        'Contenido disperso y sin una intención comercial clara por URL.',
        'Canibalización entre páginas y estructura interna débil.',
        'Poca citabilidad en motores de respuesta por falta de estructura semántica.'
      ],
      decision:
        'No era “publicar más contenido”. Se construyó arquitectura + citabilidad: entidades claras, schema útil y páginas por intención.',
      deliverables: [
        'Rearquitectura de URLs y enlazado interno.',
        'Plantillas SEO/AEO por servicio con bloque FAQ citable.',
        'Implementación de schema y roadmap editorial de intención.'
      ]
    },
    baseline: {
      before: [
        { label: 'Sesiones orgánicas mensuales', value: '4,200' },
        { label: 'Clicks en queries comerciales', value: '1,180 / mes' },
        { label: 'Páginas con schema útil', value: '12%' }
      ],
      target:
        'Duplicar señal orgánica útil y mejorar visibilidad en consultas con intención de contratación.',
      constraints: [
        'Sitio con contenido heredado y taxonomía inconsistente.',
        'Recursos editoriales limitados.',
        'Sin afectar URLs con tráfico histórico estable.'
      ]
    },
    strategy: {
      diagramTitle: 'Capas de visibilidad',
      diagramFlow: ['Technical SEO', 'Arquitectura', 'Contenido', 'Schema', 'AEO'],
      principles: [
        'Una URL = una intención comercial principal.',
        'Estructura semántica legible para buscadores y LLMs.',
        'Contenido breve y utilizable como respuesta directa.'
      ],
      phases: [
        {
          label: 'Semana 1-3',
          summary: 'Auditoría técnica, depuración de indexación y rediseño de arquitectura interna.'
        },
        {
          label: 'Semana 4-7',
          summary: 'Nuevas plantillas por servicio, FAQs estratégicas y enlazado por intención.'
        },
        {
          label: 'Semana 8-10',
          summary: 'Schema rollout, ajustes de contenido y monitoreo de queries comerciales.'
        }
      ]
    },
    chapters: [
      {
        id: 'technical-seo',
        title: 'Technical SEO base',
        what: 'Se corrigieron señales técnicas que limitaban rastreo e interpretación.',
        why: 'Sin base técnica limpia, el contenido no escala visibilidad.',
        implementation: [
          'Revisión de indexación, sitemap y canonicales.',
          'Ajustes de enlazado interno por cluster.',
          'Mejora de performance en plantillas críticas.'
        ],
        proof: 'Mayor cobertura indexada y reducción de URLs ambiguas en Search Console.'
      },
      {
        id: 'arquitectura-intencion',
        title: 'Arquitectura por intención',
        what: 'Cada servicio obtuvo una URL enfocada con semántica y oferta claras.',
        why: 'La intención diluida reduce ranking y calidad de tráfico.',
        implementation: [
          'Clusters por servicio y necesidad comercial.',
          'Reescritura de títulos, H1 y estructura de contenido.',
          'Control de canibalización entre páginas similares.'
        ],
        proof: 'Subida sostenida en queries de mayor intención comercial.'
      },
      {
        id: 'schema-aeo',
        title: 'Schema y citabilidad AEO',
        what: 'Se añadieron bloques citable-first para motores de respuesta.',
        why: 'Las respuestas IA favorecen contenido estructurado, explícito y verificable.',
        implementation: [
          'Schema Service + FAQ en páginas clave.',
          'Bloques de respuesta corta y definiciones directas.',
          'Consistencia de entidades (servicios, organización, alcance).' 
        ],
        proof: 'Incremento de impresiones y snippets en consultas informacionales-comerciales.'
      },
      {
        id: 'roadmap-editorial',
        title: 'Roadmap editorial accionable',
        what: 'Se priorizó producción en torno a queries con mejor potencial de negocio.',
        why: 'Publicar por volumen no garantiza demanda cualificada.',
        implementation: [
          'Backlog de contenidos por intención y funnel.',
          'Plantillas reutilizables para velocidad editorial.',
          'Ritmo de publicación con revisión de desempeño quincenal.'
        ],
        proof: 'Mejor tracción orgánica sin inflar volumen de contenido irrelevante.'
      }
    ],
    results: {
      beforeAfter: [
        { kpi: 'Sesiones orgánicas mensuales', before: '4,200', after: '9,366' },
        { kpi: 'Clicks en queries comerciales', before: '1,180', after: '2,018' },
        { kpi: 'Queries en top 10', before: '113', after: '163' }
      ],
      businessImpact:
        'El tráfico orgánico creció con mejor calidad: más consultas alineadas a oferta, mayor demanda entrante y más presencia en respuestas de IA para temas estratégicos.',
      measurement: {
        window: '2025-11-04 → 2026-01-13',
        sources: ['Search Console', 'GA4', 'Auditoría técnica SEO'],
        conversionDefinition: 'Sesiones orgánicas que llegan a páginas de servicio y activan CTA de contacto.'
      }
    },
    learnings: [
      'La estructura de información determina más que la frecuencia de publicación.',
      'Schema útil + contenido claro mejora citabilidad en entornos IA.',
      'Las ganancias sostenibles vienen de arquitectura, no de tácticas aisladas.'
    ],
    nextSteps: [
      'Expandir clusters de contenido con intención transaccional.',
      'Optimizar bloques FAQ con queries emergentes trimestrales.',
      'Conectar señales de SEO con CRM para atribución de pipeline.'
    ],
    metaDescription:
      'El sitio tenía canibalización y baja citabilidad. Reestructuramos arquitectura SEO/AEO, schema y contenido por intención comercial para crecer 123% en tráfico orgánico en 10 semanas.'
  }
]

export function getCaseStudies() {
  return caseStudies
}

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((item) => item.slug === slug)
}

export function getCaseMetaTitle(caseStudy: CaseStudy) {
  return `${caseStudy.metric} en ${caseStudy.timeline} | ${caseStudy.systemType} — Pachano Design`
}
