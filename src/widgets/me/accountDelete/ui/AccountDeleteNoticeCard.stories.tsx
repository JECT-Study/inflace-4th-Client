import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AccountDeleteNoticeCard } from './AccountDeleteNoticeCard'

const meta = {
  title: 'Widgets/Me/AccountDelete/AccountDeleteNoticeCard',
  component: AccountDeleteNoticeCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '계정 탈퇴 페이지 상단의 안내 카드. 분홍색 배경 + 빨강 텍스트로 강조하며 30일 복구 정책을 안내합니다.',
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
} satisfies Meta<typeof AccountDeleteNoticeCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
