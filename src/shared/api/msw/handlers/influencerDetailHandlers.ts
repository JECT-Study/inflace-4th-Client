import { http, HttpResponse } from 'msw'
import { mockInfluencerDetail } from '@/entities/influencerDetail'

export const influencerDetailHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/influencers/:channelId/insight`,
    () => {
      return HttpResponse.json({
        success: true,
        responseDto: mockInfluencerDetail,
        error: null,
      })
    }
  ),
]
