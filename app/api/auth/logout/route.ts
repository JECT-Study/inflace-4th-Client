import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

//로그아웃 진행
export async function POST() {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('__Host-refresh-token')?.value

  if (refreshToken) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      })
    } catch {
      // 백엔드 로그아웃 실패해도 클라이언트 쿠키는 삭제
    }
  }

  cookieStore.delete('__Host-refresh-token')

  return NextResponse.json({ success: true })
}
