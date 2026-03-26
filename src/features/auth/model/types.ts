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
  setAuth: (accessToken: string, user: AuthUser) => void
  reset: () => void
  setInitializing: (value: boolean) => void
}

export interface LoginModalState {
  isOpen: boolean
  open: () => void
  close: () => void
}

export interface PopupOAuthConfig {
  apiPath: string
  popupName: string
}
