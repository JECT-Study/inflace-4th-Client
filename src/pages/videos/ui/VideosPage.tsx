'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/features/auth'
import { useVideos, VideoList } from '@/features/videos'
import type { VideoFilterParams } from '@/features/videos'
import { SearchAndFilter } from '@/widgets/videos'

export function VideosPage() {
  return (
    <>
      <SearchAndFilter />
      <Suspense fallback={<></>}>
        <VideoListSection />
      </Suspense>
    </>
  )
}

/* 필터값 반영 */
function VideoListSection() {
  const { user } = useAuth()
  const searchParams = useSearchParams()

  const channelId = user?.userChannelDetails?.youtubeChannelId ?? ''

  const sort = searchParams?.get('sort') as VideoFilterParams['sort']
  const isLong = searchParams?.get('LONG_FORM') === 'true'
  const isShort = searchParams?.get('SHORT_FORM') === 'true'
  const isAd = searchParams?.get('isAd') === 'true'

  const format: VideoFilterParams['format'] =
    isLong && isShort ? 'ALL' : isLong ? 'LONG_FORM' : isShort ? 'SHORT_FORM' : undefined

  const params: VideoFilterParams = {
    ...(sort && { sort }),
    ...(format && { format }),
    ...(isAd && { isAd }),
  }

  const { data } = useVideos(channelId, params)

  return <VideoList videos={data?.videos ?? []} />
}
