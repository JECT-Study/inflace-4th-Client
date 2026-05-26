/* 유튜브 카테고리 — `/api/v1/youtube-categories` 응답의 단일 항목 */
export interface YoutubeCategory {
  id: number
  title: string
}

/* `/api/v1/youtube-categories` 응답 DTO */
export interface YoutubeCategoriesResponse {
  youtubeCategories: YoutubeCategory[]
}
