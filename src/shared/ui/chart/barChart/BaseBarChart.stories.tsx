import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { BaseBarChart } from './BaseBarChart'

const meta: Meta<typeof BaseBarChart> = {
  title: 'Shared/Chart/BaseBarChart',
  component: BaseBarChart,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof BaseBarChart>

export const Default: Story = {
  args: {
    data: [
      { label: '18-24', percentage: 45 },
      { label: '25-34', percentage: 78 },
      { label: '35-44', percentage: 62 },
      { label: '45-54', percentage: 30 },
      { label: '55+', percentage: 15 },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
}
