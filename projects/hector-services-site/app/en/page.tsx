import type { Metadata } from 'next'
import Link from 'next/link'

import { submitLeadAction } from '../actions'

import { HeroMonitorIntroLazy as HeroMonitorIntro } from '@/components/sections/hero-monitor-intro-lazy'
import { LandingNav } from '@/components/sections/landing-nav'
import { LeadForm } from '@/components/sections/lead-form'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { AnnotationArrow } from '@/components/ui/annotation-arrow'
import { JsonLd } from '@/components/ui/json-ld'
import { LiveClock } from '@/components/ui/live-clock'
import { Parallax } from '@/components/ui/parallax'
import { TypewriterWord } from '@/components/ui/typewriter-word'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema } from '@/lib/seo/schema'
import { SITE_CAL_LINK, SITE_CONTACT_EMAIL, SITE_ENTITY_NAME, SITE_NAME, SITE_URL } from '@/lib/seo/site'


const answerBlocks = [
  {
    title: 'What I do',
    content: 'I build B2B digital systems that convert: web, automations, and SEO/AEO integrated seamlessly.'
  },
  {
    title: 'Who it is for',
    content: 'Professional services and B2B teams needing more qualified demand without improvising operations.'
  },
  {
    title: 'How I execute',
    content: '100% done-for-you implementation. No scattered freelancers, no endless consulting.'
  }
]

const services = [
  { id: '01', name: 'Automations', href: '/en/services/automatizaciones', desc: 'CRM routing, lead follow-up and SLA visibility.' },
  { id: '02', name: 'Web Design', href: '/en/services/diseno-web', desc: 'Conversion-first website architecture and implementation.' },
  { id: '03', name: 'SEO / AEO', href: '/en/services/seo-aeo', desc: 'Search demand capture and AI-answer visibility.' }
]

export const metadata: Metadata = buildPageMetadata({
  title: 'Digital Systems B2B | Web, Automations and SEO/AEO',
  description:
    'Integrated digital systems for B2B growth: Web + Automations + SEO/AEO with measurable outcomes and weekly optimization.',
  path: '/en'
})

