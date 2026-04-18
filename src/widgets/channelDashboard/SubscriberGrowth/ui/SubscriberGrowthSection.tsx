'use client'

import { useState } from 'react'
import { SubscriberGrowthChart } from '@/entities/channelDashboard/channelSubscriberGrowth'
import {
  SubscribersChartFilter,
  useSubscriberGrowth,
  FILTER_TO_RANGE,
} from '@/features/channelDashboard/subscriberGrowth'
import type { FilterOption } from '@/features/channelDashboard/subscriberGrowth'
import IconUser from '@/shared/assets/users-bold.svg'
import { Skeleton } from '@/shared/ui/shadcn/skeleton'

export function SubscriberGrowthSection({ channelId }: { channelId: string }) {
  const [active, setActive] = useState<FilterOption>('1주일')
  const { data, isLoading } = useSubscriberGrowth(
    channelId,
    FILTER_TO_RANGE[active]
  )

  if (isLoading) {
    return (
      //스켈레톤 UI, 로딩중일 때 상태를 표시합니다.
      <div className='flex flex-col gap-24 rounded-16 bg-white p-24 shadow-[0_2px_6px_0_rgba(13,13,13,0.04)]'>
        <div className='flex h-fit w-full items-center justify-between'>
          <div className='flex h-fit w-fit gap-8'>
            <span className='rounded-full bg-background-brand-default p-4'>
              <IconUser className='size-24 text-(--comp-button-primary-text-disabled)' />
            </span>
            <span className='text-ibm-title-md-normal'>구독자 추이</span>
          </div>
        </div>
        <Skeleton className='h-102.5 w-full'></Skeleton>
      </div>
    )
  }
  return (
    <div className='flex flex-col gap-24 rounded-16 bg-white p-24 shadow-[0_2px_6px_0_rgba(13,13,13,0.04)]'>
      <div className='flex h-fit w-full items-center justify-between'>
        <div className='flex h-fit w-fit gap-8'>
          <span className='rounded-full bg-background-brand-default p-4'>
            <IconUser className='size-24 text-(--comp-button-primary-text-disabled)' />
          </span>
          <span className='text-ibm-title-md-normal'>구독자 추이</span>
        </div>
        <SubscribersChartFilter active={active} onActiveChange={setActive} />
      </div>
      <div className='flex h-fit w-full flex-col gap-16'>
        <span className='text-noto-body-xxs-bold text-text-and-icon-primary'>
          구독자 수
        </span>
        <SubscriberGrowthChart points={data?.points ?? []} />
      </div>
    </div>
  )
}
