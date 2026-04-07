'use client'

import { useParams } from 'next/navigation'

import { ChannelProfileSection } from '@/widgets/landingAfterLogin/channelProfile'
import { TrendingVideosSection } from '@/widgets/landingAfterLogin/trendingVideos'
import { TrendMagazineSection } from '@/widgets/landingAfterLogin/trendMagazine'

export function ChannelProfilePage() {
  const params = useParams<{ id: string }>()
  const id = params!.id

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
