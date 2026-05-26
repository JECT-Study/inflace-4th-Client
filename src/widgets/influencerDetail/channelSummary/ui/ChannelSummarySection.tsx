'use client'

import { mockInfluencerSummary } from '@/entities/influencerDetail'
import { useInfluencerSummary } from '@/features/influencerDetail'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/shared/ui/button'
import { Skeleton } from '@/shared/ui/shadcn/skeleton'
import IconArticle from '@/shared/assets/article-bold.svg'
import IconRefresh from '@/shared/assets/refresh-bold.svg'

export function ChannelSummarySection({ channelId }: { channelId: string }) {
  const { data: apiData, isLoading, isError } = useInfluencerSummary(channelId)
  const data = apiData ?? mockInfluencerSummary

  const queryClient = useQueryClient()

  if (isLoading) {
    return (
      <div className='flex flex-col gap-32 rounded-12 bg-white p-24 pb-32'>
        {/* 아이콘 + 타이틀 */}
        <div className='flex h-fit w-fit items-center gap-12'>
          <span className='bg-background-brand-default rounded-12 p-4'>
            <IconArticle className='size-24 text-btn-primary-text-disabled' />
          </span>
          <span className='text-ibm-title-md-normal text-text-and-icon-default'>
            채널요약
          </span>
        </div>
        {/* 채널 요약 텍스트 */}
        <Skeleton className='h-[5.2rem] w-full' />
      </div>
    )
  }

  if (isError) {
    return (
      <div className='flex flex-col gap-32 rounded-12 bg-white p-24 pb-48'>
        {/* 아이콘 + 타이틀 */}
        <div className='flex h-fit w-fit items-center gap-12'>
          <span className='bg-background-brand-default rounded-12 p-4'>
            <IconArticle className='size-24 text-btn-primary-text-disabled' />
          </span>
          <span className='text-ibm-title-md-normal text-text-and-icon-default'>
            채널요약
          </span>
        </div>
        {/* 채널 요약 텍스트 */}
        <div className='flex w-full flex-col items-center gap-20'>
          <p className='text-noto-body-lg-normal text-text-and-icon-secondary'>
            채널 데이터가 부족합니다
          </p>
          <Button
            color='secondary'
            size='md'
            variant='outlined'
            leftIcon={<IconRefresh />}
            onClick={() =>
              queryClient.invalidateQueries({
                queryKey: ['influencerSummary'],
              })
            }>
            재시도
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-32 rounded-12 bg-white p-24 pb-32'>
      {/* 아이콘 + 타이틀 */}
      <div className='flex h-fit w-fit items-center gap-12'>
        <span className='bg-background-brand-default rounded-12 p-4'>
          <IconArticle className='size-24 text-btn-primary-text-disabled' />
        </span>
        <span className='text-ibm-title-md-normal text-text-and-icon-default'>
          채널요약
        </span>
      </div>
      {/* 채널 요약 텍스트 */}
      <p className='text-noto-body-lg-normal break-words break-keep text-text-and-icon-secondary'>
        {data.summary}
      </p>
    </div>
  )
}
