import { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import { SubscriberRatioDto } from '@/entities/channel/subscriberDistribution'

export async function fetchSubscriberChart(
  channelId: string
): Promise<SubscriberRatioDto> {
  const response = await axiosInstance.get<ApiResponse<SubscriberRatioDto>>(
    `/channels/${channelId}/subscriber-pattern`
  )

  return response.data.responseDto
}
