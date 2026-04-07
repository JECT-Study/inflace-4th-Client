import { NextRequest, NextResponse } from 'next/server'

const PROTECTED_PATHS = ['/dashboard', '/analytics', '/me']

//라우팅 가드
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  )

  if (!isProtected) return NextResponse.next()

  //PROTECTED_PATHS에 진입하려고 할 때 refresh token을 확인
  const refreshToken = request.cookies.get('__Host-refresh-token')

  //토큰이 없다면 홈으로 리다이렉트
  if (!refreshToken) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    url.searchParams.set('login', 'true')
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/analytics/:path*', '/me/:path*'],
}
