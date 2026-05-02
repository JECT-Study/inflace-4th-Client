import { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import { TypeEngagementResponseDto } from '@/entities/channel/typeEngagement'

export async function fetchTypeEngagement(
  channelId: string
): Promise<TypeEngagementResponseDto> {
  const response = await axiosInstance.get<
    ApiResponse<TypeEngagementResponseDto>
  >(`/channels/${channelId}/engagement-rate`)

  return response.data.responseDto
}
