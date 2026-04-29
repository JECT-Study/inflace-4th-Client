import type { NewInflowResponseDto } from '../model/types'
import { mockVideoListShort, mockVideoList } from '@/shared/mock'

export const mockNewInflow = mockVideoList as unknown as NewInflowResponseDto[]
export const mockNewInflowShort =
  mockVideoListShort as unknown as NewInflowResponseDto[]
