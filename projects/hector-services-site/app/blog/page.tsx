import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import { getBlogPosts } from '@/content/blog/posts'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { Parallax } from '@/components/ui/parallax'
import { ExpandableBlogCard } from '@/components/ui/expandable-blog-card'
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

      <section className="section reveal-on-scroll cinematic-panel is-visible" style={{ position: 'relative', overflow: 'hidden' }}>
        
        <div className="blog-hero__grid">
          <div className="blog-hero__content">
            <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Blog' }]} />
            <p className="eyebrow">BLOG</p>
            <h1>Insights de ejecución: web, automatización y SEO/AEO</h1>
            <p className="lead">
              Artículos cortos y accionables para construir un sistema digital que convierta mejor.
            </p>
          </div>

          <Parallax speed={0.1} relativeTo="scroll" className="blog-hero__image-container" zIndex={1}>
            <div className="blog-hero__image-inner">
              <Image
                src="/images/blog/bilder.jpeg"
                alt="Hombres leyendo - Insights del blog"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                quality={90}
                priority
              />
            </div>
          </Parallax>
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="blog-grid stagger-fade-in" style={{ marginTop: '2rem' }}>
            {posts.map((post) => (
              <ExpandableBlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
