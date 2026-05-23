import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { LinkedChannelsForDeleteCard } from './LinkedChannelsForDeleteCard'

const meta = {
  title: 'Widgets/Me/AccountDelete/LinkedChannelsForDeleteCard',
  component: LinkedChannelsForDeleteCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '연동된 유튜브 채널 목록 카드. 디자인 기준 mock 채널 3개 표시 (1개 선택 상태 포함). 추후 실제 채널 데이터 연동 예정.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='max-w-[80rem] bg-background-gray-default p-32'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LinkedChannelsForDeleteCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
