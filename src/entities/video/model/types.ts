export interface VideoDetailDto {
  thumbnailUrl: string
  videoUrl: string
  title: string
  publishedAt: string // LocalDateTime ISO string (e.g. "2024-08-08T12:00:00")
  description: string | null
  hashtags: string[] | null
}

export interface KpiMetric {
  value: number
  changeRate: number | null // null = 이전 데이터 없음 (최초 수집 등)
}

export interface VideoStatsDto {
  collectedAt: string // ISO datetime — 수집 기준 시각
  viewCount: KpiMetric
  likeCount: KpiMetric
  commentCount: KpiMetric
  shareCount: KpiMetric
  subscribersGained: KpiMetric
  ctr: KpiMetric // Double, %
  engagementRate: KpiMetric // Double, %
  newViewerRate: KpiMetric // Double, %
  outlier: KpiMetric // Double, 배수 스코어
  vph: KpiMetric // Double, Views Per Hour
}
