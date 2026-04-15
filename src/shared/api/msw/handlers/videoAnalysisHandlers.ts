import { http, HttpResponse } from 'msw'

import { mockVideoAnalysis } from '@/features/videoAnalysis/mock/mockVideoAnalysis'

export const videoAnalysisHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/channel/:id/videos`,
    () => {
      return HttpResponse.json({
        isSuccess: true,
        responseDto: mockVideoAnalysis,
        error: null,
      })
    }
  ),
]
