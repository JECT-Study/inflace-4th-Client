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
    label: '기간',
  },
}

export const Multiple: Story = {
  render: () => (
    <div className='flex flex-wrap gap-8 p-6'>
      {['롱폼', '숏폼', '광고포함'].map((label) => (
        <Toggle key={label} label={label} />
      ))}
    </div>
  ),
}
