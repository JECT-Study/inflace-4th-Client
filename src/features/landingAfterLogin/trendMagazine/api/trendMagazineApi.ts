import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type { MagazineCardItem } from '@/entities/landingAfterLogin/magazineCard'

export async function fetchTrendMagazine(
  channelId: string
): Promise<MagazineCardItem[]> {
  const response = await axiosInstance.get<ApiResponse<MagazineCardItem[]>>(
    `/channels/${channelId}/trend-magazine`
  )
  return response.data.responseDto
}
