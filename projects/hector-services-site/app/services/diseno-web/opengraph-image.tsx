import { createOgImage, ogContentType, ogSize } from '@/lib/seo/og-image'

export const size = ogSize

export const contentType = ogContentType

export default function OpenGraphImage() {
  return createOgImage({
    title: 'Diseño web orientado a conversión',
    subtitle: 'UI editorial · Performance · Embudo'
  })
}
