import { http, HttpResponse } from 'msw'
import { getMockVideoDetail } from '@/features/videoDetail'

export const videoDetailHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/videos/:videoId`,
    async ({ params }) => {
      return HttpResponse.json({
        success: true,
        responseDto: getMockVideoDetail(String(params.videoId)),
        error: null,
      })
    }
  ),
]
