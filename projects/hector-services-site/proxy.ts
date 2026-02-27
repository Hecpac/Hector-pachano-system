import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers)
  const locale = request.nextUrl.pathname.startsWith('/en') ? 'en' : 'es'
  headers.set('x-locale', locale)

  return NextResponse.next({
    request: {
      headers
    }
  })
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)']
}
