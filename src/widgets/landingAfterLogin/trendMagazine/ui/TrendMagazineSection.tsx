import Link from 'next/link'

import { Skeleton } from '@/shared/ui/shadcn/skeleton'
import { MagazineCard } from '@/entities/landingAfterLogin/magazineCard'
import {
  useTrendMagazine,
  mockTrendMagazines,
} from '@/features/landingAfterLogin/trendMagazine'
import { formatMonthAndWeek } from '@/shared/lib/format'

interface TrendMagazineSectionProps {
  channelId: string
}

export function TrendMagazineSection({ channelId }: TrendMagazineSectionProps) {
  const { data, isLoading } = useTrendMagazine(channelId)
  const magazines = data?.length ? data : mockTrendMagazines

  //현재 월 + 몇 주차인지
  const now = new Date().toDateString()
  const { month, weekNumber } = formatMonthAndWeek(now)

  return (
    /* 트렌드 매거진을 모아서 보여주는 섹션 */
    <section className='flex h-fit w-full flex-col gap-16'>
      {/* 트렌드 매거진 헤더 */}
      <div className='flex h-fit w-full flex-col items-start justify-between gap-3'>
        <h3 className='text-ibm-title-lg-normal text-text-and-icon-default'>
          {`${month}월 ${weekNumber}주차 트렌드 매거진`}
        </h3>

        {/* 서브텍스트 + 더보기 */}
        <div className='flex h-fit w-full justify-between'>
          <p className='text-noto-title-sm-thin text-text-and-icon-tertiary'>
            매주 월요일 업데이트 되는 AI 추천 매거진
          </p>
          <Link
            href={`/me/${channelId}/videos`}
            className='size-fit gap-10 pt-1 pr-2 pb-3 pl-2 text-noto-label-sm-bold text-brand-primary hover:underline'>
            더보기
          </Link>
        </div>
      </div>

      {/* 매거진 리스트 */}
      {isLoading ? (
        <div className='grid h-fit w-full grid-cols-3 gap-24'>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className='h-48' />
          ))}
        </div>
      ) : (
        <div className='grid h-fit w-full grid-cols-3 gap-24'>
          {magazines.map((magazine) => (
            <MagazineCard key={magazine.id} {...magazine} />
          ))}
        </div>
      )}
    </section>
  )
}
