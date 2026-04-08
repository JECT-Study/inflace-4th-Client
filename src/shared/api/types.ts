export type UserPlan = 'FREE' | 'STARTER' | 'GROWTH'

export interface ApiResponse<T> {
  success: boolean
  responseDto: T
  error: string | null
}

export interface JwtPayload {
  sub: string
  iat: number
  exp: number
  profileImage: string
  plan: string
  isNewUser: boolean
}

export interface AuthUser {
  id: string
  profileImage: string
  plan: UserPlan
  isNewUser: boolean
}

export interface AuthState {
  accessToken: string | null
  user: AuthUser | null
  isInitializing: boolean
  setAuth: (accessToken: string, user: AuthUser | null) => void
  reset: () => void
  setInitializing: (value: boolean) => void
}
