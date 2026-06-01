'use client'

import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll'
import { fetchInfluencerBrand } from '../api/influencerBrandApi'
import type { AdvertisementListParams } from './types'

type AdvertisementListFilter = Omit<AdvertisementListParams, 'cursor'>

const INFLUENCER_BRAND_QUERY_KEY = ['influencerBrand']

export function useInfluencerBrand(
  channelId: string,
  params?: AdvertisementListFilter
) {
  return useInfiniteScroll({
    queryKey: [...INFLUENCER_BRAND_QUERY_KEY, channelId, params],
    queryFn: ({ pageParam }) =>
      fetchInfluencerBrand(channelId, {
        cursor: pageParam ?? undefined,
        ...params,
      }),
    enabled: !!channelId,
  })
}
