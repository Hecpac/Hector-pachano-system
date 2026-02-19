export type CaseStudy = {
  id: string
  title: string
  service: 'Automatizaciones' | 'Diseño Web' | 'SEO/AEO'
  metric: string
  detail: string
  image: string
  alt: string
  featured?: boolean
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'case-01',
    title: 'Pipeline de leads automatizado',
    service: 'Automatizaciones',
    metric: '-62% tiempo operativo',
    detail: 'Integración CRM + formularios + seguimiento automático.',
    image: '/images/cases/case-automation.svg',
    alt: 'Caso de automatización con mejora operativa'
  },
  {
    id: 'case-02',
    title: 'Landing comercial de alta conversión',
    service: 'Diseño Web',
    metric: '+38% conversion rate',
    detail: 'Rediseño full con arquitectura de contenido y performance.',
    image: '/images/cases/case-web.svg',
    alt: 'Caso de diseño web con incremento de conversión'
  },
  {
    id: 'case-03',
    title: 'Visibilidad orgánica + respuestas IA',
    service: 'SEO/AEO',
    metric: '+123% tráfico orgánico',
    detail: 'Estrategia de contenido, technical SEO y schema FAQ/Service.',
    image: '/images/cases/case-seo.svg',
    alt: 'Caso SEO y AEO con crecimiento orgánico',
    featured: true
  }
]
