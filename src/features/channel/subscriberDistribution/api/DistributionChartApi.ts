import { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import {
  SubscriberDistributionsResponseDto,
  DistributionsFilter,
} from '@/entities/channel/subscriberDistribution'

export async function fetchSubscriberDistribution(
  channelId: string,
  filters: DistributionsFilter[]
): Promise<SubscriberDistributionsResponseDto> {
  const response = await axiosInstance.get<
    ApiResponse<SubscriberDistributionsResponseDto>
  >(`/channels/${channelId}/subscriber-distribution`, {
    params: { filter: filters.join(',') },
  })

  return response.data.responseDto
}
