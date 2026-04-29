export type NewInflowResponseDto = {
  rank: number
  videoId: string
  title: string
  thumbnailUrl: string
  viewCount: number
  subscriptionConversionCount: number
  newSubscriberRatio: number
  retentionRate: number
}

export type NewInflowListResponseDto = {
  videos: NewInflowResponseDto[]
}
