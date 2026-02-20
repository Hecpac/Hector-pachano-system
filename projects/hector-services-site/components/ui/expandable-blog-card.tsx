'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { BlogPost } from '@/content/blog/posts'

export function ExpandableBlogCard({ post }: { post: BlogPost }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <article 
      className={`blog-card expandable-card ${isExpanded ? 'is-expanded' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
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

      <div className="expandable-content">
        <div className="expandable-content-inner">
          <div className="blog-article__content">
            {post.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
          <div style={{ marginTop: '2rem' }}>
            <Link 
              href={`/blog/${post.slug}`} 
              className="button button--small" 
              onClick={(e) => e.stopPropagation()}
            >
              Enlace permanente
            </Link>
          </div>
        </div>
      </div>

      {!isExpanded && (
        <div className="service-link" style={{ cursor: 'pointer', marginTop: '1.2rem', display: 'inline-block' }}>
          Expandir artículo ↓
        </div>
      )}
      {isExpanded && (
        <div className="service-link" style={{ cursor: 'pointer', marginTop: '1.2rem', display: 'inline-block' }}>
          Contraer artículo ↑
        </div>
      )}
    </article>
  )
}
