import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { BaseAreaChart } from './BaseAreaChart'
import { mockSubscriberGrowth1Week } from '@/entities/channelDashboard/channelSubscriberGrowth/mock/mockChannelSubscriberGrowth'
import type { SubscriberGrowthPoint } from '@/entities/channelDashboard/channelSubscriberGrowth/model/types'
import { ChartTooltip } from '@/shared/ui/chart'
import { format10Thousands, formatDate } from '@/shared/lib/format'

interface TooltipEntry {
  active?: boolean
  payload?: Array<{ value?: number; payload: { date: string } }>
}

function SampleTooltip({ active, payload }: TooltipEntry) {
  if (!active || !payload?.length) return null

  const { year, month, day } = formatDate(payload[0].payload.date)
  const value = format10Thousands(payload[0].value ?? 0)

  return (
    <ChartTooltip
      topLabel={`${year}년 ${Number(month)}월 ${Number(day)}일`}
      primaryValue={`${value}명`}
      annotation='급이탈 구간'
    />
  )
}

const SubscriberGrowthAreaChart = BaseAreaChart<SubscriberGrowthPoint>

const formatXAxisTick = (value: string) => value.split('-').join('.')

const formatYAxisTick = (value: number, ticks: number[]) => {
  if (value === 0) return '0'
  if (value === ticks[1]) return '25%'
  if (value === ticks[2]) return '50%'
  if (value === ticks[3]) return '75%'
  if (value === ticks[4]) return '100%'
  return String(value)
}

const formatTooltip = (value: number) => value.toLocaleString() + '명'

const meta: Meta<typeof SubscriberGrowthAreaChart> = {
  title: 'Shared/Chart/BaseAreaChart',
  component: SubscriberGrowthAreaChart,
  tags: ['autodocs'],
  argTypes: {
    customTooltip: { control: false },
  },
  decorators: [
    (Story) => (
      <div className='w-700 rounded-16 bg-white p-24'>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const WeekWithCustomTooltip: Story = {
  args: {
    data: mockSubscriberGrowth1Week.points,
    dataKey: 'subscriberCount',
    xAxisDataKey: 'date',
    xAxisTickFormatter: formatXAxisTick,
    yAxisTickFormatter: formatYAxisTick,
    tooltipFormatter: formatTooltip,
    customTooltip: <SampleTooltip />,
  },
}
