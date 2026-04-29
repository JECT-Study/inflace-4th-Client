import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import type { LoginResponse } from '@/features/auth/model/types'

//구글에서 리다이렉트 된 후 실행되는 콜백 함수
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  // /api/auth/google에서 저장한 쿠키의 state와 콜백의 state를 대조하여 CSRF 검증
  const cookieStore = await cookies()
  const storedState = cookieStore.get('oauth_state')?.value

  cookieStore.delete('oauth_state')

  const origin = process.env.NEXT_PUBLIC_APP_URL!

  if (error || !code || !state || state !== storedState) {
    const errorMessage = error || 'OAuth 검증에 실패했습니다.'
    return new NextResponse(
      buildPostMessageHtml('AUTH_ERROR', origin, { error: errorMessage }),
      {
        headers: { 'Content-Type': 'text/html' },
      }
    )
  }

  // authorization code를 백엔드 GET /auth/login에 Query Parameter로 전달
  try {
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login?provider=google&code=${code}`,
      { method: 'GET' }
    )

    if (!backendResponse.ok) {
      throw new Error('백엔드 인증에 실패했습니다.')
    }

    const data: LoginResponse = await backendResponse.json()

    if (!data.success) {
      throw new Error(
        typeof data.error === 'object' && data.error !== null
          ? data.error.message
          : '백엔드 인증에 실패했습니다.'
      )
    }

    if (typeof data.responseDto !== 'object') {
      throw new Error('백엔드 인증에 실패했습니다.')
    }

    const { accessToken, userDetails, userChannelDetails } = data.responseDto

    // 백엔드가 Set-Cookie 헤더로 refreshToken을 내려주므로 값을 추출하여 재설정
    const setCookieHeader = backendResponse.headers.get('set-cookie')
    const refreshTokenMatch = setCookieHeader?.match(/refreshToken=([^;]+)/)
    const refreshToken = refreshTokenMatch?.[1]

    if (refreshToken) {
      cookieStore.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    }

    const user = { userDetails, userChannelDetails: userChannelDetails ?? null }

    return new NextResponse(
      buildPostMessageHtml('AUTH_SUCCESS', origin, {
        accessToken,
        user,
      }),
      { headers: { 'Content-Type': 'text/html' } }
    )
  } catch {
    return new NextResponse(
      buildPostMessageHtml('AUTH_ERROR', origin, {
        error: '로그인 처리 중 오류가 발생했습니다.',
      }),
      { headers: { 'Content-Type': 'text/html' } }
    )
  }
}

//HTML 페이지를 반환하여 postMessage로 accessToken + user를 부모 창에 전달하고 팝업을 닫는다
function buildPostMessageHtml(
  type: string,
  origin: string,
  payload: Record<string, unknown>
) {
  const message = JSON.stringify({ type, ...payload })
  return `<!DOCTYPE html>
<html>
<body>
<script>
  window.opener.postMessage(${message}, "${origin}");
  window.close();
</script>
</body>
</html>`
}
