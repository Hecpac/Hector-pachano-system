import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getBlogPostBySlug, getBlogPosts } from '@/content/blog/posts'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buildPageMetadata } from '@/lib/seo/meta'

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return buildPageMetadata({
      title: 'Article not found',
      description: 'Requested article is not available.',
      path: `/en/blog/${slug}`,
      noindex: true
    })
  }

  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/en/blog/${post.slug}`
  })
}

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPageEn({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className="page-shell page-shell--blog" id="main-content" lang="en">
      <article className="section reveal-on-scroll cinematic-panel is-visible blog-article">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/en' },
            { label: 'Blog', href: '/en/blog' },
            { label: post.title }
          ]}
        />
        <p className="eyebrow">ARTICLE</p>
        <h1>{post.title}</h1>
        <p className="blog-card__meta">{post.publishedAt} · {post.readingTime}</p>

        <p className="lead">
          Full editorial translation is in progress. You can read the Spanish version below while we complete EN localization.
        </p>
        <p>
          <Link href={`/blog/${post.slug}`} className="service-link">
            Open Spanish original →
          </Link>
        </p>
      </article>
    </main>
  )
}
