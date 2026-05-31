/* 카드에 표시하는 영상 데이터 — features의 DTO와 구조 동일 (FSD 분리용) */
export interface CompetitorVideoCardItem {
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
