import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getBlogPostBySlug, getBlogPosts } from '@/content/blog/posts'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { blogEn } from '@/app/en/content'
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
  const t = blogEn[slug]

  if (!post) {
    return buildPageMetadata({
      title: 'Article not found',
      description: 'Requested article is not available.',
      path: `/en/blog/${slug}`,
      noindex: true
    })
  }

  return buildPageMetadata({
    title: t?.title ?? post.title,
    description: t?.excerpt ?? post.excerpt,
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

  const t = blogEn[post.slug]
  const hasFullContent = t?.content && t.content.length > 0

  return (
    <main className="page-shell page-shell--blog" id="main-content" lang="en">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/en' },
            { name: 'Blog', path: '/en/blog' },
            { name: t?.title ?? post.title, path: `/en/blog/${post.slug}` }
          ]),
          blogPostingSchema({
            title: t?.title ?? post.title,
            description: t?.excerpt ?? post.excerpt,
            path: `/en/blog/${post.slug}`,
            publishedAt: post.publishedAt,
            tags: post.tags
          })
        ]}
      />

      <article className="section reveal-on-scroll cinematic-panel is-visible blog-article">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/en' },
            { label: 'Blog', href: '/en/blog' },
            { label: t?.title ?? post.title }
          ]}
        />
        <p className="eyebrow">ARTICLE</p>
        <h1>{t?.title ?? post.title}</h1>
        <p className="blog-card__meta">{post.publishedAt} · {post.readingTime}</p>

        <div className="blog-card__tags blog-card__tags--article">
          {post.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        {hasFullContent ? (
          <div className="blog-article__content">
            {renderBlogContent(t!.content!, post.slug)}
          </div>
        ) : (
          <div className="blog-article__content">
            <p className="lead">{t?.summary ?? post.excerpt}</p>

            {t?.takeaways?.length ? (
              <>
                <h2>Key takeaways</h2>
                <ul>
                  {t.takeaways.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}

            <h2>Full version</h2>
            <p>
              Complete editorial version in Spanish:{' '}
              <Link href={`/blog/${post.slug}`} className="service-link">
                open original article →
              </Link>
            </p>
          </div>
        )}
      </article>
    </main>
  )
}
