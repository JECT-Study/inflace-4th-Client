'use client'

import { ChartLegend } from '@/features/channel/chartLegend'
import { SubscriberRatioDto } from '../model/types'
import { BasePieChart, type PieDataPoint } from '@/shared/ui/chart'

export function SubscriberChart({ data }: { data: SubscriberRatioDto }) {
  const { ratio } = data

  const pieData: PieDataPoint[] = [
    {
      name: '기존 구독자',
      value: 100 - ratio,
      color: 'bg-brand-primary',
    },
    {
      name: '신규 구독자',
      value: ratio,
      color: 'bg-btn-primary-filled-disabled',
    },
  ]
  return (
    <div className='flex flex-col items-center gap-40'>
      {/* 기존 / 신규 구독자 차트 */}
      <BasePieChart<PieDataPoint>
        data={pieData}
        dataKey='value'
        nameKey='name'
        tooltipFormatter={(value) => `${value}%`}
      />
      {/* 기존 / 신규 구독자 차트 범례 */}
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
