import { http, HttpResponse } from 'msw'

import {
  mockVideosPage1,
  mockVideosPage2,
} from '@/features/videos/mock/mockVideos'

export const videosHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/channel/:channelid/videos`,
    async ({ request }) => {
      const url = new URL(request.url)
      const cursor = url.searchParams.get('cursor')

      const responseDto = cursor ? mockVideosPage2 : mockVideosPage1

      /* 일부러 5초 기다림(무한 스크롤 여부 확인) */
      if (cursor) {
        await new Promise((resolve) => setTimeout(resolve, 5000))
      }

      return HttpResponse.json({
        isSuccess: true,
        responseDto,
        error: null,
      })
    }
  ),
]
