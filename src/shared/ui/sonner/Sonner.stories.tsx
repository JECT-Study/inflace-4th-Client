import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { toast } from 'sonner'

import { Button } from '@/shared/ui/button'
import { Toaster } from './Sonner'

const meta = {
  title: 'Shared/Sonner/Toaster',
  component: Toaster,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
    },
  },
  args: {
    position: 'top-center',
  },
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  render: (args) => (
    <>
      <Toaster {...args} />
      <div className='p-24'>
        <Button
          color='primary'
          variant='filled'
          size='sm'
          onClick={() =>
            toast.success(
              '성공 메세지 긴 메세지 확인용입니다. 일이삼사오육칠팔구십'
            )
          }>
          Success
        </Button>
      </div>
    </>
  ),
}

export const Info: Story = {
  render: (args) => (
    <>
      <Toaster {...args} />
      <div className='p-24'>
        <Button
          color='secondary'
          variant='filled'
          size='sm'
          onClick={() => toast.info('정보 메세지')}>
          Info
        </Button>
      </div>
    </>
  ),
}

export const Error: Story = {
  render: (args) => (
    <>
      <Toaster {...args} />
      <div className='p-24'>
        <Button
          color='secondary'
          variant='outlined'
          size='sm'
          onClick={() => toast.error('오류 메세지')}>
          Error
        </Button>
      </div>
    </>
  ),
}
