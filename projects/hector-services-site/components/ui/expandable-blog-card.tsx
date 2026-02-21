import Link from 'next/link'

import type { BlogPost } from '@/content/blog/posts'

export function ExpandableBlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="blog-card">
      <div className="blog-card__header">
        <p className="blog-card__meta">
          {post.publishedAt} · {post.readingTime}
        </p>
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
        <div className="blog-card__tags">
          {post.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <Link href={`/blog/${post.slug}`} className="service-link" style={{ marginTop: '1.2rem', display: 'inline-block' }}>
        Leer artículo →
      </Link>
    </article>
  )
}
