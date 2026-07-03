import type { UserPlan } from '@/shared/api/types'

// 플랜 등급 (숫자가 높을수록 상위 플랜)
export const PLAN_LEVEL: Record<UserPlan, number> = {
  FREE: 0,
  STARTER: 1,
  GROWTH: 2,
}

// 유저 플랜이 필요 플랜보다 낮은 등급인지 여부
export function isPlanBelow(
  userPlan: UserPlan,
  requiredPlan: UserPlan,
): boolean {
  return PLAN_LEVEL[userPlan] < PLAN_LEVEL[requiredPlan]
}
