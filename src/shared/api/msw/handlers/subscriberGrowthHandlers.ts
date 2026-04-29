import { http, HttpResponse } from 'msw'

import {
  mockSubscriberGrowth1Week,
  mockSubscriberGrowth1Month,
  mockSubscriberGrowth3Months,
  mockSubscriberGrowth6Months,
  mockSubscriberGrowth1Year,
} from '@/entities/channel/subscriberGrowth/mock/mockSubscriberGrowth'
import type { SubscriberGrowthDto } from '@/entities/channel/subscriberGrowth/model/types'

const RANGE_MOCK_MAP: Record<string, SubscriberGrowthDto> = {
  '7D': mockSubscriberGrowth1Week,
  '30D': mockSubscriberGrowth1Month,
  '90D': mockSubscriberGrowth3Months,
  '180D': mockSubscriberGrowth6Months,
  '1Y': mockSubscriberGrowth1Year,
}

export const subscriberGrowthHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/channels/:channelId/subscriber-trend`,
    ({ request }) => {
      const url = new URL(request.url)
      const range = url.searchParams.get('range') ?? '30D'

      return HttpResponse.json({
        success: true,
        responseDto: RANGE_MOCK_MAP[range] ?? mockSubscriberGrowth1Month,
        error: null,
      })
    }
  ),
]
