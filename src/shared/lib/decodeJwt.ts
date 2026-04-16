import type { AuthUser, JwtPayload, UserPlan } from '@/shared/api/types'

/* 로그인 후 JWT 토큰을 수령할 때 함께 제공되는 정보
 * (ex. 유저 ID, 프로필 이미지 URL, 첫 번째 로그인 여부 등)
 * 를 JWT payload에서 파싱하는 함수
 */
export function decodeJwt(token: string): JwtPayload {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const json = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  )
  return JSON.parse(json) as JwtPayload
}

export function jwtToAuthUser(payload: JwtPayload): AuthUser {
  return {
    id: payload.sub,
    plan: payload.plan as UserPlan,
    youtubeChannelName: payload.youtubeChannelName,
    youtubeChannelProfileImage: payload.youtubeChannelProfileImage,
    isOnboardingCompleted: payload.isOnboardingCompleted,
  }
}
