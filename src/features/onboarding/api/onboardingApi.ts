import { axiosInstance } from '@/shared/api'
import { UserRole, Need } from '../model/types'

export const postOnboarding = (data: { roles: UserRole[]; needs: Need[] }) =>
  axiosInstance.post('user/onboarding', data)
