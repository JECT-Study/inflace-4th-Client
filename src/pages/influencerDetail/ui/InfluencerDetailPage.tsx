'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import {
  useInfluencerBrandAnalysis,
  type AdvertisementFilterQueryParams,
} from '@/features/influencerDetail'
import { TAB, Tab, TabGroup } from '@/features/influencerDetail/tabGroup'
import { ChannelSummarySection } from '@/widgets/influencerDetail/channelSummary'
import { EngagementAnalyticsSection } from '@/widgets/influencerDetail/engagementAnalytics'
import { ImpactMetricsSection } from '@/widgets/influencerDetail/impactMetrics'
import { InfluencerBaseInfo } from '@/widgets/influencerDetail/influencerBaseInfo'
import { AdvertisementFilter } from '@/widgets/influencerDetail/advertisementFilter'
import { AdvertisementMetricsSection } from '@/widgets/influencerDetail/advertisementMetrics'
import { AdvertisementList } from '@/features/influencerDetail/advertisementList'

/* 인플루언서 디테일 기본화면 */
export function InfluencerDetailPage() {
  const params = useParams<{ channelId: string }>()
  const channelId = params?.channelId

<<<<<<< HEAD
  // 현재 활성화된 탭 (성과/광고)
  const [activeTab, setActiveTab] = useState<Tab>(TAB.ADVERTISEMENT)

  // 광고 필터 검색 버튼 클릭 시 필터 값
  const [committedFilter, setCommittedFilter] =
    useState<AdvertisementFilterQueryParams | null>(null)

  const { data: brandAnalysisData, isLoading: isBrandAnalysisLoading } =
    useInfluencerBrandAnalysis(channelId ?? '', committedFilter)
=======
  const [activeTab, setActiveTab] = useState<Tab>(TAB.PERFORMANCE)

  const [committedFilter, setCommittedFilter] =
    useState<AdvertisementFilterQueryParams | null>(null)

  const { data: brandAnalysisData } = useInfluencerBrandAnalysis(
    channelId ?? '',
    committedFilter
  )
>>>>>>> upstream/develop

  if (!channelId) return null

  return (
    <div className='flex w-full flex-col gap-24 bg-background-gray-default p-24 pb-96'>
      {/* 인플루언서 채널 정보 영역 */}
      <InfluencerBaseInfo channelId={channelId} />
      {/* 성과 / 광고 탭 영역 */}
      <TabGroup activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 성과 탭 선택 시 */}
      {activeTab === TAB.PERFORMANCE && (
        <>
          {/* 채널 요약 영역 */}
          <ChannelSummarySection channelId={channelId} />
          {/* 임팩트 지표 영역 */}
          <ImpactMetricsSection channelId={channelId} />
          {/* 롱폼 vs 숏폼 참여율 분석 영역 */}
          <EngagementAnalyticsSection channelId={channelId} />
        </>
      )}

      {/* 광고 탭 선택 시 */}
      {activeTab === TAB.ADVERTISEMENT && (
        <>
          {/* 광고 검색 영역 */}
          <AdvertisementFilter onSearch={setCommittedFilter} />
          {/* 검색 후 노출 영역 */}
          {committedFilter !== null && (
            <>
              {/* 광고 지표 분석 영역 */}
<<<<<<< HEAD
              <AdvertisementMetricsSection
                data={brandAnalysisData}
                isLoading={isBrandAnalysisLoading}
              />
=======
              {brandAnalysisData && <AdvertisementMetricsSection />}
>>>>>>> upstream/develop
              {/* 검색 결과 영역 */}
              <AdvertisementList />
            </>
          )}
        </>
      )}
    </div>
  )
}
