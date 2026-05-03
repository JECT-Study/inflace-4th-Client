import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type {
  NewInflowListResponseDto,
  NewInflowResponseDto,
} from '@/entities/channel/newInflow'

export async function fetchNewInflow(
  channelId: string,
  isShort: boolean
): Promise<NewInflowResponseDto[]> {
  const response = await axiosInstance.get<
    ApiResponse<NewInflowListResponseDto>
  >(`/channels/${channelId}/new-subscriber`, {
    params: isShort ? { filter: 'SHORT_FORM' } : undefined,
  })
  return response.data.responseDto.videos
}
