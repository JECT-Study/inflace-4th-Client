'use client'

import { useEffect } from 'react'

import { useAuthStore } from '@/shared/api'

//화면 새로고침 시 실행되는 함수
export function useAuthInit() {
  useEffect(() => {
    const { setAuth, setInitializing } = useAuthStore.getState()

    // app/api/auth/refresh 실행(token refresh)
    async function init() {
      try {
        const res = await fetch('/auth/refresh', { method: 'POST' })
        if (res.ok) {
          const { accessToken, user } = await res.json()
          setAuth(accessToken, user)
        }
      } catch {
        // RT 쿠키 없거나 만료 → 비로그인 상태 유지
      } finally {
        setInitializing(false)
      }
    }

    init()
  }, [])
}
