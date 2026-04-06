export type UserPlan = 'free' | 'starter' | 'growth'

export interface ApiResponse<T> {
  success: boolean
  responseDto: T
  error: string | null
}

export interface AuthUser {
  id: string
  name: string
  email: string
  profileImage: string
  plan: UserPlan
}

export interface AuthState {
  accessToken: string | null
  user: AuthUser | null
  isInitializing: boolean
  setAuth: (accessToken: string, user: AuthUser | null) => void
  reset: () => void
  setInitializing: (value: boolean) => void
}
