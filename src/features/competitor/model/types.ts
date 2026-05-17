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

/* 페이지네이션 정보 */
export interface BrandCollaborationsPageInfo {
  size: number
  numberOfElements: number
  nextCursor: string | null
  hasNext: boolean
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
  pageInfo: BrandCollaborationsPageInfo
  sort: BrandCollaborationsSort
}

/* ─────────── AI 분석 인사이트 ─────────── */

/* trends 요청 body */
export interface BrandCollaborationsTrendsRequest {
  /* 분석할 YouTube 영상 ID 목록 (1~10개) */
  youtubeVideoIds: string[]
}

/* AI 분석 키워드 정보 */
export interface TrendsContentKeywords {
  /* AI 추출 공통 키워드 목록 — AI 실패 시 [] */
  keywords: string[]
  /* 키워드 요약 (AI 생성) — AI 실패 시 null */
  keywordSummary: string | null
}

/* 카테고리별 비율 */
export interface TrendsCategoryDistribution {
  category: string
  /* 0~100 (소수점 1자리) */
  percentage: number
}

/* 협업 채널 통계 */
export interface TrendsChannelCharacteristics {
  channelCount: number
  avgSubscribers: number
  minSubscribers: number
  maxSubscribers: number
  /* 평균 업로드 주기 (일) — Nullable */
  uploadIntervalDays: number | null
  /* 결과 없으면 [] */
  categoryDistribution: TrendsCategoryDistribution[]
}

/* AI 전략 인사이트 */
export interface TrendsStrategyInsight {
  /* PPL 의도 분석 요약 — AI 실패 시 null */
  pplIntent: string | null
  /* 경쟁사 협업 전략의 강점 — AI 실패 시 null */
  competitivePoints: string | null
}

/* trends 응답 DTO */
export interface BrandCollaborationsTrendsResponseDto {
  contentKeywords: TrendsContentKeywords
  channelCharacteristics: TrendsChannelCharacteristics
  strategyInsight: TrendsStrategyInsight
}
