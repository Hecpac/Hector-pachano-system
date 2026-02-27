import type { Metadata } from 'next'
import Link from 'next/link'

import { submitLeadAction } from '../actions'

import { HeroMonitorIntro } from '@/components/sections/hero-monitor-intro'
import { LandingNav } from '@/components/sections/landing-nav'
import { LeadForm } from '@/components/sections/lead-form'
import { JsonLd } from '@/components/ui/json-ld'
import { Parallax } from '@/components/ui/parallax'
import { buildPageMetadata } from '@/lib/seo/meta'
import { breadcrumbSchema, organizationSchema, websiteSchema } from '@/lib/seo/schema'
import { SITE_CAL_LINK } from '@/lib/seo/site'

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
  const calLink = SITE_CAL_LINK

  return (
    <main className="landing-page" id="main-content" lang="en">
      <JsonLd
        data={[
          organizationSchema,
          websiteSchema,
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
          <Parallax speed={0.1} relativeTo="scroll" className="landing-hero__copy" zIndex={2}>
            <h1 className="landing-hero__headline">
              <span className="line-kicker landing-hero__line landing-hero__line--1">I do not sell websites.</span>
              <span className="line-orange landing-hero__line landing-hero__line--2">I build digital systems</span>
              <span className="line-outline landing-hero__line landing-hero__line--3">that generate revenue.</span>
            </h1>

            <h2 className="landing-hero__subheadline landing-hero__line landing-hero__line--4">
              Digital systems for B2B teams: Web + Automations + SEO/AEO
            </h2>

            <div className="landing-hero__descriptor landing-hero__line landing-hero__line--5">
              <p className="landing-hero__descriptor-main">Design that converts + SEO that ranks + automations that scale.</p>
              <p className="landing-hero__descriptor-support">Integrated, measurable and execution-ready.</p>
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
          </div>

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
