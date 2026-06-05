import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type { Alarms, AlarmsDto } from '../model/types'

export async function fetchAlarm(): Promise<AlarmsDto> {
  const response =
    await axiosInstance.get<ApiResponse<AlarmsDto>>(`/user/alarms`)
  return response.data.responseDto
}

export const postAlarm = (body: Alarms) =>
  axiosInstance.put('/user/alarms', body)
