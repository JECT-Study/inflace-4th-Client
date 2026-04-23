import type { VideoDetailDto } from '@/entities/video'
import mockThumbnail from '@/shared/assets/mock/mockProfileImage.png'

export const mockVideoDetail: VideoDetailDto = {
  thumbnailUrl: mockThumbnail.src,
  videoUrl: 'https://www.youtube.com/watch?v=ZJCAlR8F_JM',
  title:
    '2026 최신 AI 폰 총정리 | 갤럭시 S26 vs 아이폰 17 비교 2026 최신 AI 폰 총정리 | 갤럭시 S26 vs 아이폰 17 비교',
  publishedAt: '2026-01-01T12:00:00',
  description:
    '2026 최신 AI 폰 총정리 | 갤럭시 S26 vs 아이폰 17 비교 2026 최신 AI 폰 총정리 | 갤럭시 S26 vs 아이폰 17 비교',
  hashtags: ['#라이프스타일', '#요리', '#일상브이로그'],
}
