import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

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

  // authorization code를 백엔드 POST /auth/google에 전달
  try {
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      }
    )

    if (!backendResponse.ok) {
      throw new Error('백엔드 인증에 실패했습니다.')
    }

    const { accessToken, refreshToken, user } = await backendResponse.json()

    //RT를 httpOnly/Secure/SameSite=Lax 쿠키로 저장
    cookieStore.set('__Host-refresh-token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 14,
    })

    return new NextResponse(
      buildPostMessageHtml('AUTH_SUCCESS', origin, { accessToken, user }),
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

//HTML 페이지를 반환하여 postMessage로 AT + user를 부모 창에 전달하고 팝업을 닫는다
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
