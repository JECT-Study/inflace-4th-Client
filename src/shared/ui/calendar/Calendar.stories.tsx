import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Calendar } from './Calendar'

const meta: Meta<typeof Calendar> = {
  title: 'Shared/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='flex min-h-[48rem] items-start justify-end p-24'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'range', 'multiple'],
      description: '날짜 선택 모드',
    },
    numberOfMonths: {
      control: 'radio',
      options: [1, 2],
      description: '표시할 달력 수 (2이면 DualCalendar 렌더링)',
    },
    onConfirm: {
      description: '완료 버튼 클릭 시 호출되는 콜백 (전달 시 완료 버튼 표시)',
    },
    confirmDisabled: {
      control: 'boolean',
      description:
        '완료 버튼 비활성화 여부 (미전달 시 range 양끝이 모두 선택된 경우에만 자동 활성화)',
    },
  },
}

export default meta
type Story = StoryObj<typeof Calendar>

/* single 모드 — 날짜 하나 선택 */
export const Single: Story = {
  args: {
    mode: 'single',
  },
}

/* range 모드 — 완료 버튼 없음 */
export const Range: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>()
    return (
      <Calendar
        mode='range'
        selected={range}
        onSelect={setRange}
        disabled={(date) => date > new Date()}
      />
    )
  },
}

/* range 모드 — 완료 버튼 포함 (from/to 모두 선택 시 자동 활성화) */
export const RangeWithConfirm: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>()
    return (
      <Calendar
        mode='range'
        selected={range}
        onSelect={setRange}
        disabled={(date) => date > new Date()}
        onConfirm={() => alert(`완료: ${range?.from} ~ ${range?.to}`)}
      />
    )
  },
}

/* DualCalendar — 달력 2개, 완료 버튼 포함 */
export const DualRangeWithConfirm: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>()
    return (
      <Calendar
        mode='range'
        numberOfMonths={2}
        selected={range}
        onSelect={setRange}
        disabled={(date) => date > new Date()}
        onConfirm={() => alert(`완료: ${range?.from} ~ ${range?.to}`)}
      />
    )
  },
}

/* DualCalendar — 달력 2개, 완료 버튼 없음 */
export const DualRangeNoConfirm: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>()
    return (
      <Calendar
        mode='range'
        numberOfMonths={2}
        selected={range}
        onSelect={setRange}
        disabled={(date) => date > new Date()}
      />
    )
  },
}
