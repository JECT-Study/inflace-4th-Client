import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type { ChannelKpiDto } from '@/entities/channelDashboard/channelKpiCard'

export async function fetchChannelKpi(
  channelId: string
): Promise<ChannelKpiDto> {
  const response = await axiosInstance.get<ApiResponse<ChannelKpiDto>>(
    `/channels/${channelId}/kpi`
  )
  return response.data.responseDto
}
