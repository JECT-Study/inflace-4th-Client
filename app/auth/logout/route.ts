import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

//로그아웃 진행
export async function POST() {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refreshToken')?.value

  if (refreshToken) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: 'POST',
        headers: { Cookie: `refreshToken=${refreshToken}` },
      })
    } catch {
      // 백엔드 로그아웃 실패해도 클라이언트 쿠키는 삭제
    }
  }

  cookieStore.delete('refreshToken')

  return NextResponse.json({ success: true })
}
