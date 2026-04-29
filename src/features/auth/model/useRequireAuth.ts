'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useAuth } from './useAuth'

/* refreshToken 쿠키는 있지만 서버 유효성 실패(만료 등) 엣지 케이스 대응
 * proxy.ts의 /?from=protected 이동 → 라우팅 가드
 */
export function useRequireAuth() {
  const { isLoggedIn, isInitializing } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isInitializing && !isLoggedIn) {
      router.replace('/?from=protected')
    }
  }, [isInitializing, isLoggedIn, router])

  return { isLoggedIn, isInitializing }
}
