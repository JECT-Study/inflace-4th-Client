import { useQueryClient } from '@tanstack/react-query'

import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll'
import type { Influencer } from '@/entities/influencer'
import type { InfiniteData } from '@tanstack/react-query'

import {
  fetchInfluencers,
  addBookmark,
  removeBookmark,
} from '../api/influencerApi'
import type { FetchInfluencersParams, InfluencerListResponse } from '../api/influencerApi'

const INFLUENCERS_QUERY_KEY = ['influencers']

export function useInfluencers(
  params?: Pick<FetchInfluencersParams, 'sortCriteria' | 'sortOrder'>
) {
  return useInfiniteScroll({
    queryKey: [...INFLUENCERS_QUERY_KEY, params],
    queryFn: ({ pageParam }) => fetchInfluencers({ cursor: pageParam, ...params }),
  })
}

/* 클릭 시 TanStack Query 캐시를 즉시 업데이트 후 API 호출 */
export function useBookmarkToggle() {
  const queryClient = useQueryClient()

  return (channelId: number, bookmarked: boolean) => {
    queryClient.setQueryData<InfiniteData<InfluencerListResponse>>(
      INFLUENCERS_QUERY_KEY,
      (prev) => {
        if (!prev) return prev
        return {
          ...prev,
          pages: prev.pages.map((page) => ({
            ...page,
            content: page.content.map((influencer: Influencer) =>
              influencer.channelId === channelId
                ? { ...influencer, bookmarked }
                : influencer
            ),
          })),
        }
      }
    )

    void (bookmarked ? addBookmark(channelId) : removeBookmark(channelId))
  }
}
