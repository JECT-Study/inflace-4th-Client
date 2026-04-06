import { useAuthStore } from '@/shared/api'
import type { UserPlan } from '@/shared/api/types'

const planRank: Record<UserPlan, number> = {
  free: 0,
  starter: 1,
  growth: 2,
}

export function usePlanGate(requiredPlan: UserPlan) {
  const user = useAuthStore((s) => s.user)
  const userPlan: UserPlan = user?.plan ?? 'free'
  const isLocked = planRank[userPlan] < planRank[requiredPlan]
  return { isLocked }
}
