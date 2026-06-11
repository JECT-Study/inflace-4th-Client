'use client'

import { useEffect } from 'react'

import { useOnboardingModal } from '@/features/onboarding/model/useOnboardingModal'
import { useAuthStore, loadChannelDetails } from '@/shared/api'
import { fetchCurrentUser } from '@/shared/api/userApi'

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
      try {
        const res = await fetch('/auth/refresh', { method: 'POST' })
        if (!res.ok) return

        const { accessToken } = await res.json()
        setAuth(accessToken, null)

        const user = await fetchCurrentUser()

        // 유저 테스트용 임시 코드 — 백엔드 채널 연동 미지원 기간 동안만 사용
        // /user/me 응답에 채널 정보가 없으면 localStorage에서 복구
        if (!user.userChannelDetails?.youtubeChannelId) {
          const saved = loadChannelDetails()
          if (saved) {
            user.userChannelDetails = saved
          }
        }

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
