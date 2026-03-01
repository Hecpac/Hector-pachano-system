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
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema } from '@/lib/seo/schema'
import { SITE_CAL_LINK, SITE_CONTACT_EMAIL, SITE_ENTITY_NAME, SITE_NAME, SITE_URL } from '@/lib/seo/site'

const answerBlocks = [
  {
    title: 'What I do',
    content:
      'I design, build and connect the three layers that drive B2B revenue: a website that converts, automations that eliminate manual work, and SEO/AEO that puts you in front of buyers on Google and ChatGPT.'
  },
  {
    title: "Who it's for",
    content:
      "Professional services and B2B teams already generating revenue but leaking it through broken processes, slow websites, or invisible search presence. You don't need more tools. You need them working together."
  },
  {
    title: 'How I work',
    content:
      "100% done-for-you. You don't manage freelancers, review briefs, or chase deliverables. I own execution from strategy to launch and stay accountable to the numbers."
  }
]

const services = [
  {
    id: '01',
    name: 'Web Design',
    href: '/en/services/diseno-web',
    desc: 'A website that does the selling: conversion-first architecture, INP < 200ms and LCP < 2.5s.'
  },
  {
    id: '02',
    name: 'Automations',
    href: '/en/services/automatizaciones',
    desc: 'Stop leaking leads: CRM routing, follow-up sequences and SLA tracking from first contact to signed contract.'
  },
  {
    id: '03',
    name: 'SEO / AEO',
    href: '/en/services/seo-aeo',
    desc: 'Get found where buyers search: Google SEO plus AI answer visibility in ChatGPT, Perplexity and Gemini.'
  }
]

const metrics = [
  {
    metric: 'Traffic',
    number: '+123%',
    context: 'Organic traffic in 4 months — B2B SaaS, Spain.'
  },
  {
    metric: 'Conversion',
    number: '+38%',
    context: 'Lead-to-meeting rate after web rebuild.'
  },
  {
    metric: 'Ops time',
    number: '-62%',
    context: 'Hours saved per week after CRM automation.'
  }
]

export const metadata: Metadata = buildPageMetadata({
  title: 'B2B Web, Automations & SEO/AEO Systems | Hector Pachano',
  description:
    'Done-for-you digital systems for B2B growth: conversion-ready web, CRM automations, and SEO/AEO that captures demand on Google and AI search.',
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
              'Done-for-you B2B digital systems partner: conversion-ready web, CRM automations and SEO/AEO aligned to measurable growth.',
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
              'English version of Pachano Design: integrated web, automations and SEO/AEO systems built for B2B growth.',
            inLanguage: 'en',
            potentialAction: {
              '@type': 'SearchAction',
              target: `${SITE_URL}/en/blog?query={search_term_string}`,
              'query-input': 'required name=search_term_string'
            }
          },
          breadcrumbSchema([{ name: 'Home', path: '/en' }])
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
              <span className="landing-hero__tag">Web Design</span>
              <span className="landing-hero__tag">Automations</span>
              <span className="landing-hero__tag">SEO / AEO</span>
            </div>

            <h1 className="landing-hero__headline">
              <span className="line-kicker landing-hero__line landing-hero__line--1">The digital infrastructure</span>
              <span className="line-orange landing-hero__line landing-hero__line--2">your B2B needs to grow.</span>
            </h1>

            <h2 className="landing-hero__subheadline landing-hero__line landing-hero__line--4">
              Web + Automations + SEO/AEO — integrated and done-for-you.
            </h2>

            <div className="landing-hero__descriptor landing-hero__line landing-hero__line--5">
              <p className="landing-hero__descriptor-main">
                Most B2B teams lose leads between a slow site, a disconnected CRM, and zero search visibility.
              </p>
              <p className="landing-hero__descriptor-support">
                I fix all three as a single integrated system that you do not have to manage.
              </p>
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

            <div className="landing-proof-grid landing-hero__line landing-hero__line--6" aria-label="Execution proof">
              <article className="landing-proof-card">
                <p className="landing-proof-card__kicker">Integrated stack</p>
                <p className="landing-proof-card__value">Website → Automations → SEO/AEO</p>
              </article>
              <article className="landing-proof-card">
                <p className="landing-proof-card__kicker">Delivery model</p>
                <p className="landing-proof-card__value">Done-for-you execution from strategy to launch</p>
              </article>
            </div>

            <p className="landing-hero__perf-proof landing-hero__line landing-hero__line--6">
              INP &lt; 200ms · LCP &lt; 2.5s — because a slow site is a broken sales rep.
            </p>

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
            <Link href={calLink} className="btn-primary">
              Book your free 30-min diagnostic →
            </Link>
            <Link href="/en/cases" className="btn-secondary">
              See real results
            </Link>
            <AnnotationArrow label="book free 30-min diagnostic" direction="left" />
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

        <section className="landing-proof-grid" aria-label="Metrics with context">
          {metrics.map((item) => (
            <article key={item.metric} className="landing-proof-card">
              <p className="landing-proof-card__kicker">{item.metric}</p>
              <p className="landing-proof-card__value">{item.number}</p>
              <p className="landing-proof-card__desc">{item.context}</p>
            </article>
          ))}
        </section>

        <div className="page-shell">
          <section className="section cta reveal-on-scroll cinematic-panel" id="social-proof">
            <h2>Proof over generic claims.</h2>
            <p>
              I do not publish generic case studies. Every result above comes from a real engagement. Book a diagnostic
              and I will show you the specifics relevant to your business.
            </p>
          </section>

          <section className="section cta reveal-on-scroll cinematic-panel" id="contact">
            <h2>Let&apos;s map your growth gap.</h2>
            <p>
              In 30 minutes I&apos;ll audit your current web, automations and search visibility, then show exactly where
              you&apos;re losing revenue and what to fix first. No pitch. No pressure. Just a clear execution plan you can
              take anywhere.
            </p>
            <LeadForm action={submitLeadAction} calLink={calLink} locale="en" />
            <p>Typically replied within 24h · No commitment required.</p>
          </section>
        </div>
      </section>
    </main>
  )
}
