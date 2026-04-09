import type React from 'react'
import type { VariantProps } from 'class-variance-authority'
import type { buttonVariants } from './Button'

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
  }

export type { ButtonProps }
