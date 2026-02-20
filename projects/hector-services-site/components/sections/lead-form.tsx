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
          <input type="text" id="name" name="name" required placeholder="Tu nombre" />
        </label>

        <label htmlFor="email" className="lead-form__field">
          <span>Email</span>
          <input type="email" id="email" name="email" required placeholder="tu@email.com" />
        </label>

        <label htmlFor="company" className="lead-form__field">
          <span>Empresa</span>
          <input type="text" id="company" name="company" placeholder="Nombre de empresa" />
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

        <label htmlFor="message" className="lead-form__field lead-form__field--full">
          <span>¿Qué quieres resolver?</span>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder="Cuéntame el contexto, objetivo y deadline."
          />
        </label>

        <div className="lead-form__actions">
          <SubmitButton />
          <a
            href={calLink}
            target="_blank"
            rel="noreferrer"
            className="button button--ghost"
            onClick={() => trackEvent('calendar_click', { source: 'lead_form', href: calLink })}
          >
            Agendar en calendario
          </a>
        </div>

        {state.message ? (
          <p className={`lead-form__feedback lead-form__feedback--${state.status}`}>{state.message}</p>
        ) : null}
      </form>
    </div>
  )
}
