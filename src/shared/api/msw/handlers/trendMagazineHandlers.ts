import { http, HttpResponse } from 'msw'

import { trendMagazineMock } from '@/features/landingAfterLogin/trendMagazine/mock/trendMagazineMock'

export const trendMagazineHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/channels/:id/trend-magazine`,
    () => {
      return HttpResponse.json({
        success: true,
        responseDto: trendMagazineMock,
        error: null,
      })
    }
  ),
]
