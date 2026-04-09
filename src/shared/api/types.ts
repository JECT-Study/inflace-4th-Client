// API 응답 형식
export interface ApiResponse<T> {
  success: boolean
  responseDto: T
  error: string | null
}

// 유저가 결제한 플랜
export type UserPlan = 'FREE' | 'STARTER' | 'GROWTH'

// Jwt Payload 형식: 해당 값을 추출해 유저 정보(AuthUser) 활용
export interface JwtPayload {
  sub: string
  iat: number
  exp: number
  profileImage: string
  plan: string
  isNewUser: boolean
}

//유저 정보
export interface AuthUser {
  id: string
  profileImage: string
  plan: UserPlan
  isNewUser: boolean
}

//유저의 상태
export interface AuthState {
  accessToken: string | null
  user: AuthUser | null
  isInitializing: boolean
  setAuth: (accessToken: string, user: AuthUser | null) => void
  reset: () => void
  setInitializing: (value: boolean) => void
}
