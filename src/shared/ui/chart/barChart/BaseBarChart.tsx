import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts'

interface BarChartItem {
  label: string
  percentage: number
}

interface BaseBarChartProps {
  data: BarChartItem[]
}

export function BaseBarChart({ data }: BaseBarChartProps) {
  const itemHeight = 56

  return (
    <div
      className='w-full overflow-hidden [&_*:focus]:outline-none [&_svg]:outline-none'
      style={{ height: data.length * itemHeight, marginTop: -16, marginBottom: -16 }}
    >
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart layout='vertical' data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <XAxis type='number' hide height={0} />
          <YAxis dataKey='label' type='category' hide width={0} />
          {/* 막대 차트 */}
          <Bar
            dataKey='percentage'
            fill='#273C5D'
            barSize={24}
            radius={50}
            background={{ fill: '#f2f2f2', radius: 50 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
