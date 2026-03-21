import type { UserPlan } from '../config'

const PLAN_LEVEL: Record<UserPlan, number> = {
  free: 0,
  starter: 1,
  growth: 2,
}

export function checkAccess(
  requiredPlan: UserPlan | undefined,
  userPlan: UserPlan
): boolean {
  if (!requiredPlan) return true
  return PLAN_LEVEL[userPlan] >= PLAN_LEVEL[requiredPlan]
}
