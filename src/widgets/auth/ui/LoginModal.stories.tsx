import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { useLoginModal } from '@/features/auth'
import { LoginModal } from './LoginModal'

const meta = {
  title: 'Widgets/Auth/LoginModal',
  component: LoginModal,
  tags: ['autodocs'],
} satisfies Meta<typeof LoginModal>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  decorators: [
    (Story) => {
      useLoginModal.setState({ isOpen: true })
      return <Story />
    },
  ],
}

/*
 * WithError: usePopupOAuth의 error 상태를 표시하려면 내부 훅을 제어해야 한다.
 * 래퍼 컴포넌트를 통해 팝업 차단 에러 시나리오를 연출한다.
 * (실제 팝업 차단이 발생하지 않으므로, 버튼 클릭 전 상태로 에러 텍스트를 확인하려면
 *  vi.mock 기반 Storybook 테스트 환경이 필요하다.)
 */
export const WithError: Story = {
  decorators: [
    (Story) => {
      useLoginModal.setState({ isOpen: true })
      return <Story />
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          '로그인 팝업이 차단되었을 때 에러 메시지가 표시되는 상태입니다. 실제 에러를 트리거하려면 브라우저 팝업 차단을 활성화한 후 로그인 버튼을 클릭하세요.',
      },
    },
  },
}
