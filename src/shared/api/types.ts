/* -------API-------- */
// API 응답 형식
export interface ApiResponse<T> {
  responseDto: T
  error: ApiError | null
  success: boolean
}

// API 에러 형식
export interface ApiError {
  code: string
  message: string
}

/* -------무한 스크롤-------- */
// 페이지네이션 공통 타입
export interface PageInfo {
  size: number
  nextCursor: string | null
  hasNext: boolean
}

/* -------유저 정보-------- */
// 유저가 결제한 플랜
export type UserPlan = 'FREE' | 'STARTER' | 'GROWTH'

// 유저 기본 정보
export interface UserDetails {
  id: string
  profileImage: string | null
  userRoles: string[]
  plan: UserPlan
  isOnboardingCompleted: boolean
}

// 유튜브 채널 정보 (미연동 시 null)
export interface UserChannelDetails {
  youtubeChannelId: string | null
  youtubeChannelName: string | null
  youtubeChannelProfileImageUrl: string | null
}

// 유저 정보 (유저 기본 정보 + 유튜브 채널 정보)
export interface UserInfo {
  userDetails: UserDetails
  userChannelDetails: UserChannelDetails | null
}

// 유저의 상태
export interface AuthState {
  accessToken: string | null
  user: UserInfo | null
  isInitializing: boolean
  setAuth: (accessToken: string, user: UserInfo | null) => void
  reset: () => void
  setInitializing: (value: boolean) => void
}
