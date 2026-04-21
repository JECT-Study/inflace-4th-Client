export type ContentType = '롱폼' | '숏폼'

export type TrendingVideoResponseDto = {
  rank: number
  videoId: number
  title: string
  thumbnailUrl: string
  viewCount: number
  engagementRate: number
  ctr: number
  retentionRate: number
}

export type TrendingVideoListResponseDto = {
  videos: TrendingVideoResponseDto[]
}
