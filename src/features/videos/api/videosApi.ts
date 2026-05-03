import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type { VideosResponse, VideoFilterParams } from '../model/types'

export async function fetchVideoList(
  channelId: string,
  params?: VideoFilterParams
): Promise<VideosResponse> {
  const response = await axiosInstance.get<ApiResponse<VideosResponse>>(
    `/channel/${channelId}/videos`,
    { params }
  )
  return response.data.responseDto
}
