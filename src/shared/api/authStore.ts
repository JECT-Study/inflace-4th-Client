import { create } from 'zustand'

import type { AuthState, UserChannelDetails } from './types'

// 유저 테스트용 임시 코드 — 유튜브 채널 연동 백엔드 미지원 기간 동안만 사용
const CHANNEL_DETAILS_KEY = 'mock_channel_details'

function saveChannelDetails(details: UserChannelDetails) {
  localStorage.setItem(CHANNEL_DETAILS_KEY, JSON.stringify(details))
}

function loadChannelDetails(): UserChannelDetails | null {
  try {
    const raw = localStorage.getItem(CHANNEL_DETAILS_KEY)
    return raw ? (JSON.parse(raw) as UserChannelDetails) : null
  } catch {
    return null
  }
}

function clearChannelDetails() {
  localStorage.removeItem(CHANNEL_DETAILS_KEY)
}

//access token, 유저 정보, 초기화 상태를 메모리에 보관
export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isInitializing: true,
  setAuth: (accessToken, user) => {
    if (user?.userChannelDetails?.youtubeChannelId) {
      saveChannelDetails(user.userChannelDetails)
    }
    set({ accessToken, user })
  },
  reset: () => {
    clearChannelDetails()
    set({ accessToken: null, user: null })
  },
  setInitializing: (value) => set({ isInitializing: value }),
}))

export { loadChannelDetails }

export const isLoggedIn = (state: AuthState) => !!state.accessToken
