import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { WithdrawalCompletedModal } from './WithdrawalCompletedModal'

const meta = {
  title: 'Widgets/Me/AccountDelete/WithdrawalCompletedModal',
  component: WithdrawalCompletedModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '모달 3 — 탈퇴 처리 완료 안내. 가운데 정렬 단일 "홈으로 이동하기" 버튼.',
      },
    },
  },
  args: {
    open: true,
    onGoHome: fn(),
  },
} satisfies Meta<typeof WithdrawalCompletedModal>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {}

export const Closed: Story = {
  args: { open: false },
  parameters: {
    docs: {
      description: {
        story: 'open=false 상태에서는 아무것도 렌더링되지 않습니다.',
      },
    },
  },
}
