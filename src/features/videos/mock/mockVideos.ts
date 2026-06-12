import type { VideoCardItem } from '@/entities/videos'
import type { VideosResponse } from '../model/types'
import { mockVideoCatalog } from '@/shared/mock'

/* 단일 소스 카탈로그에서 목록 카드용 필드만 추출 (상세 페이지와 데이터 일치 보장) */
const mockVideoItems: VideoCardItem[] = mockVideoCatalog.map((v) => ({
  videoId: v.videoId,
  title: v.title,
  thumbnailUrl: v.thumbnailUrl,
  publishedAt: v.publishedAt,
  viewCount: v.viewCount,
  likeCount: v.likeCount,
  commentCount: v.commentCount,
  vph: v.vph,
  outLierScore: v.outLierScore,
  duration: v.duration,
  isShort: v.isShort,
  isAd: v.isAd,
}))

const PAGE_SIZE = 12
const mockVideoItemsPage1 = mockVideoItems.slice(0, PAGE_SIZE)
const mockVideoItemsPage2 = mockVideoItems.slice(PAGE_SIZE)

export const mockVideosPage1: VideosResponse = {
  videos: mockVideoItemsPage1,
  pageInfo: {
    size: PAGE_SIZE,
    numberOfElements: mockVideoItemsPage1.length,
    nextCursor: '1',
    hasNext: mockVideoItemsPage2.length > 0,
  },
}

export const mockVideosPage2: VideosResponse = {
  videos: mockVideoItemsPage2,
  pageInfo: {
    size: PAGE_SIZE,
    numberOfElements: mockVideoItemsPage2.length,
    nextCursor: null,
    hasNext: false,
  },
}

export const mockVideos = mockVideosPage1
