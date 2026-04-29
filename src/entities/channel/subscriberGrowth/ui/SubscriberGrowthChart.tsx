import type { SubscriberGrowthPoint } from '../model/types'
import {
  format10Thousands,
  formatDate,
  formatYAxisPercent,
} from '@/shared/lib/format'
import { BaseAreaChart, ChartTooltip } from '@/shared/ui/chart'

interface Props {
  points: SubscriberGrowthPoint[]
}

interface TooltipEntry {
  active?: boolean // 툴팁 활성화
  payload?: Array<{ value?: number; payload: { date: string } }> // 툴팁 데이터(구독자 수, 날짜)
}

const formatXAxisTick = (value: string) => value.split('-').join('.')

const formatTooltip = (value: number) => value.toLocaleString() + '명'

export function SubscriberTooltip({ active, payload }: TooltipEntry) {
  if (!active || !payload?.length) return null

  const { year, month, day } = formatDate(payload[0].payload.date)
  const value = format10Thousands(payload[0].value ?? 0)

  return (
    <ChartTooltip
      topLabel={`${year}년 ${Number(month)}월 ${Number(day)}일`}
      primaryValue={`${value}명`}
    />
  )
}

export function SubscriberGrowthChart({ points }: Props) {
  return (
    <BaseAreaChart
      data={points}
      dataKey='subscriberCount'
      xAxisDataKey='date'
      xAxisTickFormatter={formatXAxisTick}
      yAxisTickFormatter={formatYAxisPercent}
      tooltipFormatter={formatTooltip}
      customTooltip={<SubscriberTooltip />}
    />
  )
}
