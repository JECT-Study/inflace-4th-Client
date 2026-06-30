import { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import { SubscriberRatioDto } from '@/entities/channel/subscriberDistribution'
import axios from 'axios'

interface SubscriberPatternResponseDto {
  subscriberRatio: SubscriberRatioDto | null
}

export async function fetchSubscriberChart(
  channelId: string
): Promise<SubscriberRatioDto | null> {
  try {
    const response = await axiosInstance.get<
      ApiResponse<SubscriberPatternResponseDto>
    >(`/channels/${channelId}/subscriber-pattern`)

    return response.data.responseDto.subscriberRatio
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
