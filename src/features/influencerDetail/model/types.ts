export type VideoFormat = 'ALL' | 'LONG_FORM' | 'SHORT_FORM'

export const VIDEO_FORMAT_LABEL: Record<Exclude<VideoFormat, 'ALL'>, string> = {
  LONG_FORM: '롱폼',
  SHORT_FORM: '숏폼',
}

export type ScoreLabel = '높음' | '보통' | '낮음'

export interface AvgViewsByContentType {
  format: Exclude<VideoFormat, 'ALL'>
  avgViewCount: number
  avgEngagementRate: number
}

export interface CategoryDistributionItem {
  category: string
  count: number
  percentage: number
}

export interface ContentTypeDistributionItem {
  format: Exclude<VideoFormat, 'ALL'>
  count: number
  percentage: number
}

export interface AdScore {
  score: number
  label: ScoreLabel
  viewStability: ScoreLabel
  viewStabilityCv: number
  subscriptionHealth: ScoreLabel
  subscriptionHealthRate: number
  collaborationExperience: ScoreLabel
  collaborationRate: number
}

export interface AdvertisementFilterResponseDto {
  videoCount: number
  avgViewsByContentType: AvgViewsByContentType[]
  categoryDistribution: CategoryDistributionItem[]
  contentTypeDistribution: ContentTypeDistributionItem[]
  adScore: AdScore | null
}

export interface AdvertisementFilterQueryParams {
  categoryId?: string
  startDate?: string
  endDate?: string
  videoFormat?: VideoFormat
}
