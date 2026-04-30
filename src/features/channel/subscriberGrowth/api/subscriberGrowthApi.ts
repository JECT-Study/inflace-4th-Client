import { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import { SubscriberGrowthDto } from '@/entities/channel/subscriberGrowth'

export async function fetchSubscriberGrowth(
  channelId: string,
  range: string
): Promise<SubscriberGrowthDto> {
  const response = await axiosInstance.get<ApiResponse<SubscriberGrowthDto>>(
    `/channels/${channelId}/subscriber-trend`,
    {
      params: { range },
    }
  )

  return response.data.responseDto
}
