export interface LoginModalState {
  isOpen: boolean
  open: () => void
  close: () => void
}

export interface PopupOAuthConfig {
  apiPath: string
  popupName: string
}

export interface LoginErrorDetail {
  code: string
  message: string
}

export interface LoginResponse {
  responseDto: {
    AccessToken: string
    RefreshToken: string
  } | string
  error: LoginErrorDetail | null
  success: boolean
}
