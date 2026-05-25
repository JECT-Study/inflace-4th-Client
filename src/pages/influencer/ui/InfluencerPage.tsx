'use client'

import { Suspense, useState } from 'react'
import { InfluencerList, useInfluencers } from '@/features/influencer'
import type { SortCriteria, SortOrder } from '@/entities/influencer'
import { useYoutubeCategories } from '@/entities/youtubeCategory'
import { InfluencerFilter } from '@/widgets/influencer'

export function InfluencerPage() {
  const { data: categoriesData } = useYoutubeCategories()
  const categories = categoriesData?.youtubeCategories ?? []

  return (
    <div className='flex h-fit w-full flex-col gap-24 pb-[9.6rem]'>
      <InfluencerFilter categories={categories} />
      <div className='h-full'>
        <Suspense fallback={<></>}>
          <InfluencerListSection />
        </Suspense>
      </div>
    </div>
  )
}

function InfluencerListSection() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [sortParams, setSortParams] = useState<{
    sortCriteria?: SortCriteria
    sortOrder?: SortOrder
  }>({})

  const {
    data,
    isLoading,
    isError,
    sentinelRef,
    isFetchingNextPage,
    hasNextPage,
  } = useInfluencers(sortParams)

  const influencers = data?.pages.flatMap((page) => page.content) ?? []

  const handleSortChange = (
    index: number,
    sortCriteria: SortCriteria,
    sortOrder: SortOrder
  ) => {
    setSelectedIndex(index)
    setSortParams({ sortCriteria, sortOrder })
  }

  if (isLoading) {
    return (
      <div className='text-noto-label-sm-medium px-24 text-text-and-icon-tertiary'>
        불러오는 중...
      </div>
    )
  }

  if (isError) {
    return (
      <div className='text-noto-label-sm-medium text-status-error px-24'>
        조건에 맞는 인플루언서가 없습니다.
      </div>
    )
  }

  return (
    <InfluencerList
      selectedIndex={selectedIndex}
      onSortChange={handleSortChange}
      influencers={influencers}
      sentinelRef={sentinelRef}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={!!hasNextPage}
    />
  )
}
