import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type { ChannelProfileDto } from '@/entities/main/channelProfile'

export async function fetchChannelProfile(
  id: string
): Promise<ChannelProfileDto> {
  const response =
    await axiosInstance.get<ApiResponse<ChannelProfileDto>>(
      `user/channels/main`
    )
  return response.data.responseDto
}
