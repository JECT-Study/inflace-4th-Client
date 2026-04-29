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
    <div className='flex flex-col gap-24 bg-background-gray-default pb-96'>
      {/* 프로필 카드 */}
      <ChannelProfileSection
        channelId={id}
        isExpanded={true}
        variant='dashboard'
      />

      <div className='flex flex-col gap-24 px-24'>
        {/* 핵심 지표 카드 */}
        <KpiSection channelId={id} />

        {/* 구독자 추이 그래프 */}
        <SubscriberGrowthSection channelId={id} />

        {/* 영상 성과 테이블 */}
        <ChannelTrendingVideoSection channelId={id} />

        {/* 신규 유입 비율 TOP5 */}
        <NewInflowSection channelId={id} />
      </div>
    </div>
  )
}
