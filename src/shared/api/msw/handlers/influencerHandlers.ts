import { http, HttpResponse } from 'msw'

import { mockInfluencers } from '@/features/influencer/mock/mockInfluencers'

export const influencerHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/influencers`, () => {
    return HttpResponse.json({
      success: true,
      responseDto: {
        content: mockInfluencers,
        pageSize: 12,
        hasNext: false,
        numberOfElements: 12,
        empty: false,
        sort: {
          sorted: true,
          sortCriteria: 'engagement_rate',
          sortOrder: 'DESC',
        },
      },
      error: null,
    })
  }),
]
