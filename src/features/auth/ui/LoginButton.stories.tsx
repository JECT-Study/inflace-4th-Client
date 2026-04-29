import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { useAuthStore } from '@/shared/api/authStore'
import { mockAccessToken, mockUser } from '@/shared/api/mock/mockUser'
import { LoginButton } from './LoginButton'

const meta = {
  title: 'Features/Auth/LoginButton',
  component: LoginButton,
  tags: ['autodocs'],
} satisfies Meta<typeof LoginButton>

export default meta
type Story = StoryObj<typeof meta>

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
        accessToken: mockAccessToken,
        user: mockUser,
        isInitializing: false,
      })
      return <Story />
    },
  ],
}
