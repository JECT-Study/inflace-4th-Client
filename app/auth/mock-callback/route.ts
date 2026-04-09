import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// NEXT_PUBLIC_MOCK_ENABLED=true일 때 실제 Google OAuth 없이 mock 로그인을 처리하는 콜백
export async function GET() {
  const origin = process.env.NEXT_PUBLIC_APP_URL!

  // decodeJwt 호환 포맷의 mock JWT 생성 (header.payload.signature)
  const now = Math.floor(Date.now() / 1000)
  const payloadData = {
    sub: 'mock-user-1',
    iat: now,
    exp: now + 3600,
    profileImage: '',
    plan: 'FREE',
    isNewUser: false,
  }

  const header = Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' })).toString('base64')
  const payload = Buffer.from(JSON.stringify(payloadData)).toString('base64')
  const mockAccessToken = `${header}.${payload}.mock-signature`

  // mock refresh token 쿠키 저장 (새로고침 시 /auth/refresh MSW 핸들러가 처리)
  const cookieStore = await cookies()
  cookieStore.set('refreshToken', 'mock-refresh-token', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  return new NextResponse(
    buildPostMessageHtml('AUTH_SUCCESS', origin, {
      accessToken: mockAccessToken,
      user: null,
    }),
    { headers: { 'Content-Type': 'text/html' } }
  )
}

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
  fetch('/auth/mock-login', { method: 'POST' }).finally(() => {
    window.opener.postMessage(${message}, "${origin}");
    window.close();
  });
</script>
</body>
</html>`
}
