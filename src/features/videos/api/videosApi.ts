import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type { VideosResponse } from '../model/types'

/**
 * 채널 영상 목록 조회 API
 *
 * cursor가 있으면 해당 커서 이후의 다음 페이지를 요청하고,
 * 없으면 첫 페이지를 요청합니다.
 */
export async function fetchVideoAnalysis(
  channelId: string,
  cursor?: string | null
): Promise<VideosResponse> {
  const response = await axiosInstance.get<ApiResponse<VideosResponse>>(
    `/channel/${channelId}/videos`,
    // cursor가 null/undefined이면 쿼리 파라미터를 붙이지 않음
    { params: cursor ? { cursor } : undefined }
  )
  return response.data.responseDto
}
