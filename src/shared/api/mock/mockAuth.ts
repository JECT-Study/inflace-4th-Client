import type { AuthUser, JwtPayload } from '../types'
import type {
  LoginResponse,
  LoginErrorDetail,
} from '@/features/auth/model/types'

export const mockAccessToken =
  'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzc0MDMxMTI4LCJleHAiOjk5OTk5OTk5OTksInByb2ZpbGVJbWFnZSI6IiIsInBsYW4iOiJGUkVFIiwiaXNOZXdVc2VyIjpmYWxzZX0.mock-signature'

export const mockJwtPayload: JwtPayload = {
  sub: '1',
  iat: 1774031128,
  exp: 9999999999,
  profileImage: '',
  plan: 'FREE',
  isNewUser: false,
}

export const mockUser: AuthUser = {
  id: '1',
  profileImage: '',
  plan: 'FREE',
  isNewUser: false,
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
