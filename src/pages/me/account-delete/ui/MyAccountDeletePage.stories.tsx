import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { MyAccountDeletePage } from './MyAccountDeletePage'

const meta = {
  title: 'Pages/Me/MyAccountDeletePage',
  component: MyAccountDeletePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '계정 탈퇴 페이지 (라우트: `/me/profile/account-delete`). 안내 카드 → 연동 채널 카드 → "계정 탈퇴하기" 버튼 → 모달 3단계 시퀀스. 모달 트리거 후 흐름은 페이지 안에서 직접 확인 가능합니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='min-h-screen bg-background-gray-default'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MyAccountDeletePage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
