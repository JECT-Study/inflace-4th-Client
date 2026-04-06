import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { useAuthStore } from '@/shared/api/authStore'
import { LoginButton } from './LoginButton'
import LogoImage from '@/shared/assets/logo.svg'
import { UserPlan } from '@/features/navigation'

const meta = {
  title: 'Features/Auth/LoginButton',
  component: LoginButton,
  tags: ['autodocs'],
} satisfies Meta<typeof LoginButton>

export default meta
type Story = StoryObj<typeof meta>

const mockUser = {
  id: '1',
  name: 'inflace 사용자',
  email: 'user@inflace.com',
  profileImage: LogoImage,
  plan: 'free' as UserPlan,
}

export const Loading: Story = {
  decorators: [
    (Story) => {
      useAuthStore.setState({
        accessToken: null,
        user: null,
        isInitializing: true,
      })
      return <Story />
    },
  ],
}

export const LoggedOut: Story = {
  decorators: [
    (Story) => {
      useAuthStore.setState({
        accessToken: null,
        user: null,
        isInitializing: false,
      })
      return <Story />
    },
  ],
}

export const LoggedIn: Story = {
  decorators: [
    (Story) => {
      useAuthStore.setState({
        accessToken: 'mock-access-token',
        user: mockUser,
        isInitializing: false,
      })
      return <Story />
    },
  ],
}
