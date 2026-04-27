import { useEffect, useRef } from 'react'
import {
  useInfiniteQuery,
  type InfiniteData,
  type QueryKey,
  type UseInfiniteQueryOptions,
} from '@tanstack/react-query'

import type { CursorPageInfo } from '@/shared/api/types'

// pageInfo를 반드시 포함하는 페이지 응답의 최소 조건
// TPage가 이 인터페이스를 만족해야 getNextPageParam에서 커서를 꺼낼 수 있음
interface PageWithCursor {
  pageInfo: CursorPageInfo
}

// useInfiniteQuery 옵션에서 getNextPageParam, initialPageParam을 제외하고 받음
// — 두 값은 커서 기반 페이지네이션 규칙에 맞게 훅 내부에서 고정 주입하기 때문
// intersectionOptions: IntersectionObserver 동작(rootMargin, threshold 등)을 호출 측에서 재정의할 수 있도록 노출
type InfiniteScrollOptions<TPage extends PageWithCursor> = Omit<
  UseInfiniteQueryOptions<
    TPage,
    Error,
    InfiniteData<TPage>,
    TPage,
    QueryKey,
    string | null
  >,
  'getNextPageParam' | 'initialPageParam'
> & {
  intersectionOptions?: IntersectionObserverInit
}

/**
 * 커서 기반 무한 스크롤 공통 훅
 *
 * useInfiniteQuery + IntersectionObserver를 조합하여,
 * sentinel 요소가 뷰포트에 진입하면 자동으로 다음 페이지를 요청합니다.
 *
 * 반환하는 sentinelRef를 감시 대상 DOM 요소에 연결하세요.
 * data.pages는 원본 그대로 반환하므로, 도메인 키(videos, channels 등)로의
 * 플랫닝은 각 feature 훅(useVideos 등)에서 직접 수행합니다.
 */
export function useInfiniteScroll<TPage extends PageWithCursor>({
  intersectionOptions,
  ...queryOptions
}: InfiniteScrollOptions<TPage>) {
  // IntersectionObserver가 감시할 sentinel DOM 요소의 ref
  const sentinelRef = useRef<HTMLDivElement>(null)

  const query = useInfiniteQuery<
    TPage,
    Error,
    InfiniteData<TPage>,
    QueryKey,
    string | null
  >({
    ...queryOptions,
    // 첫 페이지 요청 시 cursor 없음을 null로 명시
    initialPageParam: null,
    // hasNext가 false이면 undefined를 반환해 더 이상 fetchNextPage가 호출되지 않도록 함
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNext ? lastPage.pageInfo.nextCursor : undefined,
  })

  const { fetchNextPage, hasNextPage, isFetchingNextPage } = query

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 이미 fetch 중이거나 더 이상 페이지가 없으면 무시
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      {
        // 리스트 하단 100px 전방에서 미리 다음 페이지를 요청해 끊김 없는 스크롤 구현
        rootMargin: '0px 0px 100px 0px',
        ...intersectionOptions,
      }
    )

    observer.observe(sentinel)
    // 언마운트 시 observer 정리 — 메모리 누수 방지
    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, intersectionOptions])

  return { ...query, sentinelRef }
}
