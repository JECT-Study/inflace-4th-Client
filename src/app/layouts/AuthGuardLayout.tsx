'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useRequireAuth } from '@/features/auth'
import { useLoginModal } from '@/features/auth/model/useLoginModal'

export function AuthGuardLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isInitializing } = useRequireAuth()
  const isModalOpen = useLoginModal((s) => s.isOpen)
  const router = useRouter()

  // 미로그인 상태에서 모달까지 닫히면 홈으로 리다이렉트
  useEffect(() => {
    if (!isInitializing && !isLoggedIn && !isModalOpen) {
      router.replace('/')
    }
  }, [isInitializing, isLoggedIn, isModalOpen, router])

  if (isInitializing || !isLoggedIn) return null

  return <>{children}</>
}
