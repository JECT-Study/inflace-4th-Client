'use client'

import { useAuth } from '@/features/auth'
import { ChannelProfileSection } from '@/widgets/main/channelProfile'
import { KpiSection } from '@/widgets/channel/Kpi'
import { SubscriberGrowthSection } from '@/widgets/channel/SubscriberGrowth'

export function ChannelPage() {
  const { user } = useAuth()
  const id = user?.id ?? ''

  return (
    <div className='flex flex-col gap-y-24 divide-y bg-background-gray-default'>
      {/* 프로필 카드 */}
      <ChannelProfileSection
        channelId={id}
        isExpanded={true}
        variant='dashboard'
      />
      {/* 핵심 지표 카드 */}
      <div className='border-0 px-24'>
        <KpiSection channelId={id} />
      </div>
      {/* 구독자 추이 그래프 */}
      <div className='px-24'>
        <SubscriberGrowthSection channelId={id} />
      </div>
    </div>
  )
}
