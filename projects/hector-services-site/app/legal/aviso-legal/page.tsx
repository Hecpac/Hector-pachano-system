import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/meta'

export const metadata: Metadata = buildPageMetadata({
  title: 'Aviso Legal',
  description: 'Aviso Legal de Hector Pachano - Digital Systems.',
  path: '/legal/aviso-legal',
  noindex: true
})

export default function AvisoLegalPage() {
  return (
    <main className="page-shell section" id="main-content" style={{ marginTop: '5rem', minHeight: '60vh' }}>
      <h1>Aviso Legal</h1>
      <p className="lead">Información general sobre las condiciones de uso.</p>
      <div className="blog-article__content">
        <p>Este sitio web es operado por Hector Pachano, ofreciendo servicios B2B de diseño web, automatizaciones y SEO/AEO.</p>
        <h2>Propiedad Intelectual</h2>
        <p>Todo el contenido de este sitio web, incluyendo textos, gráficos, logotipos e imágenes, es propiedad de Hector Pachano o está licenciado para su uso, y está protegido por las leyes de propiedad intelectual.</p>
        <h2>Condiciones de Uso</h2>
        <p>El uso de este sitio web implica la aceptación de estas condiciones. Queda prohibida la reproducción total o parcial del contenido sin autorización previa.</p>
        <h2>Contacto</h2>
        <p>Para cualquier duda o consulta sobre este aviso legal, puedes escribir a Pachanodesign@gmail.com.</p>
      </div>
    </main>
  )
}