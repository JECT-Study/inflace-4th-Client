export interface RetentionDataPoint {
  timeRatio: number
  watchRatio: number
  displayTime: string
  isDrop: boolean
}

export interface RetentionResponseDto {
  retentionData: RetentionDataPoint[]
}

export interface RetentionSummaryDto {
  avgWatchDuration: number
  relativeRetentionAvg: number
}

export interface RetentionSummaryResponseDto {
  retentionData: RetentionSummaryDto
}

export interface DropPoint {
  startTime: string
  endTime: string | null
  dropRate: number
}

export interface RetentionDropPointsResponseDto {
  dropPoints: DropPoint[]
}
