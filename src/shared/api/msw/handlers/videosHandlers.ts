import { http, HttpResponse } from 'msw'

import {
  mockVideosPage1,
  mockVideosPage2,
} from '@/features/videos/mock/mockVideos'

export const videosHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/channels/:channelId/videos`,
    ({ request }) => {
      const url = new URL(request.url)
      const cursor = url.searchParams.get('cursor')
      const sort = url.searchParams.get('sort') ?? 'LATEST'
      const format = url.searchParams.get('format')
      const isAd = url.searchParams.get('isAd') === 'true'
      const keyword = url.searchParams.get('keyword') ?? ''
      const startDate = url.searchParams.get('startDate')
      const endDate = url.searchParams.get('endDate')

      const basePage = cursor ? mockVideosPage2 : mockVideosPage1
      let videos = [...basePage.content]

      if (format === 'LONG_FORM') {
        videos = videos.filter((v) => !v.isShort)
      } else if (format === 'SHORT_FORM') {
        videos = videos.filter((v) => v.isShort)
      }

      if (isAd) {
        videos = videos.filter((v) => v.isAd)
      }

      if (keyword) {
        videos = videos.filter((v) =>
          v.title.toLowerCase().includes(keyword.toLowerCase())
        )
      }

      if (startDate) {
        const start = new Date(startDate)
        videos = videos.filter((v) => new Date(v.publishedAt) >= start)
      }

      if (endDate) {
        const end = new Date(endDate)
        end.setHours(23, 59, 59, 999)
        videos = videos.filter((v) => new Date(v.publishedAt) <= end)
      }

      const sortFns: Record<
        string,
        (a: (typeof videos)[0], b: (typeof videos)[0]) => number
      > = {
        LATEST: (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
        VIEWS: (a, b) => b.viewCount - a.viewCount,
        LIKES: (a, b) => b.likeCount - a.likeCount,
        VPH: (a, b) => b.vph - a.vph,
        OUTLIER: (a, b) => b.outLierScore - a.outLierScore,
      }
      videos = videos.sort(sortFns[sort] ?? sortFns.LATEST)

      return HttpResponse.json({
        success: true,
        responseDto: { ...basePage, content: videos },
        error: null,
      })
    }
  ),
]
