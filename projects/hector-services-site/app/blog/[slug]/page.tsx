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

function renderBlogContent(content: string[], slug: string) {
  const nodes = []

  for (let index = 0; index < content.length; index += 1) {
    const block = content[index]?.trim()
    if (!block) continue

    if (block.startsWith('## ')) {
      nodes.push(
        <h2 key={`${slug}-h2-${index}`}>{block.slice(3).trim()}</h2>
      )
      continue
    }

    if (block.startsWith('### ')) {
      nodes.push(
        <h3 key={`${slug}-h3-${index}`}>{block.slice(4).trim()}</h3>
      )
      continue
    }

    if (block.startsWith('- ')) {
      const items: string[] = [block.slice(2).trim()]
      let cursor = index + 1

      while (cursor < content.length) {
        const next = content[cursor]?.trim()
        if (!next?.startsWith('- ')) break
        items.push(next.slice(2).trim())
        cursor += 1
      }

      nodes.push(
        <ul key={`${slug}-ul-${index}`}>
          {items.map((item, itemIndex) => (
            <li key={`${slug}-li-${index}-${itemIndex}`}>{item}</li>
          ))}
        </ul>
      )

      index = cursor - 1
      continue
    }

    nodes.push(<p key={`${slug}-p-${index}`}>{block}</p>)
  }

  return nodes
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
    <main className="page-shell page-shell--blog" id="main-content">
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

        <div className="blog-article__content">{renderBlogContent(post.content, post.slug)}</div>
      </article>
    </main>
  )
}