export default function EnglishHomePage() {
  const calLink = SITE_CAL_LINK.startsWith('/') ? '/en/contact' : SITE_CAL_LINK

  return (
    <main className="landing-page" id="main-content" lang="en">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': ['Organization', 'ProfessionalService'],
            name: SITE_ENTITY_NAME,
            alternateName: SITE_NAME,
            url: `${SITE_URL}/en`,
            description:
              'B2B digital systems partner for web, automations and SEO/AEO with measurable execution.',
            founder: {
              '@type': 'Person',
              name: SITE_NAME
            },
            areaServed: 'Global',
            availableLanguage: ['en', 'es'],
            email: SITE_CONTACT_EMAIL,
            serviceType: ['B2B Web Design', 'CRM Automations', 'SEO', 'AEO']
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: `${SITE_NAME} // Digital Systems`,
            alternateName: SITE_NAME,
            url: `${SITE_URL}/en`,
            description:
              'English version of Pachano Design: B2B web, automations and SEO/AEO systems focused on revenue.',
            inLanguage: 'en',
            potentialAction: {
              '@type': 'SearchAction',
              target: `${SITE_URL}/en/blog?query={search_term_string}`,
              'query-input': 'required name=search_term_string'
            }
          },
          breadcrumbSchema([
            { name: 'Home', path: '/en' }
          ])
        ]}
      />

      <LandingNav />

      <section className="landing-hero">
        <div className="landing-hero__grain" aria-hidden="true" />
        <div className="landing-hero__vignette" aria-hidden="true" />

        <Parallax speed={-0.3} relativeTo="scroll" zIndex={0}>
          <div className="landing-hero__bg-glow" />
        </Parallax>

        <div className="landing-hero__counter" aria-hidden="true">
          01 / 04
        </div>

        <div className="landing-hero__grid">
          <Parallax speed={0.4} relativeTo="scroll" className="landing-hero__content self-start mt-[10vh]" zIndex={2}>
            <div className="landing-hero__tags">
              <span className="landing-hero__tag">Automations</span>
              <span className="landing-hero__tag">Web Design</span>
              <span className="landing-hero__tag">SEO / AEO</span>
            </div>

            <h1 className="landing-hero__headline">
              <span className="line-kicker landing-hero__line landing-hero__line--1">I build systems</span>
              <span className="line-orange landing-hero__line landing-hero__line--2">
                <TypewriterWord words={['Web Design', 'Automations', 'SEO/AEO']} />
              </span>
              <span className="line-outline landing-hero__line landing-hero__line--3">that generate revenue.</span>
            </h1>

            <h2 className="landing-hero__subheadline landing-hero__line landing-hero__line--4">
              Digital systems for B2B teams: Web + Automations + SEO/AEO
            </h2>

            <div className="landing-hero__descriptor landing-hero__line landing-hero__line--5">
              <p className="landing-hero__descriptor-main">
                Design that converts + SEO that ranks + automations that scale.
              </p>
              <p className="landing-hero__descriptor-support">Integrated, measurable and execution-ready.</p>
              <div className="hero-stats-bar">
                <span className="hero-stat">
                  <AnimatedCounter value={123} suffix="%" /> traffic
                </span>
                <span className="hero-stat">
                  <AnimatedCounter value={38} suffix="%" /> conversion
                </span>
                <span className="hero-stat">
                  <AnimatedCounter value={62} prefix="-" suffix="%" /> op. time
                </span>
              </div>
            </div>

            <div className="landing-proof-grid landing-hero__line landing-hero__line--6" aria-label="Results proof">
              <article className="landing-proof-card">
                <p className="landing-proof-card__kicker">System</p>
                <p className="landing-proof-card__value">Capture → CRM → Follow-up → Dashboard</p>
              </article>
              <article className="landing-proof-card">
                <p className="landing-proof-card__kicker">Real Case</p>
                <p className="landing-proof-card__value">Operational time -62%</p>
              </article>
            </div>

            <p className="landing-hero__perf-proof landing-hero__line landing-hero__line--6">INP &lt; 200ms · LCP &lt; 2.5s · conversion-ready</p>

            <div className="landing-answer-blocks landing-hero__line landing-hero__line--7" aria-label="Answer blocks">
              {answerBlocks.map((block) => (
                <article key={block.title} className="landing-answer-block">
                  <p className="landing-answer-block__title">{block.title}</p>
                  <p className="landing-answer-block__content">{block.content}</p>
                </article>
              ))}
            </div>
          </Parallax>

          <HeroMonitorIntro />
        </div>

        <Parallax speed={0.2} relativeTo="scroll" className="landing-hero__bottom landing-hero__line landing-hero__line--8" zIndex={2}>
          <div className="landing-hero__actions">
            <Link href="/en/contact" className="btn-primary">
              Book diagnosis
            </Link>
            <Link href="/en/cases" className="btn-secondary">
              View case studies
            </Link>
            <AnnotationArrow label="book free call" direction="left" />
          </div>
          <LiveClock />

          <div className="landing-hero__scroll-hint" aria-hidden="true">
            <span>Scroll</span>
            <span className="landing-hero__scroll-line" />
          </div>
        </Parallax>
    </section>

      <section className="landing-content-wrapper">
        <h2 className="landing-section-label">Services</h2>
        <section className="landing-services-grid">
          {services.map((service) => (
            <Link key={service.id} href={service.href} className="landing-service-card-wrapper">
              <article className="landing-service-card">
                <span className="landing-service-card__num">{service.id}</span>
                <h3 className="landing-service-card__name">{service.name}</h3>
                <p className="landing-service-card__desc">{service.desc}</p>
                <div className="landing-service-card__footer">
                  <span className="landing-service-card__arrow">↗</span>
                </div>
              </article>
            </Link>
          ))}
        </section>

        <div className="page-shell">
          <section className="section cta reveal-on-scroll cinematic-panel" id="contact">
            <h2>Book your diagnostic</h2>
            <p>
              Share your context and growth target. I will reply with a realistic execution plan.
            </p>
            <LeadForm action={submitLeadAction} calLink={calLink} locale="en" />
          </section>
        </div>
      </section>
    </main>
  )
}
