import type { RefObject } from 'react'

interface InfiniteScrollListProps {
  // 실제 목록 UI (VideoList 등 각 feature의 컴포넌트를 children으로 주입)
  children: React.ReactNode
  // useInfiniteScroll 훅이 반환한 ref — IntersectionObserver 감시 대상
  sentinelRef: RefObject<HTMLDivElement | null>
  isFetchingNextPage: boolean
  hasNextPage: boolean
  // 기본 스피너 대신 커스텀 로딩 UI(스켈레톤 등)를 사용할 때 전달
  loadingFallback?: React.ReactNode
}

/**
 * 무한 스크롤 래퍼 컴포넌트
 *
 * 역할:
 * 1. children(목록 UI) 렌더링
 * 2. 다음 페이지가 있을 때만 sentinel div를 렌더링 — IntersectionObserver가 이 요소를 감시
 * 3. 페이지 로딩 중 스피너(또는 loadingFallback) 표시
 *
 * hasNextPage가 false이면 sentinel을 렌더링하지 않아
 * 불필요한 observer 등록 및 추가 fetch를 방지합니다.
 */
export function InfiniteScrollList({
  children,
  sentinelRef,
  isFetchingNextPage,
  hasNextPage,
  loadingFallback,
}: InfiniteScrollListProps) {
  return (
    <>
      {children}
      {/* 다음 페이지가 있을 때만 sentinel을 마운트 — 뷰포트 진입 시 fetchNextPage 트리거 */}
      {hasNextPage && <div ref={sentinelRef} />}
      {/* 페이지 fetch 중 로딩 UI 표시 */}
      {isFetchingNextPage &&
        (loadingFallback ?? (
          <div className='flex justify-center py-8'>
            <div className='h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent' />
          </div>
        ))}
    </>
  )
}
