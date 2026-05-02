import { http, HttpResponse } from 'msw'
import { mockSubscriber } from '@/entities/channel/subscriberDistribution/mock/mockSubscriberDistribution'

export const subscriberChartHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/channels/:id/subscriber-pattern`,
    () => {
      return HttpResponse.json({
        success: true,
        responseDto: mockSubscriber,
        error: null,
      })
    }
  ),
]
