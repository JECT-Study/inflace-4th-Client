import { http, HttpResponse } from 'msw'
import { mockVideoStats } from '@/features/videoDetail/stats'

export const videoStatsHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/videos/:videoId/stats`,
    async () => {
      return HttpResponse.json({
        success: true,
        responseDto: mockVideoStats,
        error: null,
      })
    }
  ),
]
