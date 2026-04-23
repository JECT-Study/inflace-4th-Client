import { http, HttpResponse } from 'msw'
import { mockVideoDetail } from '@/features/videoDetail'

export const videoDetailHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/videos/:videoId`,
    async () => {
      return HttpResponse.json({
        success: true,
        responseDto: mockVideoDetail,
        error: null,
      })
    }
  ),
]
