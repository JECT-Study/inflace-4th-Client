import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { decodeJwt, jwtToAuthUser } from '@/shared/lib/decodeJwt'

// 토큰을 refresh
export async function POST() {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refreshToken')?.value

  if (!refreshToken) {
    return NextResponse.json(
      { error: 'Refresh token이 없습니다.' },
      { status: 401 }
    )
  }

  //백엔드 서버에 토큰 갱신 요청
  try {
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reissue`,
      {
        method: 'POST',
        headers: { Cookie: `refreshToken=${refreshToken}` },
      }
    )

    const responseText = await backendResponse.text()

    if (!backendResponse.ok) {
      cookieStore.delete('refreshToken')
      return NextResponse.json(
        { error: '토큰 갱신에 실패했습니다.' },
        { status: 401 }
      )
    }

    const { responseDto } = JSON.parse(responseText)
    const accessToken = responseDto?.AccessToken

    // 백엔드가 새 refreshToken을 Set-Cookie로 내려주는 경우 재설정
    const setCookieHeader = backendResponse.headers.get('set-cookie')
    const newRefreshTokenMatch = setCookieHeader?.match(/refreshToken=([^;]+)/)
    const newRefreshToken = newRefreshTokenMatch?.[1]

    if (newRefreshToken) {
      cookieStore.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    }

    //새 AT는 response body로 전달
    return NextResponse.json({
      accessToken,
      user: jwtToAuthUser(decodeJwt(accessToken)),
    })
  } catch {
    return NextResponse.json(
      { error: '토큰 갱신 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
