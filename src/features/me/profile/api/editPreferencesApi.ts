import { axiosInstance } from '@/shared/api'
import type { ApiResponse } from '@/shared/api/types'
import type { UserRole, Need } from '@/shared/api/types'
import type { MyProfileDto } from '../types'

export interface EditPreferencesPayload {
  roles: UserRole[]
  needs: Need[]
}

export const putPreferences = (data: EditPreferencesPayload) =>
  axiosInstance
    .put<ApiResponse<MyProfileDto>>('/user/preferences', data)
    .then((res) => res.data)
