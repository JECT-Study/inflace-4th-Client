import type { PageInfo } from '@/shared/api/types'

/* 영상 형식 (유튜브 videoDuration 매핑) */
export type VideoFormat = 'ALL' | 'LONG_FORM' | 'SHORT_FORM'

/* 정렬 기준 */
export type SortCriteria = 'LATEST' | 'VIEW_COUNT' | 'ENGAGEMENT'

/* 정렬 방향 */
export type SortOrder = 'ASC' | 'DESC'

/* UI 필터 상태 — 폼 입력값을 그대로 보관 */
export interface CompetitorFilterState {
  videoFormat: VideoFormat
  startDate: Date | undefined
  endDate: Date | undefined
  includeKeywords: string[]
  excludeKeywords: string[]
  categoryId: string
  regionCode: string
  languageCode: string
  minViews: string
  minLikes: string
  minComments: string
  sortCriteria: SortCriteria
  sortOrder: SortOrder
}

export const DEFAULT_COMPETITOR_FILTER: CompetitorFilterState = {
  videoFormat: 'ALL',
  startDate: undefined,
  endDate: undefined,
  includeKeywords: [],
  excludeKeywords: [],
  categoryId: '',
  regionCode: '',
  languageCode: '',
  minViews: '',
  minLikes: '',
  minComments: '',
  sortCriteria: 'LATEST',
  sortOrder: 'DESC',
}

/* API 요청 쿼리 파라미터 */
export interface BrandCollaborationsQuery {
  startDate?: string
  endDate?: string
  includeKeywords?: string[]
  excludeKeywords?: string[]
  videoFormat?: VideoFormat
  categoryId?: string
  regionCode?: string
  languageCode?: string
  minViews?: number
  minLikes?: number
  minComments?: number
  sortCriteria?: SortCriteria
  sortOrder?: SortOrder
  cursor?: string
  pageSize?: number
}

/* API 응답 DTO — 영상 한 건 */
export interface BrandCollaborationDto {
  videoId: string
  videoTitle: string
  videoThumbnailUrl: string
  publishedAt: string
  viewCount: number
  likeCount: number
  commentCount: number
  channelId: string
  channelName: string
  channelThumbnailUrl: string
}

/* 적용된 정렬 정보 */
export interface BrandCollaborationsSort {
  sorted: boolean
  sortCriteria: SortCriteria
  sortOrder: SortOrder
}

/* API 응답 DTO — 페이지 단위 */
export interface BrandCollaborationsResponseDto {
  content: BrandCollaborationDto[]
  pageInfo: PageInfo
  sort: BrandCollaborationsSort
}
