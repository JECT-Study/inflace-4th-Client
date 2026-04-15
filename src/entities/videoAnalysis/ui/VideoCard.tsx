import Image from 'next/image'

import {
  formatMonthAgo,
  format10Thousands,
  formatThousands,
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
  thumbnailUrl,
  title,
  viewCount,
  likeCount,
  commentCount,
  publishedAt,
  vph,
  outLierScore,
}: VideoCardItem) {
  return (
    <div className='flex h-fit w-full max-w-133 min-w-86.5 flex-col gap-10'>
      {/* 썸네일 */}
      <div
        className='relative w-full overflow-hidden rounded-4'
        style={{ aspectRatio: '16 / 9' }}>
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          sizes='(max-width: 768px) 50vw, 25vw'
          className='object-cover'
        />
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
    </div>
  )
}
