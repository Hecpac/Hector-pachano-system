'use server'

export type LeadFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

const INITIAL_STATE: LeadFormState = {
  status: 'idle',
  message: ''
}

export async function submitLeadAction(
  _previousState: LeadFormState = INITIAL_STATE,
  formData: FormData
): Promise<LeadFormState> {
  const trap = String(formData.get('website') || '')
  if (trap) {
    return {
      status: 'success',
      message: 'Gracias. Te contacto pronto.'
    }
  }

  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const company = String(formData.get('company') || '').trim()
  const projectType = String(formData.get('projectType') || '').trim()
  const message = String(formData.get('message') || '').trim()

  if (!name || !email || !message) {
    return {
      status: 'error',
      message: 'Completa nombre, email y objetivo del proyecto.'
    }
  }

  const resendKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Leads <onboarding@resend.dev>'

  if (!resendKey || !toEmail) {
    console.info('[lead-form] missing env, using local success fallback', {
      name,
      email,
      company,
      projectType
    })

    return {
      status: 'success',
      message: 'Recibido. (Modo local) Configuramos envío real en cuanto conectes Resend.'
    }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `Nuevo lead web: ${name}`,
        reply_to: email,
        text: [
          `Nombre: ${name}`,
          `Email: ${email}`,
          `Empresa: ${company || 'N/A'}`,
          `Tipo de proyecto: ${projectType || 'N/A'}`,
          '',
          'Objetivo:',
          message
        ].join('\n')
      }),
      cache: 'no-store'
    })

    if (!response.ok) {
      const detail = await response.text()
      console.error('[lead-form] resend error', response.status, detail)
      return {
        status: 'error',
        message: 'No pude enviar el formulario. Escríbeme directo por email y lo resolvemos.'
      }
    }

    return {
      status: 'success',
      message: 'Listo. Te responderé en menos de 24 horas.'
    }
  } catch (error) {
    console.error('[lead-form] unexpected error', error)
    return {
      status: 'error',
      message: 'Error de conexión. Intenta de nuevo en unos minutos.'
    }
  }
}
