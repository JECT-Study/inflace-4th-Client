'use client'

import {
  DistributionChart,
  GenderChart,
  SubscriberChart,
} from '@/entities/channel/subscriberDistribution'
import { ContentType } from '@/features/channel/contentType'
import {
  useSubscriberChart,
  useDistributionChart,
} from '@/features/channel/subscriberDistribution'

import IconUsers from '@/shared/assets/users-bold.svg'
import { Skeleton } from '@/shared/ui/shadcn/skeleton'

export function SubscriberDemographicsSection({ channelId }: { channelId: string }) {
  // 기존 / 신규 구독자
  const {
    data: subscriberData, isFetching: isSubscriberFetching, isError: isSubscriberError } = useSubscriberChart(channelId)
  // 성별, 국가, 연령
  const {
    data: distributionData,
    filter,
    setFilter,
    isFetching: isDistributionFetching,
    isError: isDistributionError
  } = useDistributionChart(channelId)

  const isFetching = isSubscriberFetching || isDistributionFetching
  const isError = isSubscriberError || isDistributionError

  const distributionChartData =
    filter === 'countries'
      ? (distributionData?.country ?? [])
      : (distributionData?.age ?? [])

  if (isFetching || isError) {
    return (
      <div className='flex flex-1 flex-col gap-32 rounded-16 bg-white p-24 shadow-[0_2px_6px_0_rgba(13,13,13,0.04)]'>
        <div className='flex h-fit w-full items-center justify-between'>
          <div className='flex h-fit w-fit items-center gap-8'>
            <span className='rounded-full bg-background-brand-default p-4'>
              <IconUsers className='size-24 text-btn-primary-text-disabled' />
            </span>
            <span className='text-ibm-title-md-normal'>구독자 분포</span>
          </div>
        </div>
        <div className='flex h-fit w-full flex-col justify-center gap-32'>
          <Skeleton className='h-[71.2rem] w-full' />
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-1 flex-col gap-32 rounded-16 bg-white p-24 shadow-[0_2px_6px_0_rgba(13,13,13,0.04)]'>
      <div className='flex h-fit w-full items-center justify-between'>
        <div className='flex h-fit w-fit items-center gap-8'>
          <span className='rounded-full bg-background-brand-default p-4'>
            <IconUsers className='size-24 text-btn-primary-text-disabled' />
          </span>
          <span className='text-ibm-title-md-normal'>구독자 분포</span>
        </div>
      </div>
      <div className='flex h-fit w-full flex-col justify-center gap-32'>
        <div className='flex justify-center gap-80'>
          {/* 기존 / 신규 구독자 Pie Chart */}
          <SubscriberChart data={subscriberData ?? { count: 0, ratio: 0 }} />
          {/* 여성 / 남성 평균 Pie Chart */}
          <GenderChart data={distributionData?.gender ?? []} />
        </div>
        <div className='flex flex-col gap-24'>
          {/* 국가별 / 연령별 filter 선택 */}
          <ContentType
            className='w-full justify-end'
            options={[
              { label: '국가별', filter: 'countries' },
              { label: '연령별', filter: 'ages' },
            ]}
            filter={filter}
            onFilterChange={setFilter}
          />
          {/* 국가별 / 연령별 Bar Chart */}
          <DistributionChart data={distributionChartData} type={filter} />
        </div>
      </div>
    </div>
  )
}
