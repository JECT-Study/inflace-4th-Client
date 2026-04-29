import Image from 'next/image'
import Link from 'next/link'

import {
  formatMonthAgo,
  format10Thousands,
  formatThousands,
  formatDuration,
} from '@/shared/lib/format'
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
  outLierScore,
  duration,
  isShort,
  isAd,
}: VideoCardItem) {
  const typeLabel = isShort ? '숏폼' : '롱폼'

  return (
    <Link href={`/videos/${videoId}`} className='flex h-fit w-full max-w-[53.2rem] min-w-[34.6rem] flex-col gap-10'>
      {/* 썸네일 */}
      <div className='relative aspect-video w-full overflow-hidden rounded-4'>
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          sizes='(max-width: 768px) 50vw, 25vw'
          className='object-cover'
        />
        {/* 광고 / 숏폼&롱폼 */}
        <div className='absolute top-0 right-0 flex size-fit'>
          {isAd && (
            /* TODO: bg 디자인 토큰 반영 */
            <span className='size-fit gap-10 rounded-bl-4 bg-[#D5E3FF] px-12 py-6 text-noto-caption-sm-bold text-text-and-icon-secondary'>
              광고
            </span>
          )}
          <span
            className={`size-fit gap-10 bg-brand-secondary px-12 py-6 text-noto-caption-sm-bold text-white ${!isAd ? 'rounded-bl-4' : ''}`}>
            {typeLabel}
          </span>
        </div>
        {/* 영상 길이 */}
        <span className='absolute right-6 bottom-6 size-fit gap-10 rounded-4 bg-black/80 px-6 py-2 text-noto-label-xs-thin text-white'>
          {formatDuration(duration)}
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
              { Icon: Eye, label: format10Thousands(viewCount) },
              { Icon: Like, label: format10Thousands(likeCount) },
              { Icon: Comment, label: formatThousands(commentCount) },
              { Icon: Clock, label: formatMonthAgo(publishedAt) },
            ].map(({ Icon, label }) => (
              <span
                key={label}
                className='flex items-center gap-4 rounded-4 bg-background-gray-stronger px-6 py-4 text-noto-caption-lg-bold text-text-and-icon-secondary'>
                <Icon className='size-16' />
                {label}
              </span>
            ))}
          </div>

          {/* VPH / OutLier Score 배지 */}
          <div className='flex h-fit w-full gap-4'>
            {[
              { Icon: Vph, label: `${vph} VPH` },
              { Icon: Outlier, label: `${outLierScore} %` },
            ].map(({ Icon, label }) => (
              <span
                key={label}
                className='flex items-center gap-4 rounded-4 bg-background-gray-stronger px-6 py-4 text-noto-caption-lg-bold text-brand-primary'>
                <Icon className='size-16' />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
