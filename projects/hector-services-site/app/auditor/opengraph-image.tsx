import { createOgImage, ogContentType, ogSize } from '@/lib/seo/og-image'

export const size = ogSize

export const contentType = ogContentType

export default function OpenGraphImage() {
  return createOgImage({
    title: 'Auditor IA para Webs B2B',
    subtitle: 'Diagnóstico técnico · Rendimiento · Conversión'
  })
}
