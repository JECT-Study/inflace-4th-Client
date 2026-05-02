'use client'

import { useState, type ReactElement } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { ChartTooltip } from '../ChartTooltip'

export type PieDataPoint = { name: string; value: number; color: string }

interface BasePieChartProps<T extends object> {
  data: T[]
  dataKey: keyof T & string
  nameKey: keyof T & string
  tooltipFormatter?: (value: number, name: string) => string
  customTooltip?: ReactElement
  isAnimationActive?: boolean
}

export function BasePieChart<T extends object>({
  data,
  dataKey,
  nameKey,
  tooltipFormatter,
  customTooltip,
  isAnimationActive,
}: BasePieChartProps<T>) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className='h-[15.8rem] w-[15.8rem] text-noto-caption-sm-bold text-text-and-icon-tertiary [&_*:focus]:outline-none [&_svg]:outline-none'>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <defs>
            <linearGradient id='pieGradient1' x1='1' y1='0' x2='0' y2='0'>
              <stop offset='0%' stopColor='#E4DFFF' stopOpacity={1} />
              <stop offset='199.69%' stopColor='#D5E3FF' stopOpacity={1} />
            </linearGradient>
            <linearGradient id='pieGradient2' x1='1' y1='0' x2='0' y2='0'>
              <stop offset='0%' stopColor='#5A44F2' stopOpacity={1} />
              <stop offset='179.06%' stopColor='#5291EB' stopOpacity={1} />
            </linearGradient>
          </defs>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            cx='50%'
            cy='50%'
            innerRadius={37}
            outerRadius={78}
            isAnimationActive={isAnimationActive}>
            <Cell
              fill='url(#pieGradient2)'
              stroke='#ffffff'
              strokeWidth={hoveredIndex === 0 ? 0 : 3}
              style={{ transition: 'stroke-width 0.2s' }}
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
            <Cell
              fill='url(#pieGradient1)'
              stroke='#ffffff'
              strokeWidth={hoveredIndex === 1 ? 0 : 3}
              style={{ transition: 'stroke-width 0.2s' }}
              onMouseEnter={() => setHoveredIndex(1)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          </Pie>
          <Tooltip
            content={
              customTooltip ??
              (({ payload }) => {
                if (!payload?.length) return null
                const { name, value } = payload[0]
                const formatted = tooltipFormatter
                  ? tooltipFormatter(Number(value), String(name))
                  : String(value)
                return (
                  <ChartTooltip
                    topLabel={String(name)}
                    primaryValue={formatted}
                  />
                )
              })
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
