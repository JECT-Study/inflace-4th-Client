import type { VideoCardItem } from '@/entities/videos'
import type { PageInfo } from '@/shared/api/types'

export interface VideosResponse {
  videos: VideoCardItem[]
  pageInfo: PageInfo
}
