import type { ApiResponse } from '@/shared/api'
import { axiosInstance } from '@/shared/api'
import type { VideoDetailDto } from '@/entities/video'

export async function fetchVideoDetail(videoId: string): Promise<VideoDetailDto> {
  const response = await axiosInstance.get<ApiResponse<VideoDetailDto>>(
    `/videos/${videoId}`
  )
  return response.data.responseDto
}
