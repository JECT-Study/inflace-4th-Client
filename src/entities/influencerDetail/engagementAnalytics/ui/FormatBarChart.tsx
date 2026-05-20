'use client'

import { FormatAnalysis } from '@/entities/influencerDetail'
import { BarChartItem, BaseBarChart } from '@/shared/ui/chart/barChart'

interface FormatBarChartProps {
  title: string
  subtitle?: string
  data: FormatAnalysis
  dataKey: 'averageViews30d' | 'engagementRate'
  formatValue: (value: number) => string
  domain?: [number, number]
}

export function FormatBarChart({
  title,
  subtitle,
  data,
  dataKey,
  formatValue,
  domain,
}: FormatBarChartProps) {
  const chartData: BarChartItem[] = [
    {
      label: '롱폼',
      percentage: data.longForm[dataKey],
      fill: '#5A44F2',
    },
    {
      label: '숏폼',
      percentage: data.shortForm[dataKey],
      fill: '#E4DFFF',
    },
  ]

  return (
    <div className='flex flex-col gap-24'>
      <div className='flex items-center justify-between'>
        <span className='text-noto-label-lg-bold text-text-and-icon-primary'>
          {title}
        </span>
        {subtitle && (
          <span className='text-noto-label-xs-normal text-text-and-icon-tertiary'>
            {subtitle}
          </span>
        )}
      </div>
      <div className='flex gap-4'>
        <div className='flex w-[10rem] shrink-0 flex-col gap-16'>
          {chartData.map((item) => (
            <div
              className='flex h-20 w-full items-center gap-10 text-text-and-icon-primary'
              key={item.label}>
              <span className='text-noto-body-xs-bold'>{item.label}</span>
            </div>
          ))}
        </div>
        <BaseBarChart
          itemHeight={36}
          barSize={20}
          marginTop={-8}
          marginBottom={-8}
          data={chartData}
          domain={domain}
        />
        <div className='flex w-[8rem] shrink-0 flex-col gap-16 text-right'>
          {chartData.map((item) => (
            <div
              className='flex h-20 items-center justify-end text-noto-body-xs-normal text-text-and-icon-default'
              key={item.label}>
              {formatValue(item.percentage)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
