'use client'

import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query'

import { fetchBrandCollaborations } from '../api/competitorApi'
import type {
  BrandCollaborationsQuery,
  CompetitorFilterState,
} from './types'

const DEFAULT_PAGE_SIZE = 9

export function toBrandCollaborationsQuery(
  filter: CompetitorFilterState,
  cursor?: string,
  pageSize: number = DEFAULT_PAGE_SIZE
): BrandCollaborationsQuery {
  return {
    startDate: filter.startDate?.toISOString(),
    endDate: filter.endDate?.toISOString(),
    includeKeywords:
      filter.includeKeywords.length > 0 ? filter.includeKeywords : undefined,
    excludeKeywords:
      filter.excludeKeywords.length > 0 ? filter.excludeKeywords : undefined,
    videoFormat: filter.videoFormat,
    categoryId: filter.categoryId || undefined,
    regionCode: filter.regionCode || undefined,
    languageCode: filter.languageCode || undefined,
    minViews: filter.minViews ? Number(filter.minViews) : undefined,
    minLikes: filter.minLikes ? Number(filter.minLikes) : undefined,
    minComments: filter.minComments ? Number(filter.minComments) : undefined,
    sortCriteria: filter.sortCriteria,
    sortOrder: filter.sortOrder,
    cursor,
    pageSize,
  }
}

interface UseBrandCollaborationsOptions {
  filter: CompetitorFilterState | null
  enabled?: boolean
}

/* 커서 기반 무한 페이지네이션 — '결과 더보기' 버튼 클릭으로 다음 페이지 누적 */
export function useBrandCollaborations({
  filter,
  enabled = true,
}: UseBrandCollaborationsOptions) {
  /* queryKey 안정화를 위해 cursor 없는 baseQuery를 키로 사용 */
  const baseQuery = filter ? toBrandCollaborationsQuery(filter) : null

  return useInfiniteQuery({
    queryKey: ['brand-collaborations', baseQuery],
    queryFn: ({ pageParam }) =>
      fetchBrandCollaborations(
        toBrandCollaborationsQuery(filter!, pageParam ?? undefined)
      ),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNext ? lastPage.pageInfo.nextCursor : undefined,
    enabled: enabled && baseQuery !== null,
    placeholderData: keepPreviousData,
  })
}
