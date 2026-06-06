import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { WithdrawalReasonModal } from './WithdrawalReasonModal'

const meta = {
  title: 'Widgets/Me/AccountDelete/WithdrawalReasonModal',
  component: WithdrawalReasonModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '모달 2 — "탈퇴 사유 및 확인". 사유 dropdown(7개 옵션) + 개인정보 보관 동의 체크박스. 두 조건 모두 충족 시에만 우측 "계정 탈퇴하기" 버튼 활성화.',
      },
    },
  },
  args: {
    open: true,
    onClose: fn(),
    onConfirm: fn(),
  },
} satisfies Meta<typeof WithdrawalReasonModal>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '초기 상태 — 사유 미선택, 체크박스 미체크. 우측 버튼은 disabled.',
      },
    },
  },
}

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
