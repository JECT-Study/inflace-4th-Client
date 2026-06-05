import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type { alarms, alarmsDto } from '../model/types'

export async function fetchAlarm(): Promise<alarmsDto> {
  const response =
    await axiosInstance.get<ApiResponse<alarmsDto>>(`/user/alarms`)
  return response.data.responseDto
}

export const postAlarm = (body: alarms) =>
  axiosInstance.put('/user/alarms', body)
