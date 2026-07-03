import { cn } from '@/shared/lib/utils'
import { Tooltip } from '@/shared/ui/tooltip'
import IconQuestion from '@/shared/assets/question-bold.svg'

interface MetricRow {
  label?: string
  state?: string
  prefix?: string
  value: number | string
  unit?: string
  tooltip?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}

interface ImpactMetricsCardProps {
  title?: string
  badge?: string
  mainMetric?: MetricRow
  subMetrics?: MetricRow[]
  tier?: 0 | 1 | 2 | 3 | 4
  empty?: boolean
  chart?: React.ReactNode
}

export function ImpactMetricsCard({
  title,
  badge,
  mainMetric,
  subMetrics,
  empty,
  tier,
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
                0: 'bg-primitive-basic-rose-600',
                1: 'bg-primitive-basic-rose-450',
                2: 'bg-primitive-basic-orange-350',
                3: 'bg-primitive-basic-amber-300',
                4: 'bg-primitive-basic-yellow-200',
              }[tier ?? 4]
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
        <ul className='flex flex-col gap-12'>
          {subMetrics?.map((metric) => (
            <li
              key={metric.label}
              className='flex items-center justify-between text-noto-label-xs-normal text-text-and-icon-tertiary'>
              <span className='flex items-center gap-2'>
                {metric.label}
                {metric.tooltip && (
                  <Tooltip label={metric.tooltip} side={metric.side}>
                    <button
                      type='button'
                      aria-label={`${metric.label ?? '지표'} 설명 보기`}>
                      <IconQuestion className='size-16 text-text-and-icon-disabled' />
                    </button>
                  </Tooltip>
                )}
              </span>
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
