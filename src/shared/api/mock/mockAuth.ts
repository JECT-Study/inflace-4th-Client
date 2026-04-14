import mockProfileImage from '@/shared/assets/mock/mockProfileImage.png'

import type { AuthUser, JwtPayload } from '../types'
import type {
  LoginResponse,
  LoginErrorDetail,
} from '@/features/auth/model/types'

// payload: {"sub":"1","iat":1774031128,"exp":9999999999,"plan":"FREE","youtubeChannelName":"mock-channel","youtubeChannelProfileImage":"","isOnboardingCompleted":false}
export const mockAccessToken =
  'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzc0MDMxMTI4LCJleHAiOjk5OTk5OTk5OTksInBsYW4iOiJGUkVFIiwieW91dHViZUNoYW5uZWxOYW1lIjoibW9jay1jaGFubmVsIiwieW91dHViZUNoYW5uZWxQcm9maWxlSW1hZ2UiOiIiLCJpc09uYm9hcmRpbmdDb21wbGV0ZWQiOmZhbHNlfQ.mock-signature'

export const mockJwtPayload: JwtPayload = {
  sub: '1',
  iat: 1774031128,
  exp: 9999999999,
  plan: 'FREE',
  youtubeChannelName: 'mock-channel',
  youtubeChannelProfileImage: mockProfileImage.src,
  isOnboardingCompleted: false,
}

export const mockUser: AuthUser = {
  id: '1',
  plan: 'FREE',
  youtubeChannelName: 'mock-channel',
  youtubeChannelProfileImage: mockProfileImage.src,
  isOnboardingCompleted: true,
}

export const mockRefreshToken = 'mock-refresh-token'
export const mockNewRefreshToken = 'mock-new-refresh-token'

export const mockLoginResponse: LoginResponse = {
  success: true,
  responseDto: {
    AccessToken: mockAccessToken,
    RefreshToken: mockRefreshToken,
  },
  error: null,
}

export const mockReissueResponse: LoginResponse = {
  success: true,
  responseDto: {
    AccessToken: mockAccessToken,
    RefreshToken: mockNewRefreshToken,
  },
  error: null,
}

export const mockLoginError: LoginErrorDetail = {
  code: 'AUTH_401',
  message: 'Bad Request: Unsupported OAuth Provider',
}

export const mockLoginErrorResponse: LoginResponse = {
  success: false,
  responseDto: 'string',
  error: mockLoginError,
}
