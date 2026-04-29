import type { VideoStatsDto } from '@/entities/video'

export const mockVideoStats: VideoStatsDto = {
  collectedAt: '2026-01-01T00:00:00',
  viewCount: { value: 37687938, changeRate: 18.4 },
  likeCount: { value: 24850394, changeRate: 13.0 },
  commentCount: { value: 269593, changeRate: 13.0 },
  shareCount: { value: 83904, changeRate: -13.0 },
  subscribersGained: { value: 187, changeRate: 13.0 },
  ctr: { value: 34.0, changeRate: 13.0 },
  engagementRate: { value: 52.0, changeRate: 13.0 },
  newViewerRate: { value: 25.0, changeRate: 13.0 },
  outlier: { value: 1.5, changeRate: 13.0 },
  vph: { value: 47.0, changeRate: 13.0 },
}
