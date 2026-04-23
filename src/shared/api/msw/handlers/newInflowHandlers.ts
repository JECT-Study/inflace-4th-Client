import { http, HttpResponse } from 'msw'
import {
  mockNewInflow,
  mockNewInflowShort,
  type NewInflowResponseDto,
} from '@/entities/channelDashboard/newInflow'

export const newInflowHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/channels/:channelId/new-subscriber`,
    ({ request }) => {
      const url = new URL(request.url)
      const filter = url.searchParams.get('filter')

      const responseDto: NewInflowResponseDto[] =
        filter === 'SHORT_FORM' ? mockNewInflowShort : mockNewInflow

      return HttpResponse.json({
        success: true,
        responseDto: { videos: responseDto },
        error: null,
      })
    }
  ),
]
