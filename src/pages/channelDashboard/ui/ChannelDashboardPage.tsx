'use client'

import { useParams } from 'next/navigation'
import { ChannelProfileSection } from '@/widgets/landingAfterLogin/channelProfile'
import { ChannelKpiSection } from '@/widgets/channelDashboard/channelKpi'
import { SubscriberGrowthSection } from '@/widgets/channelDashboard/SubscriberGrowth'
import { ChannelTrendingVideoSection } from '@/widgets/channelDashboard/channelTrendingVideo'
import { NewInflowSection } from '@/widgets/channelDashboard/newInflow'

export function ChannelDashboardPage() {
  const params = useParams<{ id: string }>()
  const id = params!.id

  return (
    <div className='flex flex-col gap-y-24 bg-background-gray-default'>
      {/* 프로필 카드 */}
      <ChannelProfileSection
        channelId={id}
        isExpanded={true}
        variant='dashboard'
      />
      {/* 핵심 지표 카드 */}
      <div className='px-24'>
        <ChannelKpiSection channelId={id} />
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
