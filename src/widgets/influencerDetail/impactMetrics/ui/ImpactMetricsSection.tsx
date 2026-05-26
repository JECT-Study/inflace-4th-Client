'use client'

import axios from 'axios'
import {
  IMPACT_ITEM,
  ImpactMetricsCard,
  ImpactMetricsList,
  getImpactTier,
} from '@/entities/influencerDetail/impactMetrics'
import {
  mockInfluencerDetail,
  FrequencyTrend,
} from '@/entities/influencerDetail'
import { useInfluencerDetail } from '@/features/influencerDetail'
import IconChart from '@/shared/assets/chart-bold.svg'
import IconDown from '@/shared/assets/down-bold.svg'
import { cn } from '@/shared/lib/utils'
import { Skeleton } from '@/shared/ui/shadcn/skeleton'
import { useState } from 'react'

const frequencyTrendValue: Record<FrequencyTrend, string> = {
  INCREASING: '증가중',
  DECREASING: '감소중',
  STABLE: '유지중',
}

export function ImpactMetricsSection({ channelId }: { channelId: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const {
    data: apiData,
    isFetching,
    isError,
    error,
  } = useInfluencerDetail(channelId)

  // 에러 코드 CHANNEL_INSIGHT_400 분기처리
  const insightErrorCode =
    isError &&
    axios.isAxiosError(error) &&
    error.response?.data?.error?.code === 'CHANNEL_INSIGHT_400'

  const data = apiData ?? mockInfluencerDetail
  const { audience, content, activity, advertisement } = data

  if (isFetching || (isError && !insightErrorCode)) {
    return (
      <div className='flex flex-col gap-32 rounded-12 bg-white p-24 pb-32'>
        {/* 아이콘 + 타이틀 */}
        <div className='flex h-fit w-fit items-center gap-12'>
          <span className='bg-background-brand-default rounded-12 p-4'>
            <IconChart className='size-24 text-btn-primary-text-disabled' />
          </span>
          <span className='text-ibm-title-md-normal text-text-and-icon-default'>
            임팩트 지표
          </span>
        </div>

        {/* 임팩트 지표 카드 */}
        <div className='flex h-fit w-full gap-32'>
          <Skeleton className='h-[27.3rem] flex-1' />
          <Skeleton className='h-[27.3rem] flex-1' />
          <Skeleton className='h-[27.3rem] flex-1' />
          <Skeleton className='h-[27.3rem] flex-1' />
        </div>

        <div className='flex flex-col items-center gap-32'>
          {/* 기준표 영역 */}
          {isOpen && <ImpactMetricsList />}
          {/* 기준표 토글 버튼 */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className='flex items-center gap-8 text-noto-body-md-normal text-text-and-icon-tertiary'>
            {isOpen ? '뱃지 등급 기준표 닫기' : '뱃지 등급 기준표 보기'}
            <IconDown className={cn('size-20', isOpen ? 'rotate-180' : '')} />
          </button>
        </div>
      </div>
    )
  }

  // CHANNEL_INSIGHT_400 (채널 영상이 50개 이하인 경우)
  if (insightErrorCode) {
    return (
      <div className='flex flex-col gap-32 rounded-12 bg-white p-24 pb-32'>
        {/* 아이콘 + 타이틀 */}
        <div className='flex h-fit w-fit items-center gap-12'>
          <span className='bg-background-brand-default rounded-12 p-4'>
            <IconChart className='size-24 text-btn-primary-text-disabled' />
          </span>
          <span className='text-ibm-title-md-normal text-text-and-icon-default'>
            임팩트 지표
          </span>
        </div>

        {/* 에러 텍스트 */}
        <div className='flex h-[27.3rem] w-full items-center justify-center'>
          <p className='text-noto-body-lg-normal text-text-and-icon-secondary'>
            분석 가능한 공개 영상이 부족합니다
          </p>
        </div>

        <div className='flex flex-col items-center gap-32'>
          {/* 기준표 영역 */}
          {isOpen && <ImpactMetricsList />}
          {/* 기준표 토글 버튼 */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className='flex items-center gap-8 text-noto-body-md-normal text-text-and-icon-tertiary'>
            {isOpen ? '뱃지 등급 기준표 닫기' : '뱃지 등급 기준표 보기'}
            <IconDown className={cn('size-20', isOpen ? 'rotate-180' : '')} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-32 rounded-12 bg-white p-24 pb-32'>
      {/* 아이콘 + 타이틀 */}
      <div className='flex h-fit w-fit items-center gap-12'>
        <span className='bg-background-brand-default rounded-12 p-4'>
          <IconChart className='size-24 text-btn-primary-text-disabled' />
        </span>
        <span className='text-ibm-title-md-normal text-text-and-icon-default'>
          임팩트 지표
        </span>
      </div>

      {/* 임팩트 지표 카드 */}
      <div className='flex h-fit w-full gap-32'>
        {/* 팬층 뱃지 */}
        <ImpactMetricsCard
          title='팬층 뱃지'
          badge={IMPACT_ITEM[getImpactTier(audience.score)].fanbase}
          mainMetric={{
            label: '참여율',
            value: audience.engagementRate.toFixed(1),
            unit: '%',
          }}
          subMetrics={[
            {
              label: '좋아요 비율',
              value: audience.likeRate.toFixed(1),
              unit: '%',
            },
            {
              label: '댓글 비율',
              value: audience.commentRate.toFixed(1),
              unit: '%',
            },
            {
              label: '구독자 대비 조회',
              value: audience.viewsPerSubscriberRate.toFixed(1),
              unit: '%',
            },
          ]}
          variant='audience'
        />

        {/* 콘텐츠 뱃지 */}
        <ImpactMetricsCard
          title='콘텐츠 뱃지'
          badge={IMPACT_ITEM[getImpactTier(content.score)].content}
          mainMetric={{
            label: '2X 바이럴',
            value: content.viral2xRate.toFixed(0),
            unit: '%',
          }}
          subMetrics={[
            {
              label: '5X 바이럴',
              value: content.viral5xRate.toFixed(0),
              unit: '%',
            },
            {
              label: 'VPH 중앙값',
              value: content.medianVph.toFixed(0),
            },
            {
              label: '성장 추세',
              value: content.growthTrendRate.toFixed(0),
              unit: '%',
            },
          ]}
          variant='content'
        />

        {/* 활동 뱃지 */}
        <ImpactMetricsCard
          title='활동 뱃지'
          badge={IMPACT_ITEM[getImpactTier(activity.score)].activity}
          mainMetric={{
            label: '최근 업로드',
            value: activity.recentUpload,
            unit: '일 전',
          }}
          subMetrics={[
            {
              label: '업로드 주기',
              prefix: '주 ',
              value: activity.uploadCycle.toFixed(1),
              unit: '회',
            },
            {
              label: '빈도 변화',
              value: frequencyTrendValue[activity.frequencyTrend],
            },
          ]}
          variant='activity'
        />

        {/* 광고 뱃지 */}
        {advertisement ? (
          <ImpactMetricsCard
            title='광고 뱃지'
            badge={IMPACT_ITEM[getImpactTier(advertisement.score)].ad}
            mainMetric={{
              label: '협찬 비율',
              value: advertisement.score.toFixed(0),
              unit: '점',
            }}
            subMetrics={[
              {
                label: '조회수 안정성',
                prefix: 'CV ',
                value: advertisement.viewCoefficientOfVariation.toFixed(2),
              },
              {
                label: '구독 건강도',
                value: advertisement.subscriberHealthRate.toFixed(1),
                unit: '%',
              },
            ]}
            variant='advertisement'
          />
        ) : (
          <ImpactMetricsCard empty />
        )}
      </div>

      <div className='flex flex-col items-center gap-32'>
        {/* 기준표 영역 */}
        {isOpen && <ImpactMetricsList />}
        {/* 기준표 토글 버튼 */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className='flex items-center gap-8 text-noto-body-md-normal text-text-and-icon-tertiary'>
          {isOpen ? '뱃지 등급 기준표 닫기' : '뱃지 등급 기준표 보기'}
          <IconDown className={cn('size-20', isOpen ? 'rotate-180' : '')} />
        </button>
      </div>
    </div>
  )
}
