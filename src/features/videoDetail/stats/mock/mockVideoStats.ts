import type { VideoStatsDto } from '@/entities/video'
import { mockVideoCatalog, mockVideoCatalogMap } from '@/shared/mock'

/* videoId별로 변동률을 다르게 주기 위한 결정적 패턴 (Math.random 미사용) */
const CHANGE_RATES = [18.4, -6.2, 12.1, 8.7, -3.4, 21.0, 5.6, -11.2, 9.9, 4.3]
const pick = (seed: number, offset: number) =>
  CHANGE_RATES[(seed + offset) % CHANGE_RATES.length]

const toStats = (videoId: string, index: number): VideoStatsDto => {
  const v = mockVideoCatalogMap[videoId]
  return {
    collectedAt: '2026-06-12T00:00:00',
    viewCount: { value: v.viewCount, changeRate: pick(index, 0) },
    likeCount: { value: v.likeCount, changeRate: pick(index, 1) },
    commentCount: { value: v.commentCount, changeRate: pick(index, 2) },
    shareCount: { value: v.shareCount, changeRate: pick(index, 3) },
    subscribersGained: { value: v.subscribersGained, changeRate: pick(index, 4) },
    ctr: { value: v.ctr, changeRate: pick(index, 5) },
    engagementRate: { value: v.engagementRate, changeRate: pick(index, 6) },
    newViewerRate: { value: v.newViewerRate, changeRate: pick(index, 7) },
    outlier: { value: v.outlierScore, changeRate: pick(index, 8) },
    vph: { value: v.vph, changeRate: pick(index, 9) },
  }
}

/* videoId → 핵심 성과 지표 */
export const mockVideoStatsMap: Record<string, VideoStatsDto> =
  Object.fromEntries(
    mockVideoCatalog.map((v, i) => [String(v.videoId), toStats(String(v.videoId), i)])
  )

export function getMockVideoStats(videoId: string): VideoStatsDto {
  return (
    mockVideoStatsMap[videoId] ?? toStats(String(mockVideoCatalog[0].videoId), 0)
  )
}

/* 기본값 (MSW 비활성 시 fallback) */
export const mockVideoStats: VideoStatsDto = toStats(
  String(mockVideoCatalog[0].videoId),
  0
)
