import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/meta'

export const metadata: Metadata = buildPageMetadata({
  title: 'Política de Privacidad',
  description: 'Política de Privacidad de Hector Pachano - Digital Systems.',
  path: '/legal/privacidad',
  noindex: true
})

export default function PrivacidadPage() {
  return (
    <main className="page-shell section" id="main-content" style={{ marginTop: '5rem', minHeight: '60vh' }}>
      <h1>Política de Privacidad</h1>
      <p className="lead">Última actualización: Febrero 2026</p>
      <div className="blog-article__content">
        <p>En Hector Pachano // Digital Systems respetamos tu privacidad y nos comprometemos a proteger tus datos personales de acuerdo con las normativas vigentes (RGPD / LGPD).</p>
        <h2>Recopilación de Datos</h2>
        <p>A través de nuestro formulario de contacto, recopilamos tu nombre, correo electrónico y detalles de tu proyecto exclusivamente para responder a tu solicitud y ofrecerte nuestros servicios.</p>
        <h2>Uso de la Información</h2>
        <p>No compartimos, vendemos ni alquilamos tus datos personales a terceros. Los utilizamos únicamente para establecer comunicación comercial contigo.</p>
        <h2>Tus Derechos</h2>
        <p>Tienes derecho a acceder, rectificar o eliminar tus datos personales en cualquier momento enviando un correo a hola@hectorpachano.com.</p>
      </div>
    </main>
  )
}