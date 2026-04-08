import { useAuthStore } from '@/shared/api'
import type { UserPlan } from '@/shared/api/types'

export function usePlanGate(requiredPlan: UserPlan) {
  const user = useAuthStore((s) => s.user)
  const userPlan: UserPlan = user?.plan ?? 'FREE'
  const isLocked = userPlan < requiredPlan
  return { isLocked }
}
