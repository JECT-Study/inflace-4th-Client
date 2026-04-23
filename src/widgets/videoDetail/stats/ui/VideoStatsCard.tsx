import { type ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'
import { formatKoreanUnit } from '@/shared/lib/format'
import type { KpiMetric } from '@/entities/video'
import InfoIcon from '@/shared/assets/info-bold.svg'

type ValueFormat = 'korean' | 'percent' | 'float'

interface VideoStatsCardProps {
  icon: ReactNode
  label: string
  description?: string
  hasTooltip?: boolean
  metric: KpiMetric
  valueFormat: ValueFormat
}

function formatValue(value: number, format: ValueFormat): string {
  switch (format) {
    case 'korean':
      return formatKoreanUnit(value)
    case 'percent': {
      const n = Number.isInteger(value) ? value : parseFloat(value.toFixed(1))
      return `${n}%`
    }
    case 'float':
      return Number.isInteger(value) ? String(value) : value.toFixed(1)
  }
}

function ChangeRateBadge({ changeRate }: { changeRate: number | null }) {
  if (changeRate === null) {
    return (
      <span className='text-noto-title-sm-bold text-text-and-icon-secondary'>
        —
      </span>
    )
  }

  const isPositive = changeRate >= 0
  const sign = isPositive ? '+' : ''
  const formatted = Number.isInteger(changeRate)
    ? changeRate
    : parseFloat(changeRate.toFixed(1))

  return (
    <span
      className={cn(
        'text-noto-title-sm-bold',
        isPositive
          ? 'text-[var(--color-dashboard-positive)]'
          : 'text-[var(--color-dashboard-negative)]'
      )}>
      {`${sign}${formatted}%`}
    </span>
  )
}

export function VideoStatsCard({
  icon,
  label,
  description,
  hasTooltip = false,
  metric,
  valueFormat,
}: VideoStatsCardProps) {
  return (
    <div className='flex w-full flex-1 items-center gap-24 rounded-12 bg-white p-32 shadow-[0px_2px_6px_0px_rgba(13,13,13,0.04)] sm:min-w-[37.4rem] sm:max-w-[55.8rem]'>
      {/* 왼쪽: 아이콘 + 레이블 */}
      <div className='flex min-w-0 flex-1 items-center gap-16'>
        <div className='flex shrink-0 items-center rounded-[1.5rem] bg-[#fcf8ff] p-5'>
          <div className='flex size-[3rem] items-center justify-center'>
            {icon}
          </div>
        </div>
        <div className='flex min-w-0 flex-1 flex-col gap-4'>
          <p className='text-noto-title-sm-normal text-text-and-icon-primary'>
            {label}
          </p>
          {description && (
            <div className='flex items-center gap-4'>
              <p className='whitespace-nowrap text-noto-caption-md-normal text-text-and-icon-secondary'>
                {description}
              </p>
              {hasTooltip && (
                <InfoIcon className='size-12 shrink-0 text-text-and-icon-secondary' />
              )}
            </div>
          )}
        </div>
      </div>

      {/* 오른쪽: 값 + 채널 평균 비교 */}
      <div className='flex min-w-0 flex-1 flex-col items-end gap-2'>
        <p className='w-full text-right text-ibm-heading-sm-normal text-text-and-icon-primary'>
          {formatValue(metric.value, valueFormat)}
        </p>
        <div className='flex w-full items-center justify-end gap-6 whitespace-nowrap'>
          <span className='text-noto-caption-md-normal text-text-and-icon-secondary'>
            채널 평균보다
          </span>
          <ChangeRateBadge changeRate={metric.changeRate} />
        </div>
      </div>
    </div>
  )
}
