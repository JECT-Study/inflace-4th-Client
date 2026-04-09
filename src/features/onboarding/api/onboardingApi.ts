import { axiosInstance } from '@/shared/api'

export const postOnboarding = (data: { role: string; need: string[] }) =>
  axiosInstance.post('user/onboarding', data)
