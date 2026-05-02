'use client'

import { ChartLegend } from '@/features/channel/chartLegend'
import type { TypeEngagementSummaryDto } from '../model/types'
import { BasePieChart, type PieDataPoint } from '@/shared/ui/chart'

export function TypeEngagementChart({ data }: { data: TypeEngagementSummaryDto }) {
  const { longFormEngagementRate, shortFormEngagementRate } = data

  const pieData: PieDataPoint[] = [
    {
      name: '롱폼',
      value: longFormEngagementRate,
      color: 'bg-brand-primary',
    },
    {
      name: '숏폼',
      value: shortFormEngagementRate,
      color: 'bg-btn-primary-filled-disabled',
    },
  ]

  return (
    <div className='flex items-center justify-center gap-40'>
      {/* 롱폼 / 숏폼 평균 참여율 차트 */}
      <BasePieChart<PieDataPoint>
        data={pieData}
        dataKey='value'
        nameKey='name'
        tooltipFormatter={(value) => `${value}%`}
      />
      {/* 롱폼 / 숏폼 평균 참여율 차트 범례 */}
      <div className='flex flex-col gap-12'>
        {pieData.map((item) => (
          <ChartLegend
            key={item.name}
            value={item.value}
            label={item.name}
            variant={item.color}
          />
        ))}
      </div>
    </div>
  )
}
