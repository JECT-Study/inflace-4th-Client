import { http, HttpResponse } from 'msw'
import {
  mockTypeEngagementChart,
  mockTypeEngagementList,
} from '@/entities/channel/typeEngagement/mock/mockTypeEngagement'
import type { TypeEngagementResponseDto } from '@/entities/channel/typeEngagement/model/types'

export const typeEngagementHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/channels/:channelId/engagement-rate`,
    () => {
      const responseDto: TypeEngagementResponseDto = {
        summary: mockTypeEngagementChart,
        videos: mockTypeEngagementList,
      }

      return HttpResponse.json({
        success: true,
        responseDto,
        error: null,
      })
    }
  ),
]
