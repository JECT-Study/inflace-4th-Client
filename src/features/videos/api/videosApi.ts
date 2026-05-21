import type { VideosResponse, VideoFilterParams } from '../model/types'
import { mockVideosPage1, mockVideosPage2 } from '../mock/mockVideos'
import type { VideoCardItem } from '@/entities/videos'

const ALL_MOCK_VIDEOS: VideoCardItem[] = [
  ...mockVideosPage1.videos,
  ...mockVideosPage2.videos,
]

export async function fetchVideoList(
  _channelId: string,
  params?: VideoFilterParams
): Promise<VideosResponse> {
  let filtered = [...ALL_MOCK_VIDEOS]

  if (params?.keyword) {
    const kw = params.keyword.toLowerCase()
    filtered = filtered.filter((v) => v.title.toLowerCase().includes(kw))
  }

  if (params?.format === 'SHORT_FORM') {
    filtered = filtered.filter((v) => v.isShort)
  } else if (params?.format === 'LONG_FORM') {
    filtered = filtered.filter((v) => !v.isShort)
  }

  if (params?.isAd) {
    filtered = filtered.filter((v) => v.isAd)
  }

  if (params?.startDate || params?.endDate) {
    const start = params.startDate ? new Date(params.startDate) : null
    const end = params.endDate ? new Date(params.endDate + 'T23:59:59.999Z') : null
    filtered = filtered.filter((v) => {
      const published = new Date(v.publishedAt)
      if (start && published < start) return false
      if (end && published > end) return false
      return true
    })
  }

  if (params?.sort) {
    filtered = [...filtered].sort((a, b) => {
      switch (params.sort) {
        case 'VIEWS':
          return b.viewCount - a.viewCount
        case 'LIKES':
          return b.likeCount - a.likeCount
        case 'VPH':
          return b.vph - a.vph
        case 'OUTLIER':
          return b.outLierScore - a.outLierScore
        default:
          return 0
      }
    })
  } else {
    filtered = [...filtered].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  }

  const PAGE_SIZE = 12
  const cursor = params?.cursor
  const pageStart = cursor ? parseInt(cursor, 10) * PAGE_SIZE : 0
  const pageItems = filtered.slice(pageStart, pageStart + PAGE_SIZE)
  const hasNext = pageStart + PAGE_SIZE < filtered.length
  const nextCursor = hasNext ? String((cursor ? parseInt(cursor, 10) : 0) + 1) : null

  return {
    videos: pageItems,
    pageInfo: {
      size: PAGE_SIZE,
      numberOfElements: pageItems.length,
      nextCursor,
      hasNext,
    },
  }
}
