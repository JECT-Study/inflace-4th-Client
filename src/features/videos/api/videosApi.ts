import { axiosInstance } from '@/shared/api/axiosInstance'
import type { ApiResponse } from '@/shared/api/types'

import type { VideosResponse, VideoFilterParams } from '../model/types'

export async function fetchVideoList(
  channelId: string,
  params?: VideoFilterParams
): Promise<VideosResponse> {
  const { data } = await axiosInstance.get<ApiResponse<VideosResponse>>(
    `/channels/${channelId}/videos`,
    { params }
  )
  return data.responseDto
}
