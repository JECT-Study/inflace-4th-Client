import { http, HttpResponse } from 'msw'

import { mockTrendMagazines } from '@/features/landingAfterLogin/trendMagazine/mock/mockTrendMagazines'

export const trendMagazineHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/channels/:id/trend-magazine`,
    () => {
      return HttpResponse.json({
        success: true,
        responseDto: mockTrendMagazines,
        error: null,
      })
    }
  ),
]
