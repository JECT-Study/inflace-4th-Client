import { axiosInstance } from '@/shared/api'
import type { ApiResponse } from '@/shared/api/types'

import type { YoutubeCategoriesResponse } from '../model/types'

export async function fetchYoutubeCategories(): Promise<YoutubeCategoriesResponse> {
  const response = await axiosInstance.get<
    ApiResponse<YoutubeCategoriesResponse>
  >('/youtube-categories')
  return response.data.responseDto
}
