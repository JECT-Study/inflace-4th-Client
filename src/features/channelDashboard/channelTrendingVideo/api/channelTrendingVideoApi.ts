import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type {
  ContentType,
  TrendingVideoResponseDto,
  TrendingVideoListResponseDto,
} from '@/entities/channelDashboard/channelTrendingVideo'

export type { ContentType }

export async function fetchChannelTrendingVideo(
  channelId: string,
  contentType: ContentType
): Promise<TrendingVideoResponseDto[]> {
  const response = await axiosInstance.get<
    ApiResponse<TrendingVideoListResponseDto>
  >(`/channels/${channelId}/tops`, {
    params: contentType === '숏폼' ? { filter: 'SHORT_FORM' } : undefined,
  })
  return response.data.responseDto.videos
}
