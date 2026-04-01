'use client'

import { useCallback } from 'react'

import { useAuthStore } from '@/shared/api'

//로그인 정보(access token, 유저 정보 등)를 shared/api/authStore를 통해 가져와서 사용
export function useAuth() {
  const accessToken = useAuthStore((s) => s.accessToken)
  const user = useAuthStore((s) => s.user)
  const isInitializing = useAuthStore((s) => s.isInitializing)

  //로그아웃 버튼 누를 시 실행, /api/auth/logout로 이동
  const logout = useCallback(async () => {
    useAuthStore.getState().reset()
    try {
      await fetch('/auth/logout', { method: 'POST' })
    } catch {
      // 쿠키 삭제 실패해도 클라이언트 상태는 이미 초기화됨
    }
  }, [])

  return {
    isAuthenticated: !!accessToken,
    isInitializing,
    user,
    logout,
  }
}
