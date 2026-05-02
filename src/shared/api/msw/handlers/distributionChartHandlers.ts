import { http, HttpResponse } from 'msw'
import { mockSubscriberDistribution } from '@/entities/channel/subscriberDistribution/mock/mockSubscriberDistribution'

export const distributionChartHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/channels/:id/subscriber-distribution`,
    ({ request }) => {
      const url = new URL(request.url)
      const filters = url.searchParams.get('filter')?.split(',') ?? []

      const responseDto = {
        ...(filters.includes('genders') && {
          gender: mockSubscriberDistribution.gender,
        }),
        ...(filters.includes('ages') && {
          age: mockSubscriberDistribution.age,
        }),
        ...(filters.includes('countries') && {
          country: mockSubscriberDistribution.country,
        }),
      }

      return HttpResponse.json({
        success: true,
        responseDto,
        error: null,
      })
    }
  ),
]
