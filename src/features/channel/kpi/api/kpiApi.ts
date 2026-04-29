import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type { KpiDto } from '@/entities/channel/kpiCard'

export async function fetchKpi(channelId: string): Promise<KpiDto> {
  const response = await axiosInstance.get<ApiResponse<KpiDto>>(
    `/channels/${channelId}/kpi`
  )
  return response.data.responseDto
}
