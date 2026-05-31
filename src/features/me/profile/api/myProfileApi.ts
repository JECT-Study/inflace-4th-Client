import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type { MyProfileDto } from '../types'

export async function fetchMyProfile(): Promise<MyProfileDto> {
  const response =
    await axiosInstance.get<ApiResponse<MyProfileDto>>('/user/profile')
  return response.data.responseDto
}
