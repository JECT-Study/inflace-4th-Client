import { type ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'
import { formatKoreanUnit } from '@/shared/lib/format'
import type { KpiMetric } from '@/entities/video'
import IconQuestion from '@/shared/assets/question-bold.svg'
import { Tooltip } from '@/shared/ui/tooltip'

type ValueFormat = 'korean' | 'percent' | 'float'

interface VideoStatsCardProps {
  icon: ReactNode
  label: string
  description?: string
  hasTooltip?: boolean
  tooltipLabel?: string
  metric?: KpiMetric | null
  valueFormat: ValueFormat
}

const NO_DATA_MESSAGE =
  '데이터가 충분히 모이지 않아 분석 결과를 제공할 수 없어요'

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
  tooltipLabel,
  metric,
  valueFormat,
}: VideoStatsCardProps) {
  return (
    <div className='flex w-full flex-1 items-center gap-24 rounded-12 bg-white p-32 shadow-[0px_2px_6px_0px_rgba(13,13,13,0.04)] sm:max-w-[55.8rem] sm:min-w-[37.4rem]'>
      {/* 왼쪽: 아이콘 + 레이블 */}
      <div className='flex min-w-0 flex-1 items-center gap-16'>
        <div className='flex shrink-0 items-center rounded-[1.5rem] bg-background-neutral-default p-5'>
          <div className='flex size-[3rem] items-center justify-center'>
            {icon}
          </div>
        </div>
        <div className='flex min-w-0 flex-1 flex-col gap-4'>
          <p className='text-noto-title-sm-normal text-text-and-icon-primary'>
            {label}
          </p>
          {description && (
            <div className='z-2 flex items-center gap-2'>
              <p className='text-noto-caption-md-normal whitespace-nowrap text-text-and-icon-secondary'>
                {description}
              </p>
              {hasTooltip && (
                <Tooltip side='top' align='center' label={tooltipLabel}>
                  <button type='button' aria-label={`${label} 지표 안내 보기`}>
                    <IconQuestion className='size-16 text-text-and-icon-disabled' />
                  </button>
                </Tooltip>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 오른쪽: 값 + 채널 평균 비교 (지표 미수집 시 안내 문구) */}
      {metric != null && metric.value != null ? (
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
      ) : (
        <div className='flex min-w-0 flex-1 items-center justify-end'>
          <p className='text-right text-noto-caption-md-normal text-text-and-icon-secondary'>
            {NO_DATA_MESSAGE}
          </p>
        </div>
      )}
    </div>
  )
}
