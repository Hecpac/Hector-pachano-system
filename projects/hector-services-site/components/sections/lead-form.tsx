'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

import type { LeadFormState } from '@/app/actions'

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

        <label className="lead-form__field">
          <span>Nombre</span>
          <input type="text" name="name" required placeholder="Tu nombre" />
        </label>

        <label className="lead-form__field">
          <span>Email</span>
          <input type="email" name="email" required placeholder="tu@email.com" />
        </label>

        <label className="lead-form__field">
          <span>Empresa</span>
          <input type="text" name="company" placeholder="Nombre de empresa" />
        </label>

        <label className="lead-form__field">
          <span>Servicio principal</span>
          <select name="projectType" defaultValue="">
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option value="Automatizaciones">Automatizaciones</option>
            <option value="Diseño Web">Diseño Web</option>
            <option value="SEO/AEO">SEO/AEO</option>
            <option value="Integral">Integral (los 3)</option>
          </select>
        </label>

        <label className="lead-form__field lead-form__field--full">
          <span>¿Qué quieres resolver?</span>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Cuéntame el contexto, objetivo y deadline."
          />
        </label>

        <div className="lead-form__actions">
          <SubmitButton />
          <a href={calLink} target="_blank" rel="noreferrer" className="button button--ghost">
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
