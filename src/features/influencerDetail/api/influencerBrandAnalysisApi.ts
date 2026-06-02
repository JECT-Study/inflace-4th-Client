import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type {
  AdvertisementFilterResponseDto,
  AdvertisementFilterQueryParams,
} from '@/features/influencerDetail'

export async function fetchInfluencerBrandAnalysisApi(
  query: AdvertisementFilterQueryParams,
  channelId: string
): Promise<AdvertisementFilterResponseDto> {
  const response = await axiosInstance.get<
    ApiResponse<AdvertisementFilterResponseDto>
  >(`/brand-collaborations/channels/${channelId}/analysis`, {
    params: query,
  })
  return response.data.responseDto
}
