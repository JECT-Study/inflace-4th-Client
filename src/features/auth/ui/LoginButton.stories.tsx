import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { useAuthStore } from '@/shared/api/authStore'
import { LoginButton } from './LoginButton'
import { userMock } from '@/shared/api/mock/userMock'

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
        accessToken: 'mock-access-token',
        user: userMock,
        isInitializing: false,
      })
      return <Story />
    },
  ],
}
