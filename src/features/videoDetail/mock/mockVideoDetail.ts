import type { VideoDetailDto } from '@/entities/video'
import { mockVideoCatalog, mockVideoCatalogMap } from '@/shared/mock'

const toDetail = (videoId: string): VideoDetailDto => {
  const v = mockVideoCatalogMap[videoId]
  return {
    thumbnailUrl: v.thumbnailUrl,
    videoUrl: v.videoUrl,
    title: v.title,
    publishedAt: v.publishedAt,
    description: v.description,
    hashtags: v.hashtags,
  }
}

/* videoId → 상세 정보 (목록과 동일한 카탈로그에서 파생) */
export const mockVideoDetailMap: Record<string, VideoDetailDto> =
  Object.fromEntries(mockVideoCatalog.map((v) => [v.videoId, toDetail(v.videoId)]))

export function getMockVideoDetail(videoId: string): VideoDetailDto {
  return mockVideoDetailMap[videoId] ?? toDetail(mockVideoCatalog[0].videoId)
}

/* 기본값 (MSW 비활성 시 fallback) */
export const mockVideoDetail: VideoDetailDto = toDetail(
  mockVideoCatalog[0].videoId
)
