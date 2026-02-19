import type { Metadata } from 'next'
import Link from 'next/link'

import { getBlogPosts } from '@/content/blog/posts'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { buildPageMetadata } from '@/lib/seo/meta'
import { blogCollectionSchema, breadcrumbSchema } from '@/lib/seo/schema'

export const metadata: Metadata = buildPageMetadata({
  title: 'Blog',
  description: 'Ideas prácticas sobre automatizaciones, diseño web y SEO/AEO para crecer con sistema.',
  path: '/blog'
})

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <main className="page-shell" id="main-content">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Blog', path: '/blog' }
          ]),
          blogCollectionSchema(
            posts.map((post) => ({
              title: post.title,
              slug: post.slug,
              publishedAt: post.publishedAt
            }))
          )
        ]}
      />

      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Blog' }]} />
        <p className="eyebrow">BLOG</p>
        <h1>Insights de ejecución: web, automatización y SEO/AEO</h1>
        <p className="lead">
          Artículos cortos y accionables para construir un sistema digital que convierta mejor.
        </p>

        <div className="blog-grid stagger-fade-in">
          {posts.map((post) => (
            <article key={post.slug} className="blog-card">
              <p className="blog-card__meta">
                {post.publishedAt} · {post.readingTime}
              </p>
              <h2>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.excerpt}</p>
              <div className="blog-card__tags">
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <Link href={`/blog/${post.slug}`} className="service-link">
                Leer artículo →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
