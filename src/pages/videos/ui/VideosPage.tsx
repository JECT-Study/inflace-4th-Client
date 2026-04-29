'use client'

import { useAuth } from '@/features/auth'
import { useVideos, VideoList } from '@/features/videos'
import { SearchAndFilter } from '@/widgets/videos'

export function VideosPage() {
  const { user } = useAuth()

  const channelId = user?.userChannelDetails?.youtubeChannelId ?? ''
  const { data } = useVideos(channelId)

  return (
    <>
      <SearchAndFilter />
      <VideoList videos={data?.videos ?? []} />
    </>
  )
}
