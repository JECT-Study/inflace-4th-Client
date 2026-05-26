import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type { InfluencerDetailResponseDto } from '@/entities/influencerDetail'

export async function fetchInfluencerDetail(
  channelId: string
): Promise<InfluencerDetailResponseDto> {
  const response = await axiosInstance.get<
    ApiResponse<InfluencerDetailResponseDto>
  >(`/influencers/${channelId}/insight`)
  return response.data.responseDto
}
