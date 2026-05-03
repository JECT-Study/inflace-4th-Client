import type { ApiResponse } from '@/shared/api'
import { axiosInstance } from '@/shared/api'
import type {
  RetentionResponseDto,
  RetentionSummaryResponseDto,
  RetentionDropPointsResponseDto,
} from '../model/types'

export async function fetchRetention(
  videoId: string
): Promise<RetentionResponseDto> {
  const response = await axiosInstance.get<ApiResponse<RetentionResponseDto>>(
    `/videos/${videoId}/retention`
  )
  return response.data.responseDto
}

export async function fetchRetentionSummary(
  videoId: string
): Promise<RetentionSummaryResponseDto> {
  const response = await axiosInstance.get<
    ApiResponse<RetentionSummaryResponseDto>
  >(`/videos/${videoId}/retention/summary`)
  return response.data.responseDto
}

export async function fetchRetentionDropPoints(
  videoId: string
): Promise<RetentionDropPointsResponseDto> {
  const response = await axiosInstance.get<
    ApiResponse<RetentionDropPointsResponseDto>
  >(`/videos/${videoId}/retention/drop-points`)
  return response.data.responseDto
}
