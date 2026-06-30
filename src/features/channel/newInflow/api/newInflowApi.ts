import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type {
  NewInflowListResponseDto,
  NewInflowResponseDto,
} from '@/entities/channel/newInflow'
import axios from 'axios'

export async function fetchNewInflow(
  channelId: string,
  isShort: boolean
): Promise<NewInflowResponseDto[]> {
  try {
    const response = await axiosInstance.get<
      ApiResponse<NewInflowListResponseDto>
    >(`/channels/${channelId}/new-subscriber`, {
      params: isShort ? { filter: 'SHORT_FORM' } : undefined,
    })
    return response.data.responseDto.videos
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.data?.error?.code === 'ANALYTICS_404'
    ) {
      return []
    }
    throw error
  }
}
