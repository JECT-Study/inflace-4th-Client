import type {
  UserDetails,
  UserChannelDetails,
  ApiResponse,
} from '@/shared/api/types'

/* 로그인 모달 상태 */
export interface LoginModalState {
  isOpen: boolean
  open: () => void
  close: () => void
}

export interface PopupOAuthConfig {
  apiPath: string
  popupName: string
}

/* 로그인 API 응답 DTO */
export interface LoginResponseDto {
  accessToken: string
  userDetails: UserDetails
  userChannelDetails: UserChannelDetails | null
}

/* 로그인 API 응답 */
export type LoginResponse = ApiResponse<LoginResponseDto | string>
