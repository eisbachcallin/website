import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const cookie = request.headers.get('cookie') || ''
  const oryUrl = process.env.NEXT_PUBLIC_ORY_URL

  try {
    const response = await fetch(`${oryUrl}/sessions/whoami`, {
      headers: { cookie },
      credentials: 'include',
    })

    if (!response.ok) {
      const loginUrl = new URL(`${oryUrl}/self-service/login/browser`)
      loginUrl.searchParams.set('return_to', request.url)
      return NextResponse.redirect(loginUrl)
    }

    const session = await response.json()
    if (session.identity?.metadata_public?.admin !== true) {
      return NextResponse.redirect(new URL('/camp', request.url))
    }

    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/camp', request.url))
  }
}

export const config = { matcher: '/admin/:path*' }
