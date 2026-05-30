import { axiosInstance } from '@/shared/api'

import type { WithdrawalReason } from '../model/withdrawalReason'

export interface DeleteUserPayload {
  reason: WithdrawalReason
  detail?: string
}

export const deleteUser = (payload: DeleteUserPayload) =>
  axiosInstance.delete('/user/delete', { data: payload })
