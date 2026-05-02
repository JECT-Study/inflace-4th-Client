'use client'

import { ChartLegend } from '@/features/channel/chartLegend'
import { DistributionItem } from '../model/types'
import { BasePieChart, type PieDataPoint } from '@/shared/ui/chart'

export function GenderChart({ data }: { data: DistributionItem[] }) {
  const pieData: PieDataPoint[] = data.map((item, index) => ({
    name: item.label,
    value: item.percentage,
    color: index === 0 ? 'bg-brand-primary' : 'bg-btn-primary-filled-disabled',
  }))

  return (
    <div className='flex flex-col items-center gap-40'>
      {/* 여성 / 남성 차트 */}
      <BasePieChart<PieDataPoint>
        data={pieData}
        dataKey='value'
        nameKey='name'
        tooltipFormatter={(value) => `${value}%`}
      />

      {/* 여성 / 남성 차트 범례 */}
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
