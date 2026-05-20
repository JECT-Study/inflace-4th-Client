import { cn } from '@/shared/lib/utils'

interface ChartLegendProps {
  label: string
  value: number | string
  variant?: string
  unit?: string
}

export function ChartLegend({ label, value, variant, unit }: ChartLegendProps) {
  return (
    <div className='flex items-center gap-10'>
      <div className='p-2'>
        {/* 범례 색상 */}
        <div className={cn('h-12 w-12 rounded-full', variant)}></div>
      </div>
      <div className='flex items-center gap-12 text-noto-body-xs-bold'>
        {/* 범례 타이틀 */}
        <span>{label}</span>
        {/* 범례 값 + 단위 */}
        <span>
          {value}
          {unit}
        </span>
      </div>
    </div>
  )
}
