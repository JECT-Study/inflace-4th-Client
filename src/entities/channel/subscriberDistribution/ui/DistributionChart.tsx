'use client'

import { BaseBarChart } from '@/shared/ui/chart/barChart'
import { DistributionItem } from '../model/types'

export function DistributionChart({ data, type }: {
  data: DistributionItem[]
  type: string
}) {
  return (
    <div className='flex gap-24 px-8 pb-20'>
      {/* 순위 번호 + 항목 라벨 */}
      <div className='flex w-[22.6rem] shrink-0 flex-col gap-32'>
        {data.map((item, idx) => (
          <div
            className='flex h-24 w-full items-center gap-16 text-text-and-icon-primary'
            key={idx}>
            <span className='text-noto-body-md-bold'>{idx + 1}</span>
            <span className='text-noto-body-xs-bold'>
              {item.label}
              {type === 'ages'
                ? idx === data.length - 1
                  ? '세 이상'
                  : '세'
                : ''}
            </span>
          </div>
        ))}
      </div>
      {/* 가로 막대 차트 */}
      <BaseBarChart data={data} />
      {/* 항목별 (%) */}
      <div className='flex w-[4.2rem] shrink-0 flex-col gap-32 text-right'>
        {data.map((item, idx) => (
          <div
            className='flex h-24 items-center justify-end text-noto-body-xs-normal text-text-and-icon-default'
            key={idx}>
            {item.percentage}%
          </div>
        ))}
      </div>
    </div>
  )
}
