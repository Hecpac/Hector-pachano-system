import { ImageResponse } from 'next/og'

import { SITE_NAME } from './site'

export const ogSize = {
  width: 1200,
  height: 630
}

export const ogContentType = 'image/png'

type CreateOgImageInput = {
  title: string
  subtitle?: string
}

export function createOgImage({ title, subtitle = 'Automatizaciones · Diseño Web · SEO/AEO' }: CreateOgImageInput) {
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
          {subtitle}
        </div>
        <div style={{ fontSize: 102, lineHeight: 1.02, fontWeight: 700 }}>{title}</div>
        <div style={{ fontSize: 28, letterSpacing: 2, textTransform: 'uppercase', color: '#c4c4c4' }}>
          {`${SITE_NAME} // Digital Systems`}
        </div>
      </div>
    ),
    {
      ...ogSize
    }
  )
}
