import type {
  RetentionDataPoint,
  RetentionSummaryDto,
  DropPoint,
} from '../model/types'
import { mockVideoCatalog } from '@/shared/mock'

/* 초 → "M:SS" */
function mmss(totalSeconds: number): string {
  const total = Math.round(totalSeconds)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

/* 영상별로 다른 시청 곡선 (timeRatio 0~1, 11개 포인트의 watchRatio) */
const PROFILES: number[][] = [
  [1.0, 0.92, 0.85, 0.72, 0.63, 0.58, 0.44, 0.48, 0.52, 0.38, 0.3],
  [1.0, 0.96, 0.9, 0.84, 0.79, 0.74, 0.69, 0.62, 0.55, 0.49, 0.43],
  [1.0, 0.88, 0.7, 0.6, 0.55, 0.5, 0.46, 0.42, 0.39, 0.35, 0.31],
  [1.0, 0.97, 0.93, 0.88, 0.82, 0.71, 0.66, 0.61, 0.57, 0.52, 0.47],
  [1.0, 0.9, 0.83, 0.77, 0.6, 0.55, 0.51, 0.47, 0.44, 0.4, 0.36],
]

function buildRetentionData(
  duration: number,
  profile: number[]
): RetentionDataPoint[] {
  return profile.map((watchRatio, i) => {
    const timeRatio = i / (profile.length - 1)
    const prev = i > 0 ? profile[i - 1] : watchRatio
    return {
      timeRatio: Math.round(timeRatio * 10) / 10,
      watchRatio,
      displayTime: mmss(timeRatio * duration),
      isDrop: i > 0 && prev - watchRatio >= 0.1,
    }
  })
}

function buildSummary(
  duration: number,
  profile: number[]
): RetentionSummaryDto {
  const avg = profile.reduce((a, b) => a + b, 0) / profile.length
  return {
    avgWatchDuration: Math.round(duration * avg),
    relativeRetentionAvg: Math.round((0.9 + avg) * 100) / 100,
  }
}

function buildDropPoints(
  duration: number,
  profile: number[]
): DropPoint[] {
  const points: DropPoint[] = []
  for (let i = 1; i < profile.length; i++) {
    const drop = profile[i - 1] - profile[i]
    if (drop >= 0.1) {
      const startRatio = (i - 1) / (profile.length - 1)
      const endRatio = i / (profile.length - 1)
      points.push({
        startTime: mmss(startRatio * duration),
        endTime: i === profile.length - 1 ? null : mmss(endRatio * duration),
        dropRate: Math.round(drop * 1000) / 10,
      })
    }
  }
  return points
}

const profileFor = (index: number) => PROFILES[index % PROFILES.length]

export const mockRetentionDataMap: Record<string, RetentionDataPoint[]> =
  Object.fromEntries(
    mockVideoCatalog.map((v, i) => [
      String(v.videoId),
      buildRetentionData(v.durationSeconds, profileFor(i)),
    ])
  )

export const mockRetentionSummaryMap: Record<string, RetentionSummaryDto> =
  Object.fromEntries(
    mockVideoCatalog.map((v, i) => [
      String(v.videoId),
      buildSummary(v.durationSeconds, profileFor(i)),
    ])
  )

export const mockDropPointsMap: Record<string, DropPoint[]> = Object.fromEntries(
  mockVideoCatalog.map((v, i) => [
    String(v.videoId),
    buildDropPoints(v.durationSeconds, profileFor(i)),
  ])
)

export function getMockRetentionData(videoId: string): RetentionDataPoint[] {
  return (
    mockRetentionDataMap[videoId] ??
    mockRetentionDataMap[String(mockVideoCatalog[0].videoId)]
  )
}

export function getMockRetentionSummary(videoId: string): RetentionSummaryDto {
  return (
    mockRetentionSummaryMap[videoId] ??
    mockRetentionSummaryMap[String(mockVideoCatalog[0].videoId)]
  )
}

export function getMockDropPoints(videoId: string): DropPoint[] {
  return (
    mockDropPointsMap[videoId] ??
    mockDropPointsMap[String(mockVideoCatalog[0].videoId)]
  )
}

/* 기본값 (MSW 비활성 시 fallback) */
export const mockRetentionData = getMockRetentionData(
  String(mockVideoCatalog[0].videoId)
)
export const mockRetentionSummary = getMockRetentionSummary(
  String(mockVideoCatalog[0].videoId)
)
export const mockDropPoints = getMockDropPoints(
  String(mockVideoCatalog[0].videoId)
)
