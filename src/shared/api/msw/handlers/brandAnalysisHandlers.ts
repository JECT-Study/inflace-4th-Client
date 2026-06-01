import { http, HttpResponse } from 'msw'
import { mockAdvertisementFilter } from '@/features/influencerDetail/mock/mockAdvertisementFilter'

export const brandAnalysisHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/brand-collaborations/channels/:channelId/analysis`,
    () => {
      return HttpResponse.json({
        success: true,
        responseDto: mockAdvertisementFilter,
        error: null,
      })
    }
  ),
]
