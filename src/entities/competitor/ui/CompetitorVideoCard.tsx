'use client'

import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/shared/lib/utils'
import {
  format10Thousands,
  formatThousands,
  formatDate,
} from '@/shared/lib/format'
import { Button } from '@/shared/ui/button'
import type { CompetitorVideoCardItem } from '../model/types'

import IconEye from '@/shared/assets/eye-thin.svg'
import IconLike from '@/shared/assets/like-thin.svg'
import IconComment from '@/shared/assets/comment-thin.svg'
import IconClock from '@/shared/assets/clock-thin.svg'
import IconCheck from '@/shared/assets/check-bold.svg'
import IconArrowRight from '@/shared/assets/rightwards-arrow-bold.svg'

interface CompetitorVideoCardProps {
  video: CompetitorVideoCardItem
  selected: boolean
  onToggle: (videoId: string) => void
}

export function CompetitorVideoCard({
  video,
  selected,
  onToggle,
}: CompetitorVideoCardProps) {
  const {
    videoId,
    videoTitle,
    videoThumbnailUrl,
    publishedAt,
    viewCount,
    likeCount,
    commentCount,
    channelId,
    channelName,
    channelThumbnailUrl,
  } = video

  const { year, month, day } = formatDate(publishedAt)
  const publishedLabel = `${year}-${month}-${day}`

  function handleCardClick() {
    onToggle(videoId)
  }

  function handleCardKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onToggle(videoId)
    }
  }

  return (
    <div
      role='button'
      tabIndex={0}
      aria-pressed={selected}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      className={cn(
        'flex w-full cursor-pointer flex-col overflow-hidden rounded-6 border bg-white text-left transition-colors',
        selected
          ? 'border-brand-primary ring-1 ring-brand-primary'
          : 'border-stroke-border-gray-stronger'
      )}>
      {/* 썸네일 영역 */}
      <div className='relative aspect-[16/8] w-full overflow-hidden bg-background-gray-stronger'>
        <Image
          src={videoThumbnailUrl}
          alt={videoTitle}
          fill
          sizes='(max-width: 1280px) 50vw, 33vw'
          className='object-cover'
        />

        {/* 상단 dimmed gradient (체크박스/AD 배지 가독성용) */}
        <div className='pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-black/40 to-transparent' />

        {/* AD 배지 — TODO: 백엔드 응답에 isPaidPromotion 필드 추가되면 분기 적용 */}
        <span className='absolute top-16 left-16 rounded-4 bg-[#D5E3FF] px-12 py-4 text-noto-caption-sm-bold text-text-and-icon-primary'>
          AD
        </span>

        {/* 체크박스 */}
        <span
          aria-hidden='true'
          className={cn(
            'absolute top-16 right-16 flex size-32 items-center justify-center rounded-6 border-2 transition-colors',
            selected
              ? 'border-brand-primary bg-brand-primary'
              : 'border-brand-primary/60 bg-white'
          )}>
          {selected && <IconCheck className='size-16 text-white' />}
        </span>
      </div>

      {/* 정보 영역 */}
      <div className='flex w-full flex-col gap-16 px-24 pt-16 pb-24'>
        {/* 제목 + 스탯 */}
        <div className='flex flex-col gap-8'>
          <p className='line-clamp-2 text-noto-title-sm-normal text-text-and-icon-default'>
            {videoTitle}
          </p>
          <div className='flex flex-wrap items-center gap-12'>
            <StatChip icon={IconEye} label={format10Thousands(viewCount)} />
            <StatChip icon={IconLike} label={format10Thousands(likeCount)} />
            <StatChip
              icon={IconComment}
              label={formatThousands(commentCount)}
            />
            <StatChip icon={IconClock} label={publishedLabel} />
          </div>
        </div>

        <div className='h-px w-full bg-stroke-border-gray-default' />

        {/* 채널 정보 + CTA */}
        <div className='flex items-center gap-24'>
          <div className='flex min-w-0 flex-1 items-center gap-12'>
            <div className='relative size-32 shrink-0 overflow-hidden rounded-full bg-background-gray-stronger'>
              {channelThumbnailUrl && (
                <Image
                  src={channelThumbnailUrl}
                  alt={channelName}
                  fill
                  sizes='32px'
                  className='object-cover'
                />
              )}
            </div>
            <span className='truncate text-noto-label-md-normal text-text-and-icon-secondary'>
              {channelName}
            </span>
          </div>

          <Link
            href={`/channel/${channelId}`}
            onClick={(e) => e.stopPropagation()}
            className='shrink-0'>
            <Button
              type='button'
              color='gray'
              variant='filled'
              size='sm'
              rightIcon={<IconArrowRight />}>
              개별 채널 분석보기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

function StatChip({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <span className='flex items-center gap-4 py-4 text-noto-caption-lg-bold text-text-and-icon-secondary'>
      <Icon className='size-16' />
      {label}
    </span>
  )
}
