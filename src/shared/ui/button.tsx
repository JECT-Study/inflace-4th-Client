import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/shared/lib/utils'

const buttonVariants = cva(
  "relative overflow-hidden inline-flex items-center justify-center gap-2 font-[var(--font-weight-label-normal)] whitespace-nowrap transition-colors disabled:pointer-events-none select-none after:absolute after:inset-0 after:content-[''] after:pointer-events-none",
  {
    variants: {
      color: {
        primary: '',
        secondary: '',
        gray: '',
      },
      style: {
        filled: '',
        outlined: 'border bg-transparent',
      },
      size: {
        lg: 'h-[var(--spacing-48)] px-[var(--spacing-20)] rounded-[var(--radius-8)] text-[var(--text-label-lg)] leading-[var(--leading-label-lg)]',
        md: 'h-[var(--spacing-40)] px-[var(--spacing-16)] rounded-[var(--radius-8)] text-[var(--text-label-md)] leading-[var(--leading-label-md)]',
        sm: 'h-[var(--spacing-32)] px-[var(--spacing-12)] rounded-[var(--radius-6)] text-[var(--text-label-sm)] leading-[var(--leading-label-sm)]',
        xs: 'h-[var(--spacing-28)] px-[var(--spacing-8)] rounded-[var(--radius-6)] text-[var(--text-label-xs)] leading-[var(--leading-label-xs)]',
      },
    },
    compoundVariants: [
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
          'border-[var(--comp-button-primary-outlined-outlined-stroke-enabled)] text-[var(--color-brand-primary)] hover:after:bg-[var(--comp-button-primary-outlined-outlined-hover)] active:after:bg-[var(--comp-button-primary-outlined-outlined-pressed)] disabled:bg-[var(--comp-button-primary-outlined-outlined-disabled)] disabled:border-[var(--comp-button-primary-outlined-outlined-stroke-disabled)] disabled:text-[var(--comp-button-primary-text-disabled)]',
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
          'border-[var(--comp-button-secondary-outlined-outlined-stroke-enabled)] text-[var(--color-brand-secondary)] hover:after:bg-[var(--comp-button-secondary-outlined-outlined-hover)] active:after:bg-[var(--comp-button-secondary-outlined-outlined-pressed)] disabled:bg-[var(--comp-button-secondary-outlined-outlined-disabled)] disabled:border-[var(--comp-button-secondary-outlined-outlined-stroke-disabled)] disabled:text-[var(--comp-button-secondary-text-disabled)]',
      },
      {
        color: 'gray',
        style: 'filled',
        class:
          'bg-[var(--color-background-gray-stronger)] text-[var(--color-text-and-icon-default)] hover:after:bg-black/[.08] active:after:bg-black/[.16] disabled:bg-[var(--color-background-gray-default)] disabled:text-[var(--color-text-and-icon-disabled)]',
      },
    ],
    defaultVariants: {
      color: 'primary',
      style: 'filled',
      size: 'md',
    },
  }
)

type ButtonProps = Omit<React.ComponentProps<'button'>, 'style'> &
  VariantProps<typeof buttonVariants> & {
    leftIconSrc?: string
    rightIconSrc?: string
  }

function Button({
  className,
  color,
  style,
  size,
  leftIconSrc,
  rightIconSrc,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ color, style, size, className }))}
      {...props}
    >
      {leftIconSrc && (
        <img
          src={leftIconSrc}
          alt=''
          aria-hidden='true'
          className='size-4 shrink-0 object-contain'
        />
      )}
      {children}
      {rightIconSrc && (
        <img
          src={rightIconSrc}
          alt=''
          aria-hidden='true'
          className='size-4 shrink-0 object-contain'
        />
      )}
    </button>
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
