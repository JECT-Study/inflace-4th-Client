import type { Influencer, SortCriteria, SortOrder } from '@/entities/influencer'
import { InfluencerCard } from '@/entities/influencer'
import { InfiniteScrollList } from '@/shared/ui/infinite-scroll-list/InfiniteScrollList'
import { formatComma } from '@/shared/lib/format'
import { useBookmarkToggle } from '../model/useInfluencers'

interface SortOption {
  label: string
  sortCriteria: SortCriteria
  sortOrder: SortOrder
}

interface InfluencerListProps {
  selectedIndex: number
  onSortChange?: (sortCriteria: SortCriteria, sortOrder: SortOrder) => void
  influencers: Influencer[]
  sentinelRef: (node: HTMLDivElement | null) => void
  isFetchingNextPage: boolean
  hasNextPage: boolean
}

export const SORT_OPTIONS: SortOption[] = [
  { label: '구독자 많은 순', sortCriteria: 'subscriber', sortOrder: 'DESC' },
  { label: '구독자 적은 순', sortCriteria: 'subscriber', sortOrder: 'ASC' },
  {
    label: '참여율 높은 순',
    sortCriteria: 'engagement_rate',
    sortOrder: 'DESC',
  },
  {
    label: '참여율 낮은 순',
    sortCriteria: 'engagement_rate',
    sortOrder: 'ASC',
  },
]

export function InfluencerList({
  selectedIndex,
  onSortChange,
  influencers,
  sentinelRef,
  isFetchingNextPage,
  hasNextPage,
}: InfluencerListProps) {
  const toggleBookmark = useBookmarkToggle()

  const handleSortClick = (option: SortOption) => {
    onSortChange?.(option.sortCriteria, option.sortOrder)
  }

  return (
    <div className='flex h-fit w-full flex-col gap-16 px-24'>
      <div className='flex h-fit w-full justify-between text-noto-label-sm-bold'>
        <span className='gap-10 px-2 text-text-and-icon-primary'>
          검색결과 {formatComma(influencers.length)}명
        </span>

        {/* 정렬기준 */}
        <div className='flex size-fit'>
          {SORT_OPTIONS.map((option, index) => (
            <span
              key={option.label}
              className='flex items-center text-noto-label-md-normal text-text-and-icon-tertiary'>
              <button
                type='button'
                className={`size-fit px-8 py-4 ${selectedIndex === index ? 'text-noto-label-md-bold text-brand-secondary' : ''}`}
                onClick={() => handleSortClick(option)}>
                {option.label}
              </button>
              {index < SORT_OPTIONS.length - 1 && '・'}
            </span>
          ))}
        </div>
      </div>

      <InfiniteScrollList
        sentinelRef={sentinelRef}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}>
        {influencers.length === 0 ? (
          <div className='text-noto-label-sm-medium text-status-error px-24'>
            조건에 맞는 인플루언서가 없습니다.
          </div>
        ) : (
          <div className='grid h-fit w-full grid-cols-[repeat(auto-fill,minmax(52.1rem,1fr))] gap-24'>
            {influencers.map((influencer) => (
              <InfluencerCard
                key={influencer.channelId}
                influencer={influencer}
                onBookmarkToggle={(bookmarked) =>
                  toggleBookmark(influencer.channelId, bookmarked)
                }
              />
            ))}
          </div>
        )}
      </InfiniteScrollList>
    </div>
  )
}
