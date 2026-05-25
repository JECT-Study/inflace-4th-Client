import { axiosInstance } from '@/shared/api'
import type { PageInfo } from '@/shared/api/types'
import type { Influencer, SortCriteria, SortOrder } from '@/entities/influencer'
import { mockInfluencers } from '../mock/mockInfluencers'

export interface BookmarkResponse {
  responseDto: string
  error: {
    code: string
    message: string
  } | null
  success: boolean
}

export interface InfluencerListResponse {
  content: Influencer[]
  pageInfo: PageInfo
  sort: {
    sorted: boolean
    sortCriteria: SortCriteria | ''
    sortOrder: SortOrder
  }
}

export interface FetchInfluencersParams {
  cursor?: string | null
  size?: number
  categoryIds?: number[]
  sortCriteria?: SortCriteria
  sortOrder?: SortOrder
}

const PAGE_SIZE = 9

export async function fetchInfluencers(
  params?: FetchInfluencersParams
): Promise<InfluencerListResponse> {
  const startIndex = params?.cursor ? parseInt(params.cursor, 10) : 0
  const content = mockInfluencers.slice(startIndex, startIndex + PAGE_SIZE)
  const nextIndex = startIndex + PAGE_SIZE
  const hasNext = nextIndex < mockInfluencers.length

  return {
    content,
    pageInfo: {
      size: PAGE_SIZE,
      numberOfElements: content.length,
      nextCursor: hasNext ? String(nextIndex) : null,
      hasNext,
    },
    sort: {
      sorted: false,
      sortCriteria: '',
      sortOrder: 'ASC',
    },
  }
}

/* 인플루언서 북마크 추가 / 삭제 */
export async function addBookmark(
  channelId: number
): Promise<BookmarkResponse> {
  const response = await axiosInstance.post<BookmarkResponse>(
    `/influencers/${channelId}/bookmark`
  )
  return response.data
}

export async function removeBookmark(
  channelId: number
): Promise<BookmarkResponse> {
  const response = await axiosInstance.delete<BookmarkResponse>(
    `/influencers/${channelId}/bookmark`
  )
  return response.data
}
