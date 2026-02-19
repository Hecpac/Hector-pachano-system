import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630
}

export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#090909',
          color: '#f5f5f5',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px',
          border: '1px solid #2a2a2a'
        }}
      >
        <div
          style={{
            fontSize: 34,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#ff6a00'
          }}
        >
          Automatizaciones · Diseño Web · SEO/AEO
        </div>
        <div style={{ fontSize: 112, lineHeight: 1, fontWeight: 700 }}>Design. Automate. Rank.</div>
        <div style={{ fontSize: 28, letterSpacing: 2, textTransform: 'uppercase', color: '#c4c4c4' }}>
          Hector // Digital Systems
        </div>
      </div>
    ),
    {
      ...size
    }
  )
}
