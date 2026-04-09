import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// 구글 로그인 버튼을 누르면 가장 먼저 실행되는 라우팅 함수
export async function GET() {
  /* 만약 NEXT_PUBLIC_MOCK_ENABLED === 'true'라면
   * msw용 모킹 라우터로 이동(/auth/mock-callback)
   * 구글 로그인으로 리다이렉트 되지 않고 목 라우팅으로 처리
   */
  if (process.env.NEXT_PUBLIC_MOCK_ENABLED === 'true') {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/mock-callback`
    )
  }

  //CSRF 방지를 위한 state를 생성하고 httpOnly 쿠키에 저장
  const state = crypto.randomUUID()

  const cookieStore = await cookies()
  cookieStore.set('oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10,
  })

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    access_type: 'offline',
    prompt: 'consent',
  })

  //Google OAuth Authorization URL로 리다이렉트
  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  )
}
