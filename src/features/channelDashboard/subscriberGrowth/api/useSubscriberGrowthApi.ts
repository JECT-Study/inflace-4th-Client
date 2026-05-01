import { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import { ChannelSubscriberGrowthDto } from '@/entities/channelDashboard/channelSubscriberGrowth'

export async function fetchSubscriberGrowth(
  channelId: string,
  range: string
): Promise<ChannelSubscriberGrowthDto> {
  const response = await axiosInstance.get<
    ApiResponse<ChannelSubscriberGrowthDto>
  >(`/channels/${channelId}/subscriber-trend`, {
    params: { range },
  })

  return response.data.responseDto
}
