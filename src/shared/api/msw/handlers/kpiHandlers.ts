import { http, HttpResponse } from 'msw'
import { mockKpi } from '@/entities/channel/kpiCard'

export const kpiHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/channels/:channelId/kpi`,
    async () => {
      return HttpResponse.json({
        success: true,
        responseDto: mockKpi,
        error: null,
      })
    }
  ),
]
