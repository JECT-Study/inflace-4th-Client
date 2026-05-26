'use client'

import { ChartLegend } from '@/shared/ui/chart/chartLegend'
import { FormatAnalysis } from '@/entities/influencerDetail'
import { BasePieChart, type PieDataPoint } from '@/shared/ui/chart'

export function ContentChart({ data }: { data: FormatAnalysis }) {
  const { longForm, shortForm } = data

  const pieData: PieDataPoint[] = [
    {
      name: '롱폼',
      value: longForm.count,
      color: 'bg-brand-primary',
    },
    {
      name: '숏폼',
      value: shortForm.count,
      color: 'bg-btn-primary-filled-disabled',
    },
  ]

  return (
    <div className='flex flex-col gap-24'>
      {/* 롱폼/숏폼 콘텐츠 차트 라벨 */}
      <span className='text-noto-label-lg-bold text-text-and-icon-primary'>
        콘텐츠 비중 (개수)
      </span>
      <div className='flex items-center gap-40'>
        {/* 롱폼/숏폼 콘텐츠 차트 */}
        <BasePieChart<PieDataPoint>
          data={pieData}
          dataKey='value'
          nameKey='name'
          tooltipFormatter={(value) => `${value}개`}
        />
        <div className='flex flex-col gap-12'>
          {/* 롱폼/숏폼 콘텐츠 차트 범례 */}
          {pieData.map((item) => (
            <ChartLegend
              key={item.name}
              value={item.value}
              label={item.name}
              variant={item.color}
              unit='개'
            />
          ))}
        </div>
      </div>
    </div>
  )
}
