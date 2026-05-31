import type { VideoCardItem } from '@/entities/videos'
import { PageInfo } from '@/shared/api/types'

export interface VideosResponse {
  videos: VideoCardItem[]
  pageInfo: PageInfo
}

export const VALID_SORT = ['LATEST', 'VIEWS', 'LIKES', 'VPH', 'OUTLIER'] as const
export const VALID_FORMAT = ['ALL', 'LONG_FORM', 'SHORT_FORM'] as const

export type VideoSort = (typeof VALID_SORT)[number]
export type VideoFormat = (typeof VALID_FORMAT)[number]

/* 영상 목록 조회 API 쿼리 파라미터 */
export interface VideoFilterParams {
  sort?: VideoSort
  format?: VideoFormat
  isAd?: boolean
  keyword?: string
  startDate?: string
  endDate?: string
  cursor?: string
  size?: number
}
