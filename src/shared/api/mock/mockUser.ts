import mockProfileImage from '@/shared/assets/mock/mockProfileImage.png'
import type { UserDetails, UserChannelDetails, UserInfo } from '../types'

/* 토큰 */
export const mockAccessToken =
  'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMTlkYTA2NS03Y2Y3LTdmNzUtYTcxMi1kNWJhZTkwNzM4ZjAiLCJpYXQiOjE3NzQwMzExMjgsImV4cCI6OTk5OTk5OTk5OX0.mock-signature'
export const mockRefreshToken = 'mock-refresh-token'
export const mockNewRefreshToken = 'mock-new-refresh-token'

/* 유저 기본 정보 */
export const mockUserDetails: UserDetails = {
  id: '019da065-7cf7-7f75-a712-d5bae90738f0',
  profileImage: mockProfileImage.src,
  userRoles: [],
  plan: 'FREE',
  isOnboardingCompleted: false,
}

/* 유튜브 채널 정보 */
export const mockUserChannelDetails: UserChannelDetails = {
  youtubeChannelId: 'mock-channel-id',
  youtubeChannelName: '김튜브 스튜디오 김튜브 스튜디오',
  youtubeChannelProfileImageUrl: mockProfileImage.src,
}

/* 유저 정보 (UserDetails + UserChannelDetails) */
export const mockUser: UserInfo = {
  userDetails: mockUserDetails,
  userChannelDetails: mockUserChannelDetails,
}

/* 로그인 API 성공 응답 */
export const mockLoginResponse = {
  success: true,
  error: null,
  responseDto: {
    accessToken: mockAccessToken,
    userDetails: mockUserDetails,
    userChannelDetails: mockUserChannelDetails,
  },
}

/* 로그인 API 실패 응답 */
export const mockLoginErrorResponse = {
  success: false,
  error: { code: 'AUTH_FAILED', message: '인증에 실패했습니다.' },
  responseDto: null,
}

/* 토큰 재발급 API 성공 응답 */
export const mockReissueResponse = {
  success: true,
  error: null,
  responseDto: {
    accessToken: mockAccessToken,
    userDetails: mockUserDetails,
    userChannelDetails: mockUserChannelDetails,
  },
}
