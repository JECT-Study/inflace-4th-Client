import type { ApiResponse } from '@/shared/api'
import { axiosInstance } from '@/shared/api'
import type { VideoStatsDto } from '@/entities/video'

export async function fetchVideoStats(videoId: string): Promise<VideoStatsDto> {
  const response = await axiosInstance.get<ApiResponse<VideoStatsDto>>(
    `/videos/${videoId}/stats`
  )
  return response.data.responseDto
}
