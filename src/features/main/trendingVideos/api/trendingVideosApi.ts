import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type { VideoCardItem } from '@/entities/main/videoCard'

export async function fetchTrendingVideos(
  channelId: string
): Promise<VideoCardItem[]> {
  const response = await axiosInstance.get<ApiResponse<VideoCardItem[]>>(
    `/channels/${channelId}/main/tops`
  )
  return response.data.responseDto
}
