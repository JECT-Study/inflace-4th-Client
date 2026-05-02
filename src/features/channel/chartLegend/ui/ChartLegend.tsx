import { cn } from '@/shared/lib/utils'

interface ChartLegendProps {
  label: string
  value: number | string
  variant?: string
}

export function ChartLegend({ label, value, variant }: ChartLegendProps) {
  return (
    <div className='flex items-center gap-10'>
      <div className='p-2'>
        <div className={cn('h-12 w-12 rounded-full', variant)}></div>
      </div>
      <div className='flex items-center gap-12 text-noto-body-xs-bold'>
        <span>{label}</span>
        <span>{value}</span>
      </div>
    </div>
  )
}
