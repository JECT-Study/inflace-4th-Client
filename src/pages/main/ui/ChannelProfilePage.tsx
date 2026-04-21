'use client'

import { ChannelProfileSection } from '@/widgets/main/channelProfile'
import { TrendingVideosSection } from '@/widgets/main/trendingVideos'
import { TrendMagazineSection } from '@/widgets/main/trendMagazine'
import { useAuth } from '@/features/auth'

export function ChannelProfilePage() {
  const { user } = useAuth()
  const id = user?.id ?? ''

  return (
    <div className='flex flex-col divide-y'>
      {/* 프로필 카드 */}
      <ChannelProfileSection channelId={id} />

      {/* 콘텐츠 */}
      <div className='felx h-fit w-full flex-col px-24 pt-40 pb-96'>
        <TrendingVideosSection channelId={id} />
        <TrendMagazineSection channelId={id} />
      </div>
    </div>
  )
}
