import { create } from 'zustand'

import type { AuthState, UserChannelDetails } from './types'
import {
  FORCE_LOGIN,
  FORCED_PROFILE_IMAGE,
  FORCED_CHANNEL_NAME,
} from '@/shared/config/devAuth'

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
    // TEMP: 강제 로그인 데모 — user가 갱신될 때 표시 프로필(플랜/채널명/이미지)을
    //       민준테크 고정값으로 덮어쓴다. (실제 프로필로 바뀌어 보이는 것 방지)
    const nextUser =
      FORCE_LOGIN && user
        ? {
            ...user,
            userDetails: {
              ...user.userDetails,
              plan: 'GROWTH' as const,
              profileImage: FORCED_PROFILE_IMAGE,
            },
            userChannelDetails: {
              youtubeChannelId:
                user.userChannelDetails?.youtubeChannelId ?? 'mock-channel-id',
              youtubeChannelName: FORCED_CHANNEL_NAME,
              youtubeChannelProfileImageUrl: FORCED_PROFILE_IMAGE,
            },
          }
        : user
    if (nextUser?.userChannelDetails?.youtubeChannelId) {
      saveChannelDetails(nextUser.userChannelDetails)
    }
    set({ accessToken, user: nextUser })
  },
  reset: () => {
    clearChannelDetails()
    set({ accessToken: null, user: null })
  },
  setInitializing: (value) => set({ isInitializing: value }),
}))

export { loadChannelDetails }

export const isLoggedIn = (state: AuthState) => !!state.accessToken
