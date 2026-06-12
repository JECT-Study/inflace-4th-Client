import { http, HttpResponse } from 'msw'
import {
  getMockRetentionData,
  getMockRetentionSummary,
  getMockDropPoints,
} from '@/features/videoDetail/retention'

export const retentionHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/videos/:videoId/retention`,
    ({ params }) => {
      return HttpResponse.json({
        success: true,
        responseDto: { retentionData: getMockRetentionData(String(params.videoId)) },
        error: null,
      })
    }
  ),

  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/videos/:videoId/retention/summary`,
    ({ params }) => {
      return HttpResponse.json({
        success: true,
        responseDto: { retentionData: getMockRetentionSummary(String(params.videoId)) },
        error: null,
      })
    }
  ),

  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/videos/:videoId/retention/drop-points`,
    ({ params }) => {
      return HttpResponse.json({
        success: true,
        responseDto: { dropPoints: getMockDropPoints(String(params.videoId)) },
        error: null,
      })
    }
  ),
]
