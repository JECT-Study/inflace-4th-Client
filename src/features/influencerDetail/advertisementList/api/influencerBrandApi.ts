import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type {
  AdvertisementListParams,
  AdvertisementListResponseDto,
} from '../model/types'

export async function fetchInfluencerBrand(
  channelId: string,
  params?: AdvertisementListParams
): Promise<AdvertisementListResponseDto> {
  const response = await axiosInstance.get<
    ApiResponse<AdvertisementListResponseDto>
  >(`/brand-collaborations/channels/${channelId}`, { params })
  return response.data.responseDto
}
