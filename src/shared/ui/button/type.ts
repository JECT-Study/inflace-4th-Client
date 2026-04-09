import type React from 'react'
import type { VariantProps } from 'class-variance-authority'
import type { buttonVariants } from './Button'

type ButtonProps = Omit<React.ComponentProps<'button'>, 'style'> &
  VariantProps<typeof buttonVariants> & {
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
  }

export type { ButtonProps }
