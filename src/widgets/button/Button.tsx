import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/shared/lib/utils'

const buttonVariants = cva(
  "relative inline-flex items-center justify-center overflow-hidden font-[var(--font-weight-label-normal)] whitespace-nowrap transition-colors select-none after:pointer-events-none after:absolute after:inset-0 after:content-[''] disabled:pointer-events-none",
  {
    variants: {
      color: {
        primary: '',
        secondary: '',
        gray: '',
      },
      size: {
        lg: 'gap-[var(--spacing-6)] rounded-[var(--radius-6)] px-[var(--spacing-20)] py-[var(--spacing-10)] leading-[var(--leading-label-lg)] text-[var(--text-label-lg)]',
        md: 'gap-[var(--spacing-6)] rounded-[var(--radius-6)] px-[var(--spacing-16)] py-[var(--spacing-8)] leading-[var(--leading-label-md)] text-[var(--text-label-md)]',
        sm: 'gap-[var(--spacing-6)] rounded-[var(--radius-6)] px-[var(--spacing-12)] py-[var(--spacing-8)] leading-[var(--leading-label-sm)] text-[var(--text-label-sm)]',
        xs: 'gap-[var(--spacing-4)] rounded-[var(--radius-6)] px-[var(--spacing-12)] py-[var(--spacing-6)] leading-[var(--leading-label-xs)] text-[var(--text-label-xs)]',
      },
      style: {
        filled: '',
        outlined: 'border bg-transparent',
      },
    },
    compoundVariants: [
      {
        color: 'gray',
        style: 'filled',
        class:
          'bg-[#F2F2F2] text-[var(--color-text-and-icon-default)] hover:after:bg-[#F2F2F2] active:after:bg-[#F2F2F2] disabled:bg-[#F2F2F2] disabled:text-[var(--color-text-and-icon-disabled)]',
      },
      {
        color: 'primary',
        style: 'filled',
        class:
          'bg-[var(--color-brand-primary)] text-[var(--color-text-and-icon-inverse)] hover:after:bg-[var(--comp-button-primary-filled-filled-hover)] active:after:bg-[var(--comp-button-primary-filled-filled-pressed)] disabled:bg-[var(--comp-button-primary-filled-filled-disabled)] disabled:text-[var(--color-text-and-icon-disabled)]',
      },
      {
        color: 'primary',
        style: 'outlined',
        class:
          'border-[var(--comp-button-primary-outlined-outlined-stroke-enabled)] text-[var(--color-brand-primary)] hover:after:bg-[var(--comp-button-primary-outlined-outlined-hover)] active:after:bg-[var(--comp-button-primary-outlined-outlined-pressed)] disabled:border-[var(--comp-button-primary-outlined-outlined-stroke-disabled)] disabled:bg-[var(--comp-button-primary-outlined-outlined-disabled)] disabled:text-[var(--comp-button-primary-text-disabled)]',
      },
      {
        color: 'secondary',
        style: 'filled',
        class:
          'bg-[var(--color-brand-secondary)] text-[var(--color-text-and-icon-inverse)] hover:after:bg-[var(--comp-button-secondary-filled-filled-hover)] active:after:bg-[var(--comp-button-secondary-filled-filled-pressed)] disabled:bg-[var(--comp-button-secondary-filled-filled-disabled)] disabled:text-[var(--color-text-and-icon-disabled)]',
      },
      {
        color: 'secondary',
        style: 'outlined',
        class:
          'border-[var(--comp-button-secondary-outlined-outlined-stroke-enabled)] text-[var(--color-brand-secondary)] hover:after:bg-[var(--comp-button-secondary-outlined-outlined-hover)] active:after:bg-[var(--comp-button-secondary-outlined-outlined-pressed)] disabled:border-[var(--comp-button-secondary-outlined-outlined-stroke-disabled)] disabled:bg-[var(--comp-button-secondary-outlined-outlined-disabled)] disabled:text-[var(--comp-button-secondary-text-disabled)]',
      },
    ],
    defaultVariants: {
      color: 'primary',
      style: 'filled',
      size: 'lg',
    },
  }
)

const iconSizeClass = {
  lg: 'size-5',
  md: 'size-5',
  sm: 'size-5',
  xs: 'size-4',
}

type ButtonProps = Omit<React.ComponentProps<'button'>, 'style'> &
  VariantProps<typeof buttonVariants> & {
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
  }

function Button({
  className,
  color,
  size,
  style,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) {
  const iconClass = iconSizeClass[size ?? 'md']

  return (
    <button
      className={cn(buttonVariants({ color, style, size, className }))}
      {...props}>
      {leftIcon && (
        <span
          aria-hidden='true'
          className={cn(
            'flex shrink-0 items-center justify-center',
            iconClass
          )}>
          {leftIcon}
        </span>
      )}
      {children}
      {rightIcon && (
        <span
          aria-hidden='true'
          className={cn(
            'flex shrink-0 items-center justify-center',
            iconClass
          )}>
          {rightIcon}
        </span>
      )}
    </button>
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
