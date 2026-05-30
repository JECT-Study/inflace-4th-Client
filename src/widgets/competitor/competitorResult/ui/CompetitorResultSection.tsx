'use client'

import { Button } from '@/shared/ui/button'
import { CompetitorVideoCard } from '@/entities/competitor'
import type { CompetitorVideoCardItem } from '@/entities/competitor'
import type { SortCriteria } from '@/features/competitor'

import IconLoading from '@/shared/assets/loading-bold.svg'

import { CompetitorSortTabs } from './CompetitorSortTabs'

interface CompetitorResultSectionProps {
  videos: CompetitorVideoCardItem[]
  selectedVideoIds: Set<string>
  onToggleSelect: (videoId: string) => void
  sortCriteria: SortCriteria
  onSortChange: (next: SortCriteria) => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
  onLoadMore: () => void
}

export function CompetitorResultSection({
  videos,
  selectedVideoIds,
  onToggleSelect,
  sortCriteria,
  onSortChange,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: CompetitorResultSectionProps) {
  return (
    <section className='flex w-full flex-col gap-16'>
      {/* 정렬 탭 — 우측 정렬 */}
      <div className='flex justify-end'>
        <CompetitorSortTabs value={sortCriteria} onChange={onSortChange} />
      </div>

      {/* 카드 3열 그리드 */}
      <div className='grid grid-cols-3 gap-24'>
        {videos.map((video) => (
          <CompetitorVideoCard
            key={video.videoId}
            video={video}
            selected={selectedVideoIds.has(video.videoId)}
            onToggle={onToggleSelect}
          />
        ))}
      </div>

      {/* 결과 더보기 — 다음 페이지가 있을 때만 노출 */}
      {hasNextPage && (
        <div className='flex justify-center pt-16'>
          <Button
            type='button'
            color='secondary'
            variant='outlined'
            size='lg'
            onClick={onLoadMore}
            disabled={isFetchingNextPage}
            rightIcon={<IconLoading />}>
            {isFetchingNextPage ? '불러오는 중…' : '결과 더보기'}
          </Button>
        </div>
      )}
    </section>
  )
}
