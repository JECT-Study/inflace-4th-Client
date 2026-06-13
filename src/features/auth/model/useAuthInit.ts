'use client'

import { useEffect } from 'react'

import { useOnboardingModal } from '@/features/onboarding/model/useOnboardingModal'
import { useAuthStore } from '@/shared/api'
import { fetchCurrentUser } from '@/shared/api/userApi'
import {
  mockAccessToken,
  mockUserDetails,
  mockUserChannelDetails,
} from '@/shared/api/mock/mockUser'

// TEMP: 강제 로그인 상태 — 백엔드/OAuth 없이 민준테크로 로그인된 것처럼 동작
// 되돌릴 때: 이 상수와 아래 init() 최상단 FORCE_LOGIN 블록을 제거
const FORCE_LOGIN: boolean = true

//화면 새로고침 시 실행되는 함수
export function useAuthInit() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    const { setAuth, setInitializing } = useAuthStore.getState()

    async function init() {
      // TEMP: 강제 로그인 — 되돌릴 때 이 블록 제거
      if (FORCE_LOGIN) {
        setAuth(mockAccessToken, {
          userDetails: mockUserDetails,
          userChannelDetails: mockUserChannelDetails,
        })
        setInitializing(false)
        return
      }

      try {
        const res = await fetch('/auth/refresh', { method: 'POST' })
        if (!res.ok) return

        const { accessToken } = await res.json()
        setAuth(accessToken, null)

        const user = await fetchCurrentUser()
        setAuth(accessToken, user)

        if (!user.userDetails.isOnboardingCompleted) {
          useOnboardingModal.getState().open()
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
