import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_PATHS = ['/main', '/videos', '/channel', '/influencer/']

// TEMP: 강제 로그인 상태 — 보호 경로 가드 비활성화
// 되돌릴 때: 이 상수와 아래 조건의 `!FORCE_LOGIN &&` 를 제거
const FORCE_LOGIN: boolean = true

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path))

  if (!FORCE_LOGIN && isProtected && !request.cookies.get('refreshToken')) {
    /* 미로그인 상태로 보호된 경로 접근 시 홈(/)으로 리다이렉트
     * from=protected 쿼리로 보호 경로 접근 시도임을 홈(/)에 전달
     * 로그인 모달을 open
     */
    const url = new URL('/', request.url)
    url.searchParams.set('from', 'protected')
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
