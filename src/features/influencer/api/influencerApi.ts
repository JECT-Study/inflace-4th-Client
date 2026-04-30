import { axiosInstance } from '@/shared/api'
import type { ApiResponse } from '@/shared/api/types'
import type { Influencer } from '@/entities/influencer'

/* TODO: 페이지 랜더링 관련 필드 형식 백엔드와 논의중 */
export interface InfluencerListResponse {
  content: Influencer[]
  pageSize: number
  hasNext: boolean
  numberOfElements: number
  empty: boolean
  sort: {
    sorted: boolean
    sortCriteria: string
    sortOrder: 'ASC' | 'DESC'
  }
}

export async function fetchInfluencers(): Promise<InfluencerListResponse> {
  const response = await axiosInstance.get<ApiResponse<InfluencerListResponse>>(
    '/api/v1/influencers'
  )
  return response.data.responseDto
}
