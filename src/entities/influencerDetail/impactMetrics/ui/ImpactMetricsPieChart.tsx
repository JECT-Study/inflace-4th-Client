'use client'

import { BasePieChart, type PieDataPoint } from '@/shared/ui/chart'

interface PieChartItem {
  label: string
  percentage: number
  fill?: string
  count?: number
}

interface ImpactMetricsPieChartProps {
  data: PieChartItem[]
}

export function ImpactMetricsPieChart({ data }: ImpactMetricsPieChartProps) {
  type PieDataPointWithCount = PieDataPoint & { count?: number }

  const pieData: PieDataPointWithCount[] = data.map((item) => ({
    name: item.label,
    value: item.percentage,
    count: item.count,
    color: item.fill ?? '#5A44F2',
  }))

  return (
    <div className='flex justify-center gap-24'>
      <div className='flex flex-col items-center gap-28'>
        <BasePieChart<PieDataPoint>
          data={pieData}
          dataKey='value'
          nameKey='name'
          tooltipFormatter={(value) => `${value}%`}
        />
        <div className='flex flex-col gap-12'>
          {pieData.map((item) => (
            <div key={item.name} className='flex items-center gap-10'>
              <div className='p-2'>
                <div
                  className='h-12 w-12 rounded-full'
                  style={{ backgroundColor: item.color }}
                />
              </div>
              <div className='flex items-center gap-12 text-noto-body-xs-bold'>
                <span>{item.name}</span>
                <span>{item.count}개</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
