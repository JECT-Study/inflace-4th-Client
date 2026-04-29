import { http, HttpResponse } from 'msw'

import { mockTrendingVideos } from '@/features/main/trendingVideos/mock/mockTrendingVideos'

export const trendingVideosHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/channels/:id/main/tops`, () => {
    return HttpResponse.json({
      success: true,
      responseDto: mockTrendingVideos,
      error: null,
    })
  }),
]
