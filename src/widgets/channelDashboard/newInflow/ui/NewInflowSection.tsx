import { NewInflow } from '@/entities/channelDashboard/newInflow'
import {
  ChannelContentType,
  FilterOption,
} from '@/features/channelDashboard/channelContentType'
import { useNewInflow } from '@/features/channelDashboard/newInflow'
import IconNewEye from '@/shared/assets/newEye-bold.svg'
import { Skeleton } from '@/shared/ui/shadcn/skeleton'
import { useState } from 'react'

export function NewInflowSection({ channelId }: { channelId: string }) {
  const [active, setActive] = useState<FilterOption>('롱폼')
  const { data, isFetching } = useNewInflow(channelId, active)

  if (isFetching) {
    return (
      <div className='flex flex-col gap-24 rounded-16 bg-white p-24 shadow-[0_2px_6px_0_rgba(13,13,13,0.04)]'>
        <div className='flex h-fit w-full items-center justify-between'>
          <div className='flex h-fit w-fit items-center gap-8'>
            <span className='rounded-full bg-background-brand-default p-4'>
              <IconNewEye className='size-24 text-(--comp-button-primary-text-disabled)' />
            </span>
            <span className='text-ibm-title-md-normal'>
              신규 유입 비율 TOP 5
            </span>
          </div>
        </div>
        <div className='h-fit w-full'>
          <Skeleton className='h-[58.4rem] w-full' />
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-24 rounded-16 bg-white p-24 shadow-[0_2px_6px_0_rgba(13,13,13,0.04)]'>
      <div className='flex h-fit w-full items-center justify-between'>
        <div className='flex h-fit w-fit items-center gap-8'>
          <span className='rounded-full bg-background-brand-default p-4'>
            <IconNewEye className='size-24 text-(--comp-button-primary-text-disabled)' />
          </span>
          <span className='text-ibm-title-md-normal'>신규 유입 비율 TOP 5</span>
        </div>
        <ChannelContentType active={active} onActiveChange={setActive} />
      </div>
      <div className='h-fit w-full'>
        <NewInflow data={data ?? []} />
      </div>
    </div>
  )
}
