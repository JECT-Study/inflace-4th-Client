import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CalendarRangePicker, Calendar } from './Calendar'

const meta: Meta<typeof CalendarRangePicker> = {
  title: 'Shared/Calendar/CalendarRangePicker',
  component: CalendarRangePicker,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='flex min-h-[48rem] items-start justify-end p-24'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: '날짜 미선택 시 표시되는 레이블',
      table: {
        defaultValue: { summary: '기간' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: '기간',
  },
}

export const Overview: Story = {
  render: () => (
    <div className='flex flex-wrap gap-8 p-6'>
      <CalendarRangePicker label='기간' />
      <CalendarRangePicker label='날짜' />
      <CalendarRangePicker label='조회 기간' />
    </div>
  ),
}

export const CalendarBase: StoryObj<typeof Calendar> = {
  render: () => (
    <div className='inline-block overflow-hidden rounded-16 border border-sidebar-border bg-white shadow-lg'>
      <Calendar
        mode='range'
        numberOfMonths={2}
        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
        onConfirm={() => {}}
      />
    </div>
  ),
}
