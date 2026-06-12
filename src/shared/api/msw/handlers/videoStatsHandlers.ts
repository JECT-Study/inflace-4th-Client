import { http, HttpResponse } from 'msw'
import { getMockVideoStats } from '@/features/videoDetail/stats'

export const videoStatsHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/videos/:videoId/stats`,
    async ({ params }) => {
      return HttpResponse.json({
        success: true,
        responseDto: getMockVideoStats(String(params.videoId)),
        error: null,
      })
    }
  ),
]
