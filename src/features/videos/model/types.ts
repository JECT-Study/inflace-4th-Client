import type { VideoCardItem } from '@/entities/videos'
import type { PageInfo } from '@/shared/api/types'

export interface VideosResponse {
  videos: VideoCardItem[]
  pageInfo: PageInfo
}

/* 영상 목록 조회 API 쿼리 파라미터 */
export interface VideoFilterParams {
  sort?: 'LATEST' | 'VIEWS' | 'LIKES' | 'VPH' | 'OUTLIER'
  format?: 'ALL' | 'LONG_FORM' | 'SHORT_FORM'
  isAd?: boolean
  cursor?: string
  size?: number
}
