import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// 구글 로그인 버튼을 누르면 가장 먼저 실행되는 라우팅 함수
export async function GET() {
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
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
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
