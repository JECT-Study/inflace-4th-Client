'use client'

import { useAuth } from '@/features/auth'
import { ChannelProfileSection } from '@/widgets/main/channelProfile'
import { KpiSection } from '@/widgets/channel/kpi'
import { SubscriberGrowthSection } from '@/widgets/channel/SubscriberGrowth'
import { TrendingVideoSection } from '@/widgets/channel/trendingVideo'
import { NewInflowSection } from '@/widgets/channel/newInflow'

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
        <TrendingVideoSection channelId={id} />

        {/* 신규 유입 비율 TOP5 */}
        <NewInflowSection channelId={id} />
      </div>
    </div>
  )
}
