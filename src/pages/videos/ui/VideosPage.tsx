'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/features/auth'
import { useVideos, VideoList, VALID_FORMAT } from '@/features/videos'
import type { VideoFilterParams, VideoSort } from '@/features/videos'
import { InfiniteScrollList } from '@/shared/ui/infinite-scroll-list/InfiniteScrollList'
import { SearchAndFilter } from '@/widgets/videos'

const VideoListSectionDynamic = dynamic(
  () => Promise.resolve(VideoListSection),
  { ssr: false }
)

export function VideosPage() {
  return (
    <>
      <SearchAndFilter />
      <div className='h-full'>
        <VideoListSectionDynamic />
      </div>
    </>
  )
}

function VideoListSection() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const [selectedSort, setSelectedSort] = useState<VideoSort>('LATEST')

  const channelId = user?.userChannelDetails?.youtubeChannelId ?? ''

  const rawFormat = searchParams?.get('format')
  const format = VALID_FORMAT.includes(rawFormat as never)
    ? (rawFormat as VideoFilterParams['format'])
    : undefined
  const isAd = searchParams?.get('isAd') === 'true' || undefined
  const keyword = searchParams?.get('keyword') ?? ''
  const startDate = searchParams?.get('startDate') ?? undefined
  const endDate = searchParams?.get('endDate') ?? undefined

  const params: VideoFilterParams = {
    ...(selectedSort !== 'LATEST' && { sort: selectedSort }),
    ...(format && { format }),
    ...(isAd && { isAd }),
    ...(keyword && { keyword }),
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  }

  const { videos, sentinelRef, isFetchingNextPage, hasNextPage } = useVideos(
    channelId,
    params
  )

  return (
    <InfiniteScrollList
      sentinelRef={sentinelRef}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={!!hasNextPage}>
      <VideoList
        videos={videos}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
      />
    </InfiniteScrollList>
  )
}
