import type { TrendingVideoResponseDto } from '../model/types'
import { mockVideoListShort, mockVideoList } from '@/shared/mock'

export const mockChannelTrendingVideo =
  mockVideoList as TrendingVideoResponseDto[]
export const mockChannelTrendingVideoShort =
  mockVideoListShort as TrendingVideoResponseDto[]
