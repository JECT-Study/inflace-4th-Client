'use client'

import { useAuth } from '@/features/auth'
import { ChannelProfileSection } from '@/widgets/main/channelProfile'
import { TrendingVideosSection } from '@/widgets/main/trendingVideos'
import { TrendMagazineSection } from '@/widgets/main/trendMagazine'

export function ChannelProfileClient() {
  const { user } = useAuth()
  const channelId = user?.userChannelDetails?.youtubeChannelId as string

  return (
    <div className='flex flex-col divide-y'>
      <ChannelProfileSection channelId={channelId} isExpanded={false} />

      <div className='felx h-fit w-full flex-col px-24 pt-40 pb-96'>
        <TrendingVideosSection channelId={channelId} />
        <TrendMagazineSection channelId={channelId} />
      </div>
    </div>
  )
}
