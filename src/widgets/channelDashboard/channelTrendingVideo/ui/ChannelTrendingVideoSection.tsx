import { ChannelTrendingVideo } from '@/entities/channelDashboard/channelTrendingVideo'
import {
  ChannelContentType,
  FilterOption,
} from '@/features/channelDashboard/channelContentType'
import { useChannelTrendingVideo } from '@/features/channelDashboard/channelTrendingVideo/model/useChannelTrendingVideo'
import IconRising from '@/shared/assets/rising-bold.svg'
import { Skeleton } from '@/shared/ui/shadcn/skeleton'
import { useState } from 'react'

export function ChannelTrendingVideoSection({
  channelId,
}: {
  channelId: string
}) {
  const [active, setActive] = useState<FilterOption>('롱폼')
  const { data, isFetching } = useChannelTrendingVideo(channelId, active)

  if (isFetching) {
    return (
      <div className='flex flex-col gap-24 rounded-16 bg-white p-24 shadow-[0_2px_6px_0_rgba(13,13,13,0.04)]'>
        <div className='flex h-fit w-full items-end justify-between'>
          <div className='flex h-fit w-fit items-start gap-8'>
            <span className='rounded-full bg-background-brand-default p-4'>
              <IconRising className='size-24 text-(--comp-button-primary-text-disabled)' />
            </span>
            <div className='flex flex-col gap-4'>
              <span className='text-ibm-title-md-normal'>
                시청자 반응 급상승 영상
              </span>
              <span className='text-noto-body-xxs-normal text-text-and-icon-tertiary'>
                조회수 대비 참여율 (좋아요, 댓글)이 높은 영상이에요
              </span>
            </div>
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
      <div className='flex h-fit w-full items-end justify-between'>
        <div className='flex h-fit w-fit items-start gap-8'>
          <span className='rounded-full bg-background-brand-default p-4'>
            <IconRising className='size-24 text-(--comp-button-primary-text-disabled)' />
          </span>
          <div className='flex flex-col gap-4'>
            <span className='text-ibm-title-md-normal'>
              시청자 반응 급상승 영상
            </span>
            <span className='text-noto-body-xxs-normal text-text-and-icon-tertiary'>
              조회수 대비 참여율 (좋아요, 댓글)이 높은 영상이에요
            </span>
          </div>
        </div>
        <ChannelContentType active={active} onActiveChange={setActive} />
      </div>
      <div className='h-fit w-full'>
        <ChannelTrendingVideo data={data ?? []} />
      </div>
    </div>
  )
}
