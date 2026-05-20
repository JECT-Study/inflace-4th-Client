export interface Audience {
  score: number
  engagementRate: number
  likeRate: number
  commentRate: number
  viewsPerSubscriberRate: number
}

export interface Content {
  score: number
  viral2xRate: number
  viral5xRate: number
  medianVph: number
  growthTrendRate: number
}

export type FrequencyTrend = 'INCREASING' | 'DECREASING' | 'STABLE'

export interface Activity {
  score: number
  recentUpload: number
  uploadCycle: number
  frequencyTrend: FrequencyTrend
}

export interface Advertisement {
  score: number
  viewCoefficientOfVariation: number
  subscriberHealthRate: number
}

export interface FormatMetrics {
  count: number
  averageViews30d: number
  engagementRate: number
}

export interface FormatAnalysis {
  longForm: FormatMetrics
  shortForm: FormatMetrics
}

export interface InfluencerDetailResponseDto {
  channelId: number
  channelName: string
  channelHandle: string
  profileImageUrl: string
  bannerImageUrl: string
  joinedAt: string
  subscriberCount: number
  categories: string[]
  audience: Audience
  content: Content
  activity: Activity
  advertisement: Advertisement | null
  formatAnalysis: FormatAnalysis
}

export interface InfluencerSummaryResponseDto {
  summary: string
}
