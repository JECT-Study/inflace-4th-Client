export interface VideoDetailDto {
  thumbnailUrl: string
  videoUrl: string
  title: string
  publishedAt: string
  description: string | null
  hashtags: string[] | null
}
