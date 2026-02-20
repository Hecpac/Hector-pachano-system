'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'

import type { LeadFormState } from '@/app/actions'
import { trackEvent } from '@/lib/analytics/events'

type WebAuditorProps = {
  action: (state: LeadFormState, formData: FormData) => Promise<LeadFormState>
}

const initialState: LeadFormState = {
  status: 'idle',
  message: ''
}

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="button lead-form__submit" disabled={pending}>
      {pending ? pendingLabel : label}
    </button>
  )
}

export function WebAuditorForm({ action }: WebAuditorProps) {
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'results'>('idle')
  const [targetUrl, setTargetUrl] = useState('')
  const [scanLogs, setScanLogs] = useState<string[]>([])
  
  const [formState, formAction] = useActionState(action, initialState)
  const wasSuccess = useRef(false)

  useEffect(() => {
    if (formState.status === 'success' && !wasSuccess.current) {
      wasSuccess.current = true
      trackEvent('auditor_lead_success', { url: targetUrl })
    }
  }, [formState.status, targetUrl])

  const handleInitialSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const url = String(formData.get('url') || '').trim()
    if (!url) return

    setTargetUrl(url)
    setPhase('scanning')
    trackEvent('auditor_scan_start', { url })

    // Simulate scanning process
    const logs = [
      '>> Conectando a servidor...',
      `>> Resolviendo DNS para ${url}`,
      '>> Analizando métricas de Web Vitals...',
      '>> Leyendo estructura de DOM y accesibilidad...',
      '>> Validando schemas JSON-LD para AEO...',
      '>> Comprobando tiempo de respuesta (TTFB)...',
      '>> ¡Análisis completado! Generando reporte de diagnóstico...'
    ]
    
    let currentLog = 0
    setScanLogs([logs[0]])

    const interval = setInterval(() => {
      currentLog++
      if (currentLog < logs.length) {
        setScanLogs(prev => [...prev, logs[currentLog]])
      } else {
        clearInterval(interval)
        setTimeout(() => setPhase('results'), 800)
      }
    }, 600)
  }

  return (
    <div className="lead-form-wrap auditor-wrap">
      {phase === 'idle' && (
        <form onSubmit={handleInitialSubmit} className="lead-form">
          <label className="lead-form__field lead-form__field--full">
            <span>¿Qué URL quieres que auditemos?</span>
            <input 
              type="url" 
              name="url" 
              required 
              placeholder="https://tu-sitio-web.com" 
              autoComplete="url"
            />
          </label>
          <div className="lead-form__actions">
            <button type="submit" className="button lead-form__submit">
              Comenzar análisis gratuito
            </button>
          </div>
        </form>
      )}

      {phase === 'scanning' && (
        <div className="auditor-terminal">
          <div className="auditor-terminal__header">
            <span>TERMINAL</span>
            <span className="auditor-terminal__dots">...</span>
          </div>
          <div className="auditor-terminal__body">
            {scanLogs.map((log, i) => (
              <p key={i} className="auditor-terminal__log">{log}</p>
            ))}
            <span className="auditor-terminal__cursor">_</span>
          </div>
        </div>
      )}

      {phase === 'results' && (
        <form action={formAction} className="lead-form fade-in">
          <div className="lead-form__field lead-form__field--full auditor-summary">
            <h3>¡Escaneo Finalizado! 🚨</h3>
            <p>Hemos encontrado <strong>varias oportunidades críticas</strong> de mejora en rendimiento y conversión para <span className="brand-highlight">{targetUrl}</span>.</p>
            <p>Déjanos tu correo y te enviamos el diagnóstico completo detallando qué está fallando y cómo solucionarlo.</p>
          </div>

          <input type="hidden" name="website" value={targetUrl} />
          
          <input
            className="lead-form__trap"
            type="text"
            name="trap"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <label className="lead-form__field lead-form__field--full">
            <span>¿A qué email enviamos el reporte?</span>
            <input type="email" name="email" required placeholder="tu@email.com" />
          </label>

          <div className="lead-form__actions">
            <SubmitButton label="Solicitar reporte" pendingLabel="Solicitando..." />
          </div>

          {formState.message && (
            <p className={`lead-form__feedback lead-form__feedback--${formState.status}`}>
              {formState.message}
            </p>
          )}
        </form>
      )}
    </div>
  )
}
