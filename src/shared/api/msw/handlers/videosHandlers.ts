import { http, HttpResponse } from 'msw'

import { mockVideos } from '@/features/videos/mock/mockVideos'

export const videosHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/channel/:channelid/videos`,
    ({ request }) => {
      const url = new URL(request.url)
      const sort = url.searchParams.get('sort') ?? 'LATEST'
      const format = url.searchParams.get('format')
      const isAd = url.searchParams.get('isAd') === 'true'
      const keyword = url.searchParams.get('keyword') ?? ''

      let videos = [...mockVideos.videos]

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
          v.title.toLowerCase().includes(keyword.toLowerCase()),
        )
      }

      const sortFns: Record<string, (a: (typeof videos)[0], b: (typeof videos)[0]) => number> = {
        LATEST: (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
        VIEWS: (a, b) => b.viewCount - a.viewCount,
        LIKES: (a, b) => b.likeCount - a.likeCount,
        VPH: (a, b) => b.vph - a.vph,
        OUTLIER: (a, b) => b.outLierScore - a.outLierScore,
      }
      videos = videos.sort(sortFns[sort] ?? sortFns.LATEST)

      return HttpResponse.json({
        isSuccess: true,
        responseDto: { ...mockVideos, videos },
        error: null,
      })
    }
  ),
]
