import { http, HttpResponse } from 'msw'
import { mockInfluencerSummary } from '@/entities/influencerDetail'

export const influencerSummaryHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/influencers/:channelId/insight-summary`,
    () => {
      return HttpResponse.json({
        success: true,
        responseDto: mockInfluencerSummary,
        error: null,
      })
    }
  ),
]
