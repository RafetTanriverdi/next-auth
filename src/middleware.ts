import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequestWithAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname } = req.nextUrl
    const token = req.nextauth?.token

    if (!token) {
      if (pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', req.url))
      }
      return NextResponse.next()
    }
    if (token && pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true, 
    },
  }
)

export const config = {
  matcher: ['/((?!api|_next|_static|favicon.ico).*)'],
}
