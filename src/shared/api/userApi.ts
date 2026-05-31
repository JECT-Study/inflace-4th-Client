import { axiosInstance } from './axiosInstance'
import type { ApiResponse, UserInfo } from './types'

export async function fetchCurrentUser(): Promise<UserInfo> {
  const res = await axiosInstance.get<ApiResponse<UserInfo>>('/user/me')
  return res.data.responseDto
}
