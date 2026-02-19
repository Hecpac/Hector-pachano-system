import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getBlogPostBySlug, getBlogPosts } from '@/content/blog/posts'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { blogPostingSchema, breadcrumbSchema } from '@/lib/seo/schema'

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return buildPageMetadata({
      title: 'Artículo no encontrado',
      description: 'El artículo solicitado no está disponible.',
      path: `/blog/${slug}`,
      noindex: true
    })
  }

  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`
  })
}

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) notFound()

  return (
    <main className="page-shell" id="main-content">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` }
          ]),
          blogPostingSchema({
            title: post.title,
            description: post.excerpt,
            path: `/blog/${post.slug}`,
            publishedAt: post.publishedAt,
            tags: post.tags
          })
        ]}
      />

      <article className="section reveal-on-scroll cinematic-panel is-visible blog-article">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.title }
          ]}
        />
        <p className="eyebrow">ARTÍCULO</p>
        <h1>{post.title}</h1>
        <p className="blog-card__meta">
          {post.publishedAt} · {post.readingTime}
        </p>

        <div className="blog-card__tags blog-card__tags--article">
          {post.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="blog-article__content">
          {post.content.map((paragraph, index) => (
            <p key={`${post.slug}-${index}`}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  )
}
