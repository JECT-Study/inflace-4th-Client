import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { LinkedChannelsForDeleteCard } from './LinkedChannelsForDeleteCard'

const meta = {
  title: 'Widgets/Me/AccountDelete/LinkedChannelsForDeleteCard',
  component: LinkedChannelsForDeleteCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '연동된 유튜브 채널 카드. useChannelProfile(GET /user/channels/main)로 메인 연동 채널을 조회해 표시. Storybook에서는 accessToken이 없어 쿼리가 비활성화되므로 헤더만 렌더링됨.',
      },
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={new QueryClient()}>
        <div className='max-w-[80rem] bg-background-gray-default p-32'>
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof LinkedChannelsForDeleteCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
