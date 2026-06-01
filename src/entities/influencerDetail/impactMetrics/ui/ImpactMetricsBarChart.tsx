import { BaseBarChart } from '@/shared/ui/chart/barChart'

interface BarChartItem {
  label: string
  percentage: number
  fill?: string
}

interface ImpactMetricsBarChartProps {
  title: string
  data: BarChartItem[]
  unit?: string
  formatValue?: (value: number) => string
}

export function ImpactMetricsBarChart({
  title,
  data,
  unit,
  formatValue,
}: ImpactMetricsBarChartProps) {
  return (
    <div className='flex w-full flex-col gap-12'>
      <div className='flex items-center justify-between'>
        <span className='text-noto-label-md-bold text-text-and-icon-secondary'>
          {title}
        </span>
      </div>
      <div className='flex gap-4'>
        {/* 항목 라벨 */}
        <div className='flex w-[5rem] shrink-0 flex-col gap-16'>
          {data.map((item) => (
            <div
              className='flex h-20 w-full items-center gap-10 text-text-and-icon-primary'
              key={item.label}>
              <span className='text-noto-body-xs-bold'>{item.label}</span>
            </div>
          ))}
        </div>
        {/* 가로 막대 차트 */}
        <BaseBarChart
          data={data}
          itemHeight={36}
          barSize={20}
          marginTop={-8}
          marginBottom={-8}
        />
        {/* 항목별 값 */}
        <div className='flex w-[6rem] shrink-0 flex-col gap-16 text-right'>
          {data.map((item) => (
            <div
              className='flex h-20 items-center justify-end text-noto-body-xs-normal text-text-and-icon-default'
              key={item.label}>
              {formatValue
                ? formatValue(item.percentage)
                : item.percentage.toFixed(1)}
              {unit}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
