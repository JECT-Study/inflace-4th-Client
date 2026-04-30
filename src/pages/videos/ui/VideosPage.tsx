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

/* useVideos API 요청 */
function VideoListSection() {
  const { user } = useAuth()
  const searchParams = useSearchParams()

  const channelId = user?.userChannelDetails?.youtubeChannelId ?? ''

  const sort = searchParams?.get('sort') as VideoFilterParams['sort']
  const format = searchParams?.get('format') as VideoFilterParams['format']
  const isAd = searchParams?.get('isAd') === 'true'
  const keyword = searchParams?.get('keyword') ?? ''

  const params: VideoFilterParams = {
    ...(sort && { sort }),
    ...(format && { format }),
    ...(isAd && { isAd }),
    ...(keyword && { keyword }),
  }

  const { data } = useVideos(channelId, params)

  return <VideoList videos={data?.videos ?? []} />
}
