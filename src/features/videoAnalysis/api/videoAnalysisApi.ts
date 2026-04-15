import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type { VideoCardItem } from '@/entities/videoAnalysis'

export interface PageInfo {
  size: number
  nextCursor: string | null
  hasNext: boolean
}

export interface VideoAnalysisResponse {
  videos: VideoCardItem[]
  pageInfo: PageInfo
}

export async function fetchVideoAnalysis(
  channelId: string
): Promise<VideoAnalysisResponse> {
  const response = await axiosInstance.get<ApiResponse<VideoAnalysisResponse>>(
    `/channel/${channelId}/videos`
  )
  return response.data.responseDto
}
