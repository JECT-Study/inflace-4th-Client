import type { VideoCardItem } from '@/entities/videos'
import { PageInfo } from '@/shared/api/types'

export interface VideosResponse {
  videos: VideoCardItem[]
  pageInfo: PageInfo
}
