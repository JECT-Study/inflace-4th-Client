import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type { VideoCardItem } from '@/entities/main/videoCard'

// GET /channels/{channelId}/main/tops 응답의 videos 배열 항목
interface MainTopVideoDto {
  rank: number
  videoId: number
  title: string
  thumbnailUrl: string
  viewCount: number
  likeCount: number
  commentCount: number
  engagementRate: number
  publishedAt: string
  avd: number
}

interface MainTopsResponseDto {
  videos: MainTopVideoDto[]
}

export async function fetchTrendingVideos(
  channelId: string
): Promise<VideoCardItem[]> {
  const response = await axiosInstance.get<ApiResponse<MainTopsResponseDto>>(
    `/channels/${channelId}/main/tops`
  )
  // ctr 자리에는 avd 값을 그대로 사용
  return response.data.responseDto.videos.map((video) => ({
    id: video.videoId.toString(),
    thumbnailUrl: video.thumbnailUrl,
    title: video.title,
    viewCount: video.viewCount,
    likeCount: video.likeCount,
    commentCount: video.commentCount,
    publishedAt: video.publishedAt,
    engagementRate: video.engagementRate,
    ctr: video.avd,
  }))
}
