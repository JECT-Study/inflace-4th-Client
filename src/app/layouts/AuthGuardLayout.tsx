'use client'

import { useRequireAuth } from '@/features/auth'

//인증이 필요한 페이지(ex. /main)에 접근 시 사용할 라우팅 가드 레이아웃
export function AuthGuardLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isInitializing } = useRequireAuth()

  if (isInitializing || !isLoggedIn) return null

  return <>{children}</>
}
