import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type {
  BrandCollaborationsQuery,
  BrandCollaborationsResponseDto,
  BrandCollaborationsTrendsRequest,
  BrandCollaborationsTrendsResponseDto,
} from '../model/types'

export async function fetchBrandCollaborations(
  query: BrandCollaborationsQuery
): Promise<BrandCollaborationsResponseDto> {
  const res = await axiosInstance.get<
    ApiResponse<BrandCollaborationsResponseDto>
  >('/brand-collaborations', {
    params: query,
    paramsSerializer: { indexes: null },
  })
  return res.data.responseDto
}

/* AI 분석 인사이트 — 선택한 영상들로 콘텐츠/채널/전략 분석 결과 조회 */
export async function fetchBrandCollaborationsTrends(
  body: BrandCollaborationsTrendsRequest
): Promise<BrandCollaborationsTrendsResponseDto> {
  const res = await axiosInstance.post<
    ApiResponse<BrandCollaborationsTrendsResponseDto>
  >('/brand-collaborations/trends', body)
  return res.data.responseDto
}
