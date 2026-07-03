import Image from 'next/image'
import Link from 'next/link'

import {
  formatMonthAgo,
  format10Thousands,
  formatThousands,
  formatDuration,
  formatPercent,
  formatDecimal,
} from '@/shared/lib/format'
import { Tooltip } from '@/shared/ui/tooltip'
import type { VideoCardItem } from '../model/types'

/* assets */
import Eye from '@/shared/assets/eye-thin.svg'
import Like from '@/shared/assets/like-thin.svg'
import Comment from '@/shared/assets/comment-thin.svg'
import Clock from '@/shared/assets/clock-thin.svg'
import Vph from '@/shared/assets/vph-thin.svg'
import Outlier from '@/shared/assets/outlier-thin.svg'

export function VideoCard({
  videoId,
  thumbnailUrl,
  title,
  viewCount,
  likeCount,
  commentCount,
  publishedAt,
  vph,
  outlierScore,
  durationSeconds,
  isAd,
}: VideoCardItem) {
  return (
    <Link
      href={`/videos/${videoId}`}
      className='flex h-fit w-full max-w-[53.2rem] min-w-[34.6rem] flex-col gap-10'>
      {/* 썸네일 */}
      <div className='relative aspect-video w-full overflow-hidden rounded-4'>
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          sizes='(max-width: 768px) 50vw, 25vw'
          className='object-cover'
        />
        {/* 광고 */}
        {isAd && (
          /* TODO: bg 디자인 토큰 반영 */
          <span className='absolute top-8 right-6 size-fit gap-10 rounded-4 bg-primitive-brand-clear-200 px-12 py-4 text-noto-caption-sm-bold text-text-and-icon-secondary'>
            AD
          </span>
        )}
        {/* 영상 길이 */}
        <span className='absolute right-6 bottom-6 size-fit gap-10 rounded-4 bg-black/80 px-6 py-2 text-noto-label-xs-thin text-white'>
          {formatDuration(durationSeconds)}
        </span>
      </div>

      {/* 카드 하단 정보 */}
      <div className='flex h-fit w-full flex-col gap-8'>
        {/* 영상 제목 */}
        <p className='line-clamp-2 text-noto-title-sm-normal text-text-and-icon-default'>
          {title}
        </p>

        {/* 상세 정보 */}
        <div className='flex h-fit w-full flex-col gap-4'>
          {/* 조회수, 좋아요, 댓글, 업로드일 */}
          <div className='flex h-fit w-full gap-4'>
            {[
              { key: 'view', Icon: Eye, label: format10Thousands(viewCount) },
              { key: 'like', Icon: Like, label: format10Thousands(likeCount) },
              {
                key: 'comment',
                Icon: Comment,
                label: formatThousands(commentCount),
              },
              {
                key: 'publishedAt',
                Icon: Clock,
                label: formatMonthAgo(publishedAt),
              },
            ].map(({ key, Icon, label }) => (
              <span
                key={key}
                className='flex items-center gap-4 rounded-4 bg-background-gray-stronger px-6 py-4 text-noto-caption-lg-bold text-text-and-icon-secondary'>
                <Icon className='size-16' />
                {label}
              </span>
            ))}
          </div>

          {/* VPH / OutLier Score 배지 */}
          <div className='flex h-fit w-full gap-4'>
            {[
              {
                key: 'vph',
                Icon: Vph,
                label: `시간당 ${formatDecimal(vph)}회`,
                tooltip: '총 조회수 / 업로드 후 경과 시간',
              },
              {
                key: 'outlier',
                Icon: Outlier,
                label: `평균 조회수 ${formatPercent(outlierScore)}배`,
                tooltip: '증가한 조회수 / 채널 평균 조회수',
              },
            ].map(({ key, Icon, label, tooltip }) => (
              <Tooltip key={key} label={tooltip} side='right'>
                <span className='flex items-center gap-4 rounded-4 bg-background-gray-stronger px-6 py-4 text-noto-caption-lg-bold text-brand-primary'>
                  <Icon className='size-16' />
                  {label}
                </span>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
