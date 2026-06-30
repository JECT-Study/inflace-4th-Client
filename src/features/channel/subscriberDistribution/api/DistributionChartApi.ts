import { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import {
  SubscriberDistributionsResponseDto,
  DistributionsFilter,
} from '@/entities/channel/subscriberDistribution'
import axios from 'axios'

export async function fetchSubscriberDistribution(
  channelId: string,
  filters: DistributionsFilter[]
): Promise<SubscriberDistributionsResponseDto | null> {
  try {
    const response = await axiosInstance.get<
      ApiResponse<SubscriberDistributionsResponseDto>
    >(`/channels/${channelId}/subscriber-distribution`, {
      params: { filter: filters.join(',') },
    })

    return response.data.responseDto
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.data?.error?.code === 'ANALYTICS_404'
    ) {
      return null
    }
    throw error
  }
}
