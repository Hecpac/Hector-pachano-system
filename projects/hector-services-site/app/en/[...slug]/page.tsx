import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'

type FallbackPageProps = {
  params: Promise<{ slug: string[] }>
}

export default async function EnglishFallbackPage({ params }: FallbackPageProps) {
  const { slug } = await params
  const spanishPath = `/${slug.join('/')}`

  return (
    <main className="page-shell" id="main-content" lang="en">
      <section className="section reveal-on-scroll cinematic-panel is-visible">
        <Breadcrumbs items={[{ label: 'Home', href: '/en' }, { label: 'English version' }]} />
        <p className="eyebrow">ENGLISH VERSION</p>
        <h1>We are translating this page</h1>
        <p className="lead">
          This section is still in progress. You can access the Spanish version now and we will keep expanding English pages.
        </p>
        <p>
          <Link href={spanishPath} className="service-link">
            Open Spanish version →
          </Link>
        </p>
      </section>
    </main>
  )
}
