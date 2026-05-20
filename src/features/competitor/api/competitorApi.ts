import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type {
  BrandCollaborationsQuery,
  BrandCollaborationsResponseDto,
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
