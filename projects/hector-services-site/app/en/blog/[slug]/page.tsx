import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getBlogPostBySlug, getBlogPosts } from '@/content/blog/posts'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { blogEn } from '@/app/en/content'
import { buildPageMetadata } from '@/lib/seo/meta'

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
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

  return (
    <main className="page-shell page-shell--blog" id="main-content" lang="en">
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

        <h2>Source version</h2>
        <p>
          Full editorial version in Spanish:
          {' '}
          <Link href={`/blog/${post.slug}`} className="service-link">
            open original article →
          </Link>
        </p>
      </article>
    </main>
  )
}
