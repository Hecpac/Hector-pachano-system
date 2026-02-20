import { createOgImage, ogContentType, ogSize } from '@/lib/seo/og-image'
import { getCaseStudyBySlug } from '@/content/case-studies/cases'

export const size = ogSize

export const contentType = ogContentType

type OpenGraphProps = {
  params: Promise<{ slug: string }>
}

export default async function OpenGraphImage({ params }: OpenGraphProps) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    return createOgImage({
      title: 'Case study',
      subtitle: 'Hector Pachano'
    })
  }

  return createOgImage({
    title: caseStudy.metric,
    subtitle: caseStudy.title
  })
}
