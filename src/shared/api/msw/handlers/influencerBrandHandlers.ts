import { http, HttpResponse } from 'msw'
import { mockAdvertisementList } from '@/features/influencerDetail/advertisementList/mock/mockInfluencerBrand'

export const influencerBrandHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/brand-collaborations/channels/:channelId`,
    () => {
      return HttpResponse.json({
        success: true,
        responseDto: mockAdvertisementList,
        error: null,
      })
    }
  ),
]
