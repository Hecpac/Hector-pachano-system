import type { Metadata } from 'next'
import Link from 'next/link'

import { getBlogPosts } from '@/content/blog/posts'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { blogEn } from '@/app/en/content'
import { buildPageMetadata } from '@/lib/seo/meta'

export const metadata: Metadata = buildPageMetadata({
  title: 'Blog',
  description: 'Execution notes on web, automations and SEO/AEO for B2B growth.',
  path: '/en/blog'
})

export default function BlogPageEn() {
  const posts = getBlogPosts()

  return (
    <main className="page-shell" id="main-content" lang="en">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Home', href: '/en' }, { label: 'Blog' }]} />
        <p className="eyebrow">BLOG</p>
        <h1>Execution insights: web, automations and SEO/AEO</h1>
        <p className="lead">Actionable notes to build systems that convert and scale.</p>

        <div className="blog-grid stagger-fade-in" style={{ marginTop: '1rem' }}>
          {posts.map((post) => {
            const t = blogEn[post.slug]
            return (
              <article key={post.slug} className="blog-card">
                <h2>{t?.title ?? post.title}</h2>
                <p>{t?.excerpt ?? post.excerpt}</p>
                <Link href={`/en/blog/${post.slug}`} className="service-link">
                  Read article →
                </Link>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
