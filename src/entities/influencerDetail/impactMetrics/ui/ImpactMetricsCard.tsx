import { cn } from '@/shared/lib/utils'
import React from 'react'

interface MetricRow {
  label: string
  state?: string
  prefix?: string
  value: number | string
  unit?: string
}

interface ImpactMetricsCardProps {
  title?: string
  badge?: string
  mainMetric?: MetricRow
  subMetrics?: MetricRow[]
  variant?: 'audience' | 'content' | 'activity' | 'advertisement'
  empty?: boolean
  chart?: React.ReactNode
}

export function ImpactMetricsCard({
  title,
  badge,
  mainMetric,
  subMetrics,
  empty,
  variant,
  chart,
}: ImpactMetricsCardProps) {
  if (empty) {
    return (
      // 광고 영상 부족 시 뜨는 카드
      <div className='flex min-w-0 flex-1 items-center rounded-10 border-2 border-dashed border-stroke-border-gray-default p-32'>
        <p className='w-full text-center text-noto-body-xs-bold text-text-and-icon-tertiary'>
          광고 영상이 부족하여
          <br />
          분석 결과를 제공할 수 없습니다
        </p>
      </div>
    )
  }

  // 차트 포함 카드
  if (chart) {
    return (
      <div className='min-w-0 flex-1 rounded-10 border-2 border-stroke-border-gray-default p-32'>
        <div className='flex w-full flex-col gap-24'>
          <p className='text-noto-label-lg-bold text-text-and-icon-default'>
            {title}
          </p>
          {chart}
        </div>
      </div>
    )
  }

  return (
    <div className='min-w-0 flex-1 rounded-10 border-2 border-stroke-border-gray-default p-32'>
      <div className='flex flex-col gap-12'>
        {/* 카드 타이틀 */}
        <p className='text-noto-label-lg-bold text-text-and-icon-default'>
          {title}
        </p>
        <div className='flex items-center justify-between'>
          {/* 카드 뱃지 */}
          <span
            className={cn(
              'rounded-10 px-20 py-8 text-ibm-label-lg-bold text-white',
              {
                audience: 'bg-primitive-basic-pink-400',
                content: 'bg-primitive-basic-blue-400',
                activity: 'bg-primitive-basic-emerald-400',
                advertisement: 'bg-primitive-basic-fuchsia-400',
              }[variant ?? 'audience']
            )}>
            {badge}
          </span>
          <div className='flex flex-col items-end'>
            {/* score 라벨 */}
            <span className='text-noto-label-xs-normal text-text-and-icon-tertiary'>
              {mainMetric?.label}
            </span>
            {/* 카드 score */}
            <p className='flex items-center text-ibm-heading-md-bold text-text-and-icon-secondary'>
              {mainMetric?.value}
              <span className='text-ibm-title-lg-normal'>
                {mainMetric?.unit}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className='mt-24 flex flex-col border-t border-stroke-border-gray-default pt-24'>
        <ul className='flex flex-col gap-8'>
          {subMetrics?.map((metric) => (
            <li
              key={metric.label}
              className='flex items-center justify-between text-noto-label-sm-normal text-text-and-icon-secondary'>
              <span>{metric.label}</span>
              <span>
                {/* · 포함 라벨  */}
                {metric.state && (
                  <span className='relative pr-10 after:absolute after:top-1/2 after:right-4 after:h-3 after:w-3 after:-translate-y-1/2 after:rounded-full after:bg-text-and-icon-secondary after:content-[""]'>
                    {metric.state}
                  </span>
                )}
                {metric.prefix}
                {metric.value}
                {metric.unit}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
