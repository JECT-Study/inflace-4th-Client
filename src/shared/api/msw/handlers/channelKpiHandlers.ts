import { http, HttpResponse } from 'msw'

import { mockChannelKpi } from '@/entities/channel/channelKpiCard'

export const channelKpiHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/channels/:channelId/kpi`,
    async () => {
      return HttpResponse.json({
        success: true,
        responseDto: mockChannelKpi,
        error: null,
      })
    }
  ),
]
