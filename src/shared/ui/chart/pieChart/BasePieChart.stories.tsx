import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { BasePieChart } from './BasePieChart'
import { mockTypeEngagementChart } from '@/entities/channel/typeEngagement/mock/mockTypeEngagement'

interface PieDataPoint {
  name: string
  value: number
}

const SamplePieChart = BasePieChart<PieDataPoint>

const defaultData: PieDataPoint[] = [
  { name: '롱폼', value: mockTypeEngagementChart.longFormEngagementRate },
  { name: '숏폼', value: mockTypeEngagementChart.shortFormEngagementRate },
]

const meta: Meta<typeof SamplePieChart> = {
  title: 'Shared/Chart/BasePieChart',
  component: SamplePieChart,
  tags: ['autodocs'],
  argTypes: {
    customTooltip: { control: false },
  },
  decorators: [
    (Story) => (
      <div className='inline-block rounded-16 bg-white p-24'>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: defaultData,
    dataKey: 'value',
    nameKey: 'name',
    tooltipFormatter: (value) => `${value}%`,
    isAnimationActive: false,
  },
}
