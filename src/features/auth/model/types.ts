export interface LoginModalState {
  isOpen: boolean
  open: () => void
  close: () => void
}

export interface PopupOAuthConfig {
  apiPath: string
  popupName: string
}

export interface LoginResponse {
  responseDto: {
    AccessToken: string
    RefreshToken: string
  }
  error: string | null
  success: boolean
}
