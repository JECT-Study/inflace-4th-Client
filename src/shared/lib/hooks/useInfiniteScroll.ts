'use client'

import { useCallback, useRef } from 'react'
import {
  useInfiniteQuery,
  type InfiniteData,
  type QueryKey,
  type UseInfiniteQueryOptions,
} from '@tanstack/react-query'

import type { PageInfo } from '@/shared/api/types'

type InfiniteScrollOptions<TPage extends { pageInfo: PageInfo }> = Omit<
  UseInfiniteQueryOptions<
    TPage,
    Error,
    InfiniteData<TPage>,
    QueryKey,
    string | null
  >,
  'getNextPageParam' | 'initialPageParam'
> & {
  intersectionOptions?: IntersectionObserverInit
}

export function useInfiniteScroll<TPage extends { pageInfo: PageInfo }>({
  intersectionOptions,
  queryKey,
  queryFn,
  ...restOptions
}: InfiniteScrollOptions<TPage>) {
  const intersectionOptionsRef = useRef(intersectionOptions)

  const query = useInfiniteQuery<
    TPage,
    Error,
    InfiniteData<TPage>,
    QueryKey,
    string | null
  >({
    ...restOptions,
    queryKey,
    queryFn,
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNext ? lastPage.pageInfo.nextCursor : undefined,
  })

  const { fetchNextPage, hasNextPage, isFetchingNextPage } = query

  const fetchNextPageRef = useRef(fetchNextPage)
  const hasNextPageRef = useRef(hasNextPage)
  const isFetchingNextPageRef = useRef(isFetchingNextPage)

  fetchNextPageRef.current = fetchNextPage
  hasNextPageRef.current = hasNextPage
  isFetchingNextPageRef.current = isFetchingNextPage

  // useRef 대신 callback ref 사용 — sentinel DOM이 마운트/언마운트될 때마다 호출됨
  const sentinelRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          hasNextPageRef.current &&
          !isFetchingNextPageRef.current
        ) {
          fetchNextPageRef.current()
        }
      },
      { rootMargin: '0px 0px 100px 0px', ...intersectionOptionsRef.current }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ...query, sentinelRef }
}
