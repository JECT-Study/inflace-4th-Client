'use client'

import { useCallback } from 'react'

import { useShallow } from 'zustand/react/shallow'
import { isLoggedIn, useAuthStore } from '@/shared/api/authStore'

//로그인 정보(access token, 유저 정보 등)를 shared/api/authStore를 통해 가져와서 사용
export function useAuth() {
  const { loggedIn, user, isInitializing } = useAuthStore(
    useShallow((s) => ({
      loggedIn: isLoggedIn(s),
      user: s.user,
      isInitializing: s.isInitializing,
    }))
  )

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
    isLoggedIn: loggedIn,
    isInitializing,
    user,
    logout,
  }
}
