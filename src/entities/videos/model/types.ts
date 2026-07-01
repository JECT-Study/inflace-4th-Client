export interface VideoCardItem {
  videoId: number
  title: string
  thumbnailUrl: string
  publishedAt: string
  viewCount: number
  likeCount: number
  commentCount: number
  vph: number
  outlierScore: number | undefined
  durationSeconds: number | undefined
  isShort: boolean
  isAd: boolean
}
