import type { PageInfo } from '@/shared/api/types'

export type VideoFormat = 'ALL' | 'LONG_FORM' | 'SHORT_FORM'

export type SortCriteria = 'LATEST' | 'VIEW_COUNT' | 'LIKE_COUNT'

export type SortOrder = 'DESC'

export interface AdvertisementListParams {
  startDate?: string
  endDate?: string
  videoFormat?: VideoFormat
  categoryId?: string
  sortCriteria?: SortCriteria
  sortOrder?: SortOrder
  cursor?: string
  pageSize?: number
}

export interface AdvertisementVideoItem {
  videoId: string
  videoTitle: string | null
  videoThumbnailUrl: string | null
  publishedAt: string | null
  viewCount: number
  likeCount: number
  commentCount: number
  videoFormat: Exclude<VideoFormat, 'ALL'>
  categoryName: string | null
  brands: string[]
}

export interface SortInfo {
  sorted: boolean
  sortCriteria: SortCriteria
  sortOrder: SortOrder
}

export interface AdvertisementListResponseDto {
  content: AdvertisementVideoItem[]
  pageInfo: PageInfo
  sort: SortInfo
}
