import { axiosInstance } from '@/shared/api'
import type { VideosResponse, VideoFilterParams } from '../model/types'

export async function fetchVideoList(
  channelId: string,
  params?: VideoFilterParams
): Promise<VideosResponse> {
  const query: Record<string, string> = {}
  if (params?.cursor) query['cursor'] = params.cursor
  if (params?.sort && params.sort !== 'LATEST') query['sort'] = params.sort
  if (params?.format) query['format'] = params.format
  if (params?.isAd) query['isAd'] = 'true'
  if (params?.keyword) query['keyword'] = params.keyword
  if (params?.size !== undefined) query['size'] = String(params.size)

  const response = await axiosInstance.get<{
    isSuccess: boolean
    responseDto: VideosResponse
    error: null
  }>(`/channel/${channelId}/videos`, { params: query })
  return response.data.responseDto
}
