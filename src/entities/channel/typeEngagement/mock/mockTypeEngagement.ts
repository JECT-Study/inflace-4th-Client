import type {
  TypeEngagementSummaryDto,
  TypeEngagementVideoDto,
} from '../model/types'

import mockThumbnailImage from '@/shared/assets/mock/mockThumbnailImage.png'

export const mockTypeEngagementChart: TypeEngagementSummaryDto = {
  longFormEngagementRate: 64.2,
  shortFormEngagementRate: 35.8,
}

export const mockTypeEngagementList: TypeEngagementVideoDto[] = [
  {
    rank: 1,
    videoId: 'video_001',
    title:
      '제목입니다. 2026 최신 AI 폰 총정리 | 갤럭시 S26 vs 아이폰 17 비교2026 최신 AI 폰 총정리 | 갤럭시 S26 vs 아이폰 17 비교 2026 최신 AI 폰 총정리 | 갤럭시 S26 vs 아이폰 17 비교 ',
    thumbnailUrl: mockThumbnailImage.src,
    contentType: 'LONG_FORM',
    engagementRate: 7.24,
  },
  {
    rank: 2,
    videoId: 'video_002',
    title:
      '제목입니다. 2026 최신 AI 폰 총정리 | 갤럭시 S26 vs 아이폰 17 비교2026 최신 AI 폰 총정리 | 갤럭시 S26 vs 아이폰 17 비교 2026 최신 AI 폰 총정리 | 갤럭시 S26 vs 아이폰 17 비교 ',
    thumbnailUrl: mockThumbnailImage.src,
    contentType: 'SHORT_FORM',
    engagementRate: 6.91,
  },
  {
    rank: 3,
    videoId: 'video_003',
    title:
      '제목입니다. 2026 최신 AI 폰 총정리 | 갤럭시 S26 vs 아이폰 17 비교2026 최신 AI 폰 총정리 | 갤럭시 S26 vs 아이폰 17 비교 2026 최신 AI 폰 총정리 | 갤럭시 S26 vs 아이폰 17 비교 ',
    thumbnailUrl: mockThumbnailImage.src,
    contentType: 'LONG_FORM',
    engagementRate: 6.13,
  },
  {
    rank: 4,
    videoId: 'video_003',
    title:
      '제목입니다. 2026 최신 AI 폰 총정리 | 갤럭시 S26 vs 아이폰 17 비교2026 최신 AI 폰 총정리 | 갤럭시 S26 vs 아이폰 17 비교 2026 최신 AI 폰 총정리 | 갤럭시 S26 vs 아이폰 17 비교 ',
    thumbnailUrl: mockThumbnailImage.src,
    contentType: 'LONG_FORM',
    engagementRate: 6.13,
  },
  {
    rank: 5,
    videoId: 'video_003',
    title:
      '제목입니다. 2026 최신 AI 폰 총정리 | 갤럭시 S26 vs 아이폰 17 비교2026 최신 AI 폰 총정리 | 갤럭시 S26 vs 아이폰 17 비교 2026 최신 AI 폰 총정리 | 갤럭시 S26 vs 아이폰 17 비교 ',
    thumbnailUrl: mockThumbnailImage.src,
    contentType: 'LONG_FORM',
    engagementRate: 6.13,
  },
]
