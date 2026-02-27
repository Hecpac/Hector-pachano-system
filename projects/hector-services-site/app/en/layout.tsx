import type { Metadata } from 'next'

import { buildLocaleAlternates } from '@/lib/seo/meta'
import { SITE_NAME } from '@/lib/seo/site'

export const metadata: Metadata = {
  title: {
    default: `Digital Systems B2B | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`
  },
  description:
    'English version of Pachano Design: digital systems for B2B teams (web, automations and SEO/AEO).',
  keywords: [
    'b2b web design',
    'crm automations',
    'seo for b2b',
    'answer engine optimization',
    'next.js development'
  ],
  openGraph: {
    locale: 'en_US'
  },
  alternates: buildLocaleAlternates('/en')
}

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <div lang="en">{children}</div>
}
