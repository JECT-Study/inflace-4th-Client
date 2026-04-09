import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Toggle } from './Toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Shared/Toggle',
  component: Toggle,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '기간',
  },
}

export const Active: Story = {
  render: () => <Toggle defaultPressed>2025.02.01~2026.03.01</Toggle>,
}

export const Overview: Story = {
  render: () => (
    <div className='flex flex-wrap gap-8 p-6'>
      <Toggle>기본 상태</Toggle>
      <Toggle defaultPressed>2025.02.01~2026.03.01</Toggle>
    </div>
  ),
}

export const Multiple: Story = {
  render: () => (
    <div className='flex flex-wrap gap-8 p-6'>
      {['2025.02.01~2026.03.01', '롱폼', '숏폼', '광고포함'].map((label) => (
        <Toggle key={label}>{label}</Toggle>
      ))}
    </div>
  ),
}
