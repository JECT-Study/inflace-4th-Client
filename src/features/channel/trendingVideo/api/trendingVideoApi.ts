import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type {
  TrendingVideoResponseDto,
  TrendingVideoListResponseDto,
} from '@/entities/channel/trendingVideo'
import axios from 'axios'

export async function fetchTrendingVideo(
  channelId: string,
  isShort: boolean
): Promise<TrendingVideoResponseDto[]> {
  try {
    const response = await axiosInstance.get<
      ApiResponse<TrendingVideoListResponseDto>
    >(`/channels/${channelId}/tops`, {
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
