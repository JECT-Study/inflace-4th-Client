import { http, HttpResponse } from 'msw'

import { trendingVideosMock } from '@/features/landingAfterLogin/trendingVideos/mock/trendingVideosMock'

export const trendingVideosHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/channels/:id/main/tops`, () => {
    return HttpResponse.json({
      success: true,
      responseDto: trendingVideosMock,
      error: null,
    })
  }),
]
