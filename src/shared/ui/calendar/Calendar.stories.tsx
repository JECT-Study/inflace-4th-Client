import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Calendar } from './Calendar'

const meta: Meta<typeof Calendar> = {
  title: 'Shared/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='flex min-h-120 items-start justify-center p-24'>
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
      description: '완료 버튼 비활성화 여부',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    mode: 'single',
  },
}

export const WithConfirmButton: Story = {
  args: {
    mode: 'range',
    onConfirm: () => alert('완료!'),
  },
}

export const DualCalendar: Story = {
  args: {
    mode: 'range',
    numberOfMonths: 2,
    onConfirm: () => alert('완료!'),
    disabled: (date: Date) =>
      date > new Date() || date < new Date('1900-01-01'),
  },
}

export const DualCalendarNoConfirm: Story = {
  args: {
    mode: 'range',
    numberOfMonths: 2,
    disabled: (date: Date) =>
      date > new Date() || date < new Date('1900-01-01'),
  },
}
