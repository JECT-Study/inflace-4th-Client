import { http, HttpResponse } from 'msw'
import {
  mockChannelTrendingVideo,
  mockChannelTrendingVideoShort,
  type TrendingVideoResponseDto,
} from '@/entities/channel/trendingVideo'

export const channelTrendingVideoHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/channels/:channelId/tops`,
    ({ request }) => {
      const url = new URL(request.url)
      const filter = url.searchParams.get('filter')

      const responseDto: TrendingVideoResponseDto[] =
        filter === 'SHORT_FORM'
          ? mockChannelTrendingVideoShort
          : mockChannelTrendingVideo

      return HttpResponse.json({
        success: true,
        responseDto: { videos: responseDto },
        error: null,
      })
    }
  ),
]
