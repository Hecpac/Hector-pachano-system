'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'

import type { LeadFormState } from '@/app/actions'
import { trackEvent } from '@/lib/analytics/events'

type LeadFormProps = {
  action: (state: LeadFormState, formData: FormData) => Promise<LeadFormState>
  calLink: string
}

const initialState: LeadFormState = {
  status: 'idle',
  message: ''
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" className="button lead-form__submit" disabled={pending}>
      {pending ? 'Enviando…' : 'Solicitar diagnóstico'}
    </button>
  )
}

export function LeadForm({ action, calLink }: LeadFormProps) {
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

  return (
    <div className="lead-form-wrap">
      <form action={formAction} className="lead-form">
        <input
          className="lead-form__trap"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <label htmlFor="name" className="lead-form__field">
          <span>Nombre</span>
          <input type="text" id="name" name="name" required placeholder="Tu nombre…" autoComplete="name" />
        </label>

        <label htmlFor="email" className="lead-form__field">
          <span>Email</span>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="tu@email.com…"
            autoComplete="email"
            spellCheck={false}
            inputMode="email"
          />
          <small className="lead-form__hint">No spam. Respuesta en menos de 24h.</small>
        </label>

        <label htmlFor="company" className="lead-form__field">
          <span>Empresa</span>
          <input type="text" id="company" name="company" placeholder="Nombre de empresa…" autoComplete="organization" />
        </label>

        <label htmlFor="projectType" className="lead-form__field">
          <span>Servicio principal</span>
          <select id="projectType" name="projectType" defaultValue="" required>
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option value="Automatizaciones">Automatizaciones</option>
            <option value="Diseño Web">Diseño Web</option>
            <option value="SEO/AEO">SEO/AEO</option>
            <option value="Integral">Integral (los 3)</option>
          </select>
        </label>

        <label htmlFor="mainGoal" className="lead-form__field">
          <span>Objetivo principal</span>
          <select id="mainGoal" name="mainGoal" defaultValue="" required>
            <option value="" disabled>
              Selecciona tu foco principal
            </option>
            <option value="Generar más leads">Generar más leads</option>
            <option value="Subir autoridad de marca">Subir autoridad de marca</option>
            <option value="Automatizar operación">Automatizar operación</option>
            <option value="Mejorar SEO/AEO">Mejorar SEO/AEO</option>
          </select>
          <small className="lead-form__hint">Con esto te regreso un plan más preciso desde la primera respuesta.</small>
        </label>

        <label htmlFor="budgetRange" className="lead-form__field">
          <span>Presupuesto aproximado (opcional)</span>
          <select id="budgetRange" name="budgetRange" defaultValue="">
            <option value="">Prefiero comentarlo en llamada</option>
            <option value="<2k">Menos de $2k</option>
            <option value="2k-5k">$2k - $5k</option>
            <option value="5k-10k">$5k - $10k</option>
            <option value=">10k">Más de $10k</option>
          </select>
        </label>

        <label htmlFor="message" className="lead-form__field lead-form__field--full">
          <span>¿Qué quieres resolver?</span>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder="Ejemplo: quiero +X leads/mes sin contratar más equipo comercial"
          />
        </label>

        <div className="lead-form__actions">
          <SubmitButton />
          <a
            href={calLink}
            className="button button--ghost"
            onClick={() => trackEvent('calendar_click', { source: 'lead_form', href: calLink })}
          >
            Agendar en calendario
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
