import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { DataDeletionModal } from './DataDeletionModal'

const meta = {
  title: 'Widgets/Me/AccountDelete/DataDeletionModal',
  component: DataDeletionModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '모달 1 — "탈퇴 시 삭제되는 데이터" 안내. 5개 항목(채널 분석 / 검색 이력 / 협업 제안 / 결제 정보 / 개인정보)을 빨강 동그라미 아이콘과 함께 노출합니다. 좌측 "다시 생각해볼게요" = 닫기, 우측 "계정 탈퇴하기" = 다음 단계.',
      },
    },
  },
  args: {
    open: true,
    onClose: fn(),
    onNext: fn(),
  },
} satisfies Meta<typeof DataDeletionModal>

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
