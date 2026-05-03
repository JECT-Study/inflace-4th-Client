import { http, HttpResponse } from 'msw'
import {
  mockRetentionData,
  mockRetentionSummary,
  mockDropPoints,
} from '@/features/videoDetail/retention'

export const retentionHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/videos/:videoId/retention`,
    () => {
      return HttpResponse.json({
        success: true,
        responseDto: { retentionData: mockRetentionData },
        error: null,
      })
    }
  ),

  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/videos/:videoId/retention/summary`,
    () => {
      return HttpResponse.json({
        success: true,
        responseDto: { retentionData: mockRetentionSummary },
        error: null,
      })
    }
  ),

  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/videos/:videoId/retention/drop-points`,
    () => {
      return HttpResponse.json({
        success: true,
        responseDto: { dropPoints: mockDropPoints },
        error: null,
      })
    }
  ),
]
