import { useEffect, useRef } from 'react'
import {
  useInfiniteQuery,
  type InfiniteData,
  type QueryKey,
  type UseInfiniteQueryOptions,
} from '@tanstack/react-query'

import type { PageInfo } from '@/shared/api/types'

/**
 * useInfiniteScroll 훅에 전달하는 옵션 타입
 * - TPage              : 한 페이지의 응답 형태 (예: { videos: [], pageInfo: {} })
 * - Error              : 에러 타입
 * - InfiniteData<TPage>: 전체 data 형태 — { pages: TPage[], pageParams: [] }
 * - QueryKey           : 캐시 키 타입 (예: ['videoAnalysis', channelId])
 * - string | null      : 커서(cursor) 타입 — 첫 페이지는 null, 이후는 문자열
 *
 */
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

/**
 * 커서 기반 무한 스크롤 공통 훅
 * sentinel 요소가 뷰포트에 진입하면 다음 페이지를 자동 요청
 * sentinelRef를 감시 대상 DOM 요소에 연결해 사용, 페이지 플랫닝은 각 feature 훅에서 수행
 */
export function useInfiniteScroll<TPage extends { pageInfo: PageInfo }>({
  intersectionOptions,
  queryKey,
  queryFn,
  ...restOptions
}: InfiniteScrollOptions<TPage>) {
  // 리스트 끝에 붙는 빈 div의 ref — 이 요소가 화면에 보이는 순간 다음 페이지를 요청
  const sentinelRef = useRef<HTMLDivElement>(null)
  // Observer 생성 옵션은 마운트 시 1회만 적용하므로 ref로 초기값을 고정
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
    initialPageParam: null, // 첫 요청은 cursor 없이 시작
    // hasNext가 false면 undefined를 반환해 fetchNextPage 호출을 중단
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNext ? lastPage.pageInfo.nextCursor : undefined,
  })

  const { fetchNextPage, hasNextPage, isFetchingNextPage } = query

  // ref로 감싸 항상 최신 값을 참조하도록 함
  const fetchNextPageRef = useRef(fetchNextPage)
  const hasNextPageRef = useRef(hasNextPage)
  const isFetchingNextPageRef = useRef(isFetchingNextPage)

  // 렌더마다 ref를 최신 값으로 동기화
  useEffect(() => {
    fetchNextPageRef.current = fetchNextPage
  }, [fetchNextPage])
  useEffect(() => {
    hasNextPageRef.current = hasNextPage
  }, [hasNextPage])
  useEffect(() => {
    isFetchingNextPageRef.current = isFetchingNextPage
  }, [isFetchingNextPage])

  // Observer를 마운트 시 1회만 생성
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

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
      // 하단 100px 전방에서 미리 요청해 스크롤 끊김 방지
      { rootMargin: '0px 0px 100px 0px', ...intersectionOptionsRef.current }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return { ...query, sentinelRef }
}
