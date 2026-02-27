'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'

import type { LeadFormState } from '@/app/actions'
import { trackEvent } from '@/lib/analytics/events'

type Locale = 'es' | 'en'

type LeadFormProps = {
  action: (state: LeadFormState, formData: FormData) => Promise<LeadFormState>
  calLink: string
  locale?: Locale
}

const initialState: LeadFormState = {
  status: 'idle',
  message: ''
}

const copy = {
  es: {
    submit: 'Solicitar diagnóstico',
    sending: 'Enviando…',
    name: 'Nombre',
    namePlaceholder: 'Tu nombre…',
    email: 'Email',
    emailPlaceholder: 'tu@email.com…',
    emailHint: 'No spam. Respuesta en menos de 24h.',
    company: 'Empresa',
    companyPlaceholder: 'Nombre de empresa…',
    service: 'Servicio principal',
    servicePlaceholder: 'Selecciona una opción',
    serviceOptions: ['Automatizaciones', 'Diseño Web', 'SEO/AEO', 'Integral (los 3)'],
    goal: 'Objetivo principal',
    goalPlaceholder: 'Selecciona tu foco principal',
    goalOptions: ['Generar más leads', 'Subir autoridad de marca', 'Automatizar operación', 'Mejorar SEO/AEO'],
    goalHint: 'Con esto te regreso un plan más preciso desde la primera respuesta.',
    budget: 'Presupuesto aproximado (opcional)',
    budgetOptions: ['Prefiero comentarlo en llamada', 'Menos de $2k', '$2k - $5k', '$5k - $10k', 'Más de $10k'],
    message: '¿Qué quieres resolver?',
    messagePlaceholder: 'Ejemplo: quiero +X leads/mes sin contratar más equipo comercial',
    calButton: 'Agendar en calendario'
  },
  en: {
    submit: 'Request diagnosis',
    sending: 'Sending…',
    name: 'Name',
    namePlaceholder: 'Your name…',
    email: 'Email',
    emailPlaceholder: 'you@email.com…',
    emailHint: 'No spam. Response in less than 24h.',
    company: 'Company',
    companyPlaceholder: 'Company name…',
    service: 'Main service',
    servicePlaceholder: 'Select one option',
    serviceOptions: ['Automations', 'Web Design', 'SEO/AEO', 'Integrated (all 3)'],
    goal: 'Main goal',
    goalPlaceholder: 'Choose your main focus',
    goalOptions: ['Generate more leads', 'Increase brand authority', 'Automate operations', 'Improve SEO/AEO'],
    goalHint: 'This helps me send you a more precise plan from the first response.',
    budget: 'Estimated budget (optional)',
    budgetOptions: ['I prefer to discuss it on a call', 'Less than $2k', '$2k - $5k', '$5k - $10k', 'More than $10k'],
    message: 'What do you want to solve?',
    messagePlaceholder: 'Example: I want +X leads/month without hiring more sales staff',
    calButton: 'Book on calendar'
  }
} as const

function SubmitButton({ locale }: { locale: Locale }) {
  const { pending } = useFormStatus()

  return (
    <button type="submit" className="button lead-form__submit" disabled={pending}>
      {pending ? copy[locale].sending : copy[locale].submit}
    </button>
  )
}

export function LeadForm({ action, calLink, locale = 'es' }: LeadFormProps) {
  const [state, formAction] = useActionState(action, initialState)
  const wasSuccess = useRef(false)

  useEffect(() => {
    if (state.status === 'success' && !wasSuccess.current) {
      wasSuccess.current = true
      trackEvent('lead_form_submit_success', { source: 'website' })
    }

    if (state.status !== 'success') {
      wasSuccess.current = false
    }
  }, [state.status])

  const t = copy[locale]

  return (
    <div className="lead-form-wrap">
      <form action={formAction} className="lead-form">
        <input type="hidden" name="locale" value={locale} />
        <input
          className="lead-form__trap"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <label htmlFor="name" className="lead-form__field">
          <span>{t.name}</span>
          <input type="text" id="name" name="name" required placeholder={t.namePlaceholder} autoComplete="name" />
        </label>

        <label htmlFor="email" className="lead-form__field">
          <span>{t.email}</span>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder={t.emailPlaceholder}
            autoComplete="email"
            spellCheck={false}
            inputMode="email"
          />
          <small className="lead-form__hint">{t.emailHint}</small>
        </label>

        <label htmlFor="company" className="lead-form__field">
          <span>{t.company}</span>
          <input type="text" id="company" name="company" placeholder={t.companyPlaceholder} autoComplete="organization" />
        </label>

        <label htmlFor="projectType" className="lead-form__field">
          <span>{t.service}</span>
          <select id="projectType" name="projectType" defaultValue="" required>
            <option value="" disabled>
              {t.servicePlaceholder}
            </option>
            {t.serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="mainGoal" className="lead-form__field">
          <span>{t.goal}</span>
          <select id="mainGoal" name="mainGoal" defaultValue="" required>
            <option value="" disabled>
              {t.goalPlaceholder}
            </option>
            {t.goalOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <small className="lead-form__hint">{t.goalHint}</small>
        </label>

        <label htmlFor="budgetRange" className="lead-form__field">
          <span>{t.budget}</span>
          <select id="budgetRange" name="budgetRange" defaultValue="">
            <option value="">{t.budgetOptions[0]}</option>
            <option value="<2k">{t.budgetOptions[1]}</option>
            <option value="2k-5k">{t.budgetOptions[2]}</option>
            <option value="5k-10k">{t.budgetOptions[3]}</option>
            <option value=">10k">{t.budgetOptions[4]}</option>
          </select>
        </label>

        <label htmlFor="message" className="lead-form__field lead-form__field--full">
          <span>{t.message}</span>
          <textarea id="message" name="message" required rows={4} placeholder={t.messagePlaceholder} />
        </label>

        <div className="lead-form__actions">
          <SubmitButton locale={locale} />
          <a
            href={calLink}
            className="button button--ghost"
            onClick={() => trackEvent('calendar_click', { source: 'lead_form', href: calLink })}
          >
            {t.calButton}
          </a>
        </div>

        {state.message ? (
          <p aria-live="polite" role="status" className={`lead-form__feedback lead-form__feedback--${state.status}`}>
            {state.message}
          </p>
        ) : null}
      </form>
    </div>
  )
}
