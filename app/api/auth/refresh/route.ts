import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// 토큰을 refresh
export async function POST() {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('__Host-refresh-token')?.value

  if (!refreshToken) {
    return NextResponse.json(
      { error: 'Refresh token이 없습니다.' },
      { status: 401 }
    )
  }

  //백엔드 서버에 토큰 갱신 요청
  try {
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      }
    )

    if (!backendResponse.ok) {
      cookieStore.delete('__Host-refresh-token')
      return NextResponse.json(
        { error: '토큰 갱신에 실패했습니다.' },
        { status: 401 }
      )
    }

    const {
      accessToken,
      refreshToken: newRefreshToken,
      user,
    } = await backendResponse.json()

    //새 RT는 쿠키로 교체
    cookieStore.set('__Host-refresh-token', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 14,
    })

    //새 AT는 response body로 전달
    return NextResponse.json({ accessToken, user })
  } catch {
    return NextResponse.json(
      { error: '토큰 갱신 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
