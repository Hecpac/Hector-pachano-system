import { createOgImage, ogContentType, ogSize } from '@/lib/seo/og-image'

export const size = ogSize

export const contentType = ogContentType

export default function OpenGraphImage() {
  return createOgImage({
    title: 'Automatizaciones que escalan operación',
    subtitle: 'Lead flows · CRM integration · Sistemas'
  })
}
