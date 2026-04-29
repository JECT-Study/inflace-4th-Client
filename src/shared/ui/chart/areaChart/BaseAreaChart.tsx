import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { ReactElement } from 'react'

interface BaseAreaChartProps<T extends object> {
  data: T[]
  dataKey: keyof T & string
  xAxisDataKey: keyof T & string
  xAxisTickFormatter: (value: string) => string
  yAxisTickFormatter: (value: number, ticks: number[]) => string
  tooltipFormatter: (value: number) => string
  customTooltip?: ReactElement
}

export function BaseAreaChart<T extends object>({
  data,
  dataKey,
  xAxisDataKey,
  xAxisTickFormatter,
  yAxisTickFormatter,
  tooltipFormatter,
  customTooltip,
}: BaseAreaChartProps<T>) {
  const maxValue = Math.max(
    ...data.map((item) => Number(item[dataKey as keyof T]))
  )
  const yTicks = [
    0,
    Math.round(maxValue * 0.25),
    Math.round(maxValue * 0.5),
    Math.round(maxValue * 0.75),
    maxValue,
  ]

  return (
    <div className='h-94 w-full text-noto-caption-sm-bold text-text-and-icon-tertiary [&_*:focus]:outline-none [&_svg]:outline-none'>
      <ResponsiveContainer>
        <AreaChart
          style={{ outline: 'none' }}
          data={data}
          margin={{ top: 7, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id='areaGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#5A44F2' stopOpacity={0.24} />
              <stop offset='100%' stopColor='#FFFFFF' stopOpacity={0.24} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} stroke='#E5E7EB' strokeOpacity={1} />

          <XAxis
            dataKey={xAxisDataKey as string}
            axisLine={false}
            tickLine={false}
            tickMargin={8}
            padding={{ left: 19, right: 12.9 }}
            tickFormatter={xAxisTickFormatter}
          />

          <YAxis
            domain={[0, maxValue]}
            axisLine={false}
            ticks={yTicks}
            width={50}
            tickMargin={16}
            tickLine={false}
            tickFormatter={(value) => yAxisTickFormatter(value, yTicks)}
          />

          <Tooltip
            content={customTooltip}
            cursor={false}
            formatter={(value) => tooltipFormatter(Number(value))}
          />

          <Area
            type='monotone'
            dataKey={dataKey as string}
            strokeWidth={4}
            stroke='#5A44F2'
            fill='url(#areaGradient)'
            fillOpacity={1}
            dot={{
              r: 7,
              strokeWidth: 2,
              stroke: '#fff',
              fill: '#5A44F2',
            }}
            activeDot={{
              r: 7,
              strokeWidth: 2,
              stroke: '#fff',
              fill: '#5A44F2',
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
