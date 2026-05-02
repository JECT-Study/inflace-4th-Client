'use client'

import {
  TypeEngagementChart,
  TypeEngagementList,
} from '@/entities/channel/typeEngagement'
import { useTypeEngagement } from '@/features/channel/typeEngagement'
import IconParticipation from '@/shared/assets/participation-bold.svg'
import { Skeleton } from '@/shared/ui/shadcn/skeleton'

export function TypeEngagementSection({ channelId }: { channelId: string }) {
  const { data, isFetching, isError } = useTypeEngagement(channelId)

  if (isFetching || isError) {
    return (
      <div className='flex flex-1 flex-col gap-32 rounded-16 bg-white p-24 shadow-[0_2px_6px_0_rgba(13,13,13,0.04)]'>
        <div className='flex h-fit w-full items-center justify-between'>
          <div className='flex h-fit w-fit items-center gap-8'>
            <span className='rounded-full bg-background-brand-default p-4'>
              <IconParticipation className='size-24 text-btn-primary-text-disabled' />
            </span>
            <span className='text-ibm-title-md-normal'>
              롱폼 / 숏폼 평균 참여율 차트 TOP5
            </span>
          </div>
        </div>
        <div className='flex h-fit w-full flex-col justify-center gap-32'>
          <Skeleton className='h-[77.6rem] w-full' />
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-1 flex-col gap-32 rounded-16 bg-white p-24 shadow-[0_2px_6px_0_rgba(13,13,13,0.04)]'>
      <div className='flex h-fit w-full items-center justify-between'>
        <div className='flex h-fit w-fit items-center gap-8'>
          <span className='rounded-full bg-background-brand-default p-4'>
            <IconParticipation className='size-24 text-btn-primary-text-disabled' />
          </span>
          <span className='text-ibm-title-md-normal'>
            롱폼 / 숏폼 평균 참여율 차트 TOP5
          </span>
        </div>
      </div>
      <div className='flex h-fit w-full flex-col justify-center gap-32'>
        {/* 롱폼 / 숏폼 평균 Pie Chart */}
        <TypeEngagementChart
          data={
            data?.summary ?? {
              longFormEngagementRate: 0,
              shortFormEngagementRate: 0,
            }
          }
        />
        {/* 롱폼 / 숏폼 평균 Table */}
        <TypeEngagementList data={data?.videos ?? []} />
      </div>
    </div>
  )
}
