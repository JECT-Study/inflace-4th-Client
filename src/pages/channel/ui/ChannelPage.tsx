'use client'

import { useAuth } from '@/features/auth'
import { ChannelProfileSection } from '@/widgets/main/channelProfile'
import { KpiSection } from '@/widgets/channel/Kpi'
import { SubscriberGrowthSection } from '@/widgets/channel/SubscriberGrowth'
import { ChannelTrendingVideoSection } from '@/widgets/channelDashboard/channelTrendingVideo'
import { NewInflowSection } from '@/widgets/channelDashboard/newInflow'

export function ChannelPage() {
  const { user } = useAuth()
  const id = user?.userDetails.id ?? ''

  return (
    <div className='flex flex-col gap-y-24 bg-background-gray-default'>
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
      {/* 영상 성과 테이블 */}
      <div className='px-24'>
        <ChannelTrendingVideoSection channelId={id} />
      </div>
      {/* 신규 유입 비율 TOP5 */}
      <div className='px-24'>
        <NewInflowSection channelId={id} />
      </div>
    </div>
  )
}
