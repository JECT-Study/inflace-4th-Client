import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type { InfluencerSummaryResponseDto } from '@/entities/influencerDetail'

export async function fetchInfluencerSummary(
  channelId: string
): Promise<InfluencerSummaryResponseDto> {
  const response = await axiosInstance.get<
    ApiResponse<InfluencerSummaryResponseDto>
  >(`/influencers/${channelId}/insight-summary`, {
    headers: { 'Idempotency-Key': crypto.randomUUID() },
  })
  return response.data.responseDto
}
