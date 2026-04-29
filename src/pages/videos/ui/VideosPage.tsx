'use client'

import { useAuth } from '@/features/auth'
import { useVideos, VideoList } from '@/features/videos'
import { InfiniteScrollList } from '@/shared/ui/infinite-scroll-list/InfiniteScrollList'
import { SearchAndFilter } from '@/widgets/videos'

export function VideosPage() {
  const { user } = useAuth()

  const channelId = user?.userDetails?.id ?? ''
  const { videos, sentinelRef, isFetchingNextPage, hasNextPage } =
    useVideos(channelId)

  return (
    <>
      <SearchAndFilter />
      <InfiniteScrollList
        sentinelRef={sentinelRef}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={!!hasNextPage}>
        <VideoList videos={videos} />
      </InfiniteScrollList>
    </>
  )
}
