'use client'

import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

export interface BarChartItem {
  label: string
  percentage: number
  fill?: string
}

interface BaseBarChartProps {
  data: BarChartItem[]
  itemHeight?: number
  marginTop?: number
  marginBottom?: number
  barSize?: number
  fill?: string
  domain?: [number, number]
}

export function BaseBarChart({
  data,
  barSize = 24,
  itemHeight = 56,
  marginTop = -16,
  marginBottom = -16,
  fill = '#273C5D',
  domain,
}: BaseBarChartProps) {
  // 데이터가 0일때 화면 표시 용으로 작은값(0.00001)으로 변경
  const chartData = data.map((item) => ({
    ...item,
    percentage: item.percentage === 0 ? 0.00001 : item.percentage,
  }))

  return (
    <div
      className='w-full overflow-hidden [&_*:focus]:outline-none [&_svg]:outline-none'
      style={{ height: data.length * itemHeight, marginTop, marginBottom }}>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          layout='vertical'
          data={chartData}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <XAxis type='number' hide height={0} domain={domain} />
          <YAxis dataKey='label' type='category' hide width={0} />
          {/* 막대 차트 */}
          <Bar
            dataKey='percentage'
            barSize={barSize}
            radius={50}
            background={{ fill: '#f2f2f2', radius: 50 }}>
            {chartData.map((item, index) => (
              <Cell key={index} fill={item.fill ?? fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
