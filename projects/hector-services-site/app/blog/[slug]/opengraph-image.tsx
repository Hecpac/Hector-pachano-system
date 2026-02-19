import { createOgImage, ogContentType, ogSize } from '@/lib/seo/og-image'
import { getBlogPostBySlug } from '@/content/blog/posts'

export const size = ogSize

export const contentType = ogContentType

type OpenGraphProps = {
  params: Promise<{ slug: string }>
}

export default async function OpenGraphImage({ params }: OpenGraphProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return createOgImage({
      title: 'Blog',
      subtitle: 'Hector Pachano'
    })
  }

  return createOgImage({
    title: post.title,
    subtitle: post.tags.join(' · ')
  })
}
