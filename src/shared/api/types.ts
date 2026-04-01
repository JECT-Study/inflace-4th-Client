export interface AuthUser {
  id: string
  name: string
  email: string
  profileImage: string
}

export interface AuthState {
  accessToken: string | null
  user: AuthUser | null
  isInitializing: boolean
  setAuth: (accessToken: string, user: AuthUser | null) => void
  reset: () => void
  setInitializing: (value: boolean) => void
}
