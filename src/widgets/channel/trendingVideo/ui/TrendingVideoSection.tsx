import { TrendingVideo } from '@/entities/channel/trendingVideo'
import { ContentType } from '@/features/channel/contentType'
import { useTrendingVideo } from '@/features/channel/trendingVideo'
import IconRising from '@/shared/assets/rising-bold.svg'
import { Skeleton } from '@/shared/ui/shadcn/skeleton'
import { useState } from 'react'

export function TrendingVideoSection({ channelId }: { channelId: string }) {
  const [isShort, setIsShort] = useState(false)
  const { data, isFetching, isError } = useTrendingVideo(channelId, isShort)

  if (isFetching || isError) {
    return (
      <div className='flex flex-col gap-24 rounded-16 bg-white p-24 shadow-[0_2px_6px_0_rgba(13,13,13,0.04)]'>
        <div className='flex h-fit w-full items-end justify-between'>
          <div className='flex h-fit w-fit items-start gap-8'>
            <span className='rounded-full bg-background-brand-default p-4'>
              <IconRising className='size-24 text-btn-primary-text-disabled' />
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
            <IconRising className='size-24 text-btn-primary-text-disabled' />
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
        <ContentType isShort={isShort} onIsShortChange={setIsShort} />
      </div>
      <div className='h-fit w-full'>
        <TrendingVideo data={data ?? []} />
      </div>
    </div>
  )
}
