import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type { VideosResponse } from '../model/types'

export async function fetchVideoAnalysis(
  channelId: string
): Promise<VideosResponse> {
  const response = await axiosInstance.get<ApiResponse<VideosResponse>>(
    `/channel/${channelId}/videos`
  )
  return response.data.responseDto
}
