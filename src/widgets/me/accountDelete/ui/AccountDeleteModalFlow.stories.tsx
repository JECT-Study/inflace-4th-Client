import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AccountDeleteModalFlow } from './AccountDeleteModalFlow'

const meta = {
  title: 'Widgets/Me/AccountDelete/AccountDeleteModalFlow',
  component: AccountDeleteModalFlow,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '계정 탈퇴 모달 3단계 시퀀스. 각 모달의 우측 버튼이 다음 단계로 자동 전환됩니다. `initialStep`으로 특정 단계부터 확인 가능.',
      },
    },
  },
  argTypes: {
    initialStep: {
      control: 'select',
      options: ['dataDeletion', 'reason', 'completed'],
      description:
        '시작 단계 — 모달 1 (dataDeletion) / 모달 2 (reason) / 모달 3 (completed)',
    },
    open: { control: 'boolean' },
  },
  args: {
    open: true,
    initialStep: 'dataDeletion',
    onClose: fn(),
    onComplete: fn(),
    onSubmitReason: fn(),
  },
} satisfies Meta<typeof AccountDeleteModalFlow>

export default meta
type Story = StoryObj<typeof meta>

export const FromDataDeletion: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '모달 1부터 시작 — 우측 "계정 탈퇴하기" 클릭 시 모달 2로 자동 전환 → 사유 선택 + 동의 후 우측 버튼 클릭 시 모달 3으로 전환.',
      },
    },
  },
}

export const FromReason: Story = {
  args: { initialStep: 'reason' },
  parameters: {
    docs: {
      description: {
        story:
          '모달 2부터 시작 — 사유 dropdown(7개) + 동의 체크박스 동작 확인. 두 조건 충족 시 우측 버튼 활성화 후 모달 3으로 전환.',
      },
    },
  },
}

export const FromCompleted: Story = {
  args: { initialStep: 'completed' },
  parameters: {
    docs: {
      description: {
        story: '모달 3 — 탈퇴 완료 안내만 단독 확인.',
      },
    },
  },
}

export const Closed: Story = {
  args: { open: false },
  parameters: {
    docs: {
      description: {
        story: 'open=false 상태에서는 어떤 모달도 렌더링되지 않습니다.',
      },
    },
  },
}
