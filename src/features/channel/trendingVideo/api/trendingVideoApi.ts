import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type {
  TrendingVideoResponseDto,
  TrendingVideoListResponseDto,
} from '@/entities/channel/trendingVideo'

export async function fetchTrendingVideo(
  channelId: string,
  isShort: boolean
): Promise<TrendingVideoResponseDto[]> {
  const response = await axiosInstance.get<
    ApiResponse<TrendingVideoListResponseDto>
  >(`/channels/${channelId}/tops`, {
    params: isShort ? { filter: 'SHORT_FORM' } : undefined,
  })
  return response.data.responseDto.videos
}
