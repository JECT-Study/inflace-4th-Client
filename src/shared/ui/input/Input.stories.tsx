import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Shared/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: '영상 제목으로 검색',
  },
}

export const Overview: Story = {
  render: () => (
    <div className='flex flex-col gap-6 p-6'>
      <div>
        <p className='mb-2 text-sm text-gray-400'>기본</p>
        <Input placeholder='영상 제목으로 검색' />
      </div>
      <div>
        <p className='mb-2 text-sm text-gray-400'>포커스</p>
        <Input placeholder='영상 제목으로 검색' autoFocus />
      </div>
    </div>
  ),
}
