import { http, HttpResponse } from 'msw'

import { mockTrendingVideos } from '@/features/main/trendingVideos/mock/mockTrendingVideos'

export const trendingVideosHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/channels/:id/main/tops`, () => {
    return HttpResponse.json({
      success: true,
      responseDto: {
        videos: mockTrendingVideos.map((video, index) => ({
          rank: index + 1,
          videoId: Number(video.id.replace(/\D/g, '')) || index + 1,
          title: video.title,
          thumbnailUrl: video.thumbnailUrl,
          viewCount: video.viewCount,
          likeCount: video.likeCount,
          commentCount: video.commentCount,
          engagementRate: video.engagementRate,
          publishedAt: video.publishedAt,
          avd: video.ctr,
        })),
      },
      error: null,
    })
  }),
]
