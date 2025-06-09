import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // check for cookie
  // const payloadToken = request.cookies.get('payload-token')
  const payloadToken = request.cookies.get('__app-session-token')
  if (!payloadToken) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  // TODO: a cookie is not enough. you should check for real user.
  // prevent / if needed
  //   if (request.nextUrl.pathname === '/') {
  //     return NextResponse.redirect(new URL('/home', request.url))
  //   }

  // check things based on cookie, like admin/user
  // ...

  // let payload handle /api routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // let server components handle token verification
  return NextResponse.next()
}

// this code dictates which routes the middleware will run on
// aka, protected routes. for logged in users only.
// removing '/api/:path*' as it is blocking the admin user from login
export const config = {
  matcher: ['/dashboard', '/todos/:path*'],
}
