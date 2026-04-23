import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type {
  NewInflowListResponseDto,
  NewInflowResponseDto,
  ContentType,
} from '@/entities/channelDashboard/newInflow'

export type { ContentType }

export async function fetchNewInflow(
  channelId: string,
  contentType: ContentType
): Promise<NewInflowResponseDto[]> {
  const response = await axiosInstance.get<
    ApiResponse<NewInflowListResponseDto>
  >(`/channels/${channelId}/new-subscriber`, {
    params: contentType === '숏폼' ? { filter: 'SHORT_FORM' } : undefined,
  })
  return response.data.responseDto.videos
}
