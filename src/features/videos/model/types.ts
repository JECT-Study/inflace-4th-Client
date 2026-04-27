import type { VideoCardItem } from '@/entities/videos'
import type { CursorPageInfo } from '@/shared/api/types'

export interface VideosResponse {
  videos: VideoCardItem[]
  pageInfo: CursorPageInfo
}
