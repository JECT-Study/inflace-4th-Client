import { http, HttpResponse } from 'msw'

import { mockVideos } from '@/features/videos/mock/mockVideos'

export const videosHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/channel/:channelid/videos`,
    () => {
      return HttpResponse.json({
        isSuccess: true,
        responseDto: mockVideos,
        error: null,
      })
    }
  ),
]
