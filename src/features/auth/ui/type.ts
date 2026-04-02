import type { ReactNode } from 'react'

export interface SocialLoginButtonProps {
  icon: ReactNode
  label: string
  onClick?: () => void
  disabled?: boolean
}
