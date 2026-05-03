import type {
  RetentionDataPoint,
  RetentionSummaryDto,
  DropPoint,
} from '../model/types'

export const mockRetentionData: RetentionDataPoint[] = [
  { timeRatio: 0.0, watchRatio: 1.0, displayTime: '00:00', isDrop: false },
  { timeRatio: 0.1, watchRatio: 0.92, displayTime: '00:46', isDrop: false },
  { timeRatio: 0.2, watchRatio: 0.85, displayTime: '01:33', isDrop: false },
  { timeRatio: 0.3, watchRatio: 0.72, displayTime: '02:19', isDrop: true },
  { timeRatio: 0.4, watchRatio: 0.63, displayTime: '03:06', isDrop: false },
  { timeRatio: 0.5, watchRatio: 0.58, displayTime: '03:52', isDrop: false },
  { timeRatio: 0.6, watchRatio: 0.44, displayTime: '04:38', isDrop: true },
  { timeRatio: 0.7, watchRatio: 0.48, displayTime: '05:25', isDrop: false },
  { timeRatio: 0.8, watchRatio: 0.52, displayTime: '06:11', isDrop: false },
  { timeRatio: 0.9, watchRatio: 0.38, displayTime: '06:57', isDrop: true },
  { timeRatio: 1.0, watchRatio: 0.3, displayTime: '07:43', isDrop: false },
]

export const mockRetentionSummary: RetentionSummaryDto = {
  avgWatchDuration: 280, // 약 60% 지점 (4분 40초) — 평균 시청 지속시간 점선 위치
  relativeRetentionAvg: 1.13,
}

export const mockDropPoints: DropPoint[] = [
  { startTime: '0:00', endTime: '1:00', dropRate: 11.3 },
  { startTime: '7:30', endTime: '8:30', dropRate: 5.6 },
  { startTime: '9:00', endTime: '10:00', dropRate: 9.7 },
  { startTime: '12:00', endTime: null, dropRate: 5.7 },
]
