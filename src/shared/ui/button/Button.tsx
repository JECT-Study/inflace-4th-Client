import { cva } from 'class-variance-authority'

import { cn } from '@/shared/lib/utils'
import type { ButtonProps } from './type'

const buttonVariants = cva(
  "relative inline-flex items-center justify-center overflow-hidden font-default [font-weight:var(--font-weight-label-normal)] tracking-[-0.015em] whitespace-nowrap transition-colors select-none after:pointer-events-none after:absolute after:inset-0 after:content-[''] hover:after:bg-[var(--btn-overlay-hover,transparent)] active:after:bg-[var(--btn-overlay-active,transparent)] disabled:pointer-events-none",
  {
    variants: {
      color: {
        primary: '',
        secondary: '',
        gray: '',
      },
      size: {
        lg: 'gap-[var(--spacing-6)] rounded-[var(--radius-6)] px-[var(--spacing-20)] py-[var(--spacing-10)] text-[length:var(--text-label-lg)] leading-label-lg',
        md: 'gap-[var(--spacing-6)] rounded-[var(--radius-6)] px-[var(--spacing-16)] py-[var(--spacing-8)] text-[length:var(--text-label-md)] leading-label-md',
        sm: 'gap-[var(--spacing-6)] rounded-[var(--radius-6)] px-[var(--spacing-12)] py-[var(--spacing-8)] text-[length:var(--text-label-sm)] leading-label-sm',
        xs: 'gap-[var(--spacing-4)] rounded-[var(--radius-6)] px-[var(--spacing-12)] py-[var(--spacing-6)] text-[length:var(--text-label-xs)] leading-label-xs',
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
          'bg-[var(--color-background-gray-stronger)] text-[var(--color-text-and-icon-primary)] [--btn-overlay-active:var(--comp-button-primary-filled-filled-pressed)] [--btn-overlay-hover:var(--comp-button-primary-filled-filled-hover)] disabled:bg-[var(--color-background-gray-stronger)] disabled:text-[var(--color-text-and-icon-disabled)]',
      },
      {
        color: 'primary',
        style: 'filled',
        class:
          'bg-[var(--color-brand-primary)] text-[var(--color-text-and-icon-inverse)] [--btn-overlay-active:var(--comp-button-primary-filled-filled-pressed)] [--btn-overlay-hover:var(--comp-button-primary-filled-filled-hover)] disabled:bg-[var(--comp-button-primary-filled-filled-disabled)] disabled:text-[var(--comp-button-primary-text-disabled)]',
      },
      {
        color: 'primary',
        style: 'outlined',
        class:
          'border-[var(--comp-button-primary-outlined-outlined-stroke-enabled)] text-[var(--color-brand-primary)] [--btn-overlay-active:var(--comp-button-primary-outlined-outlined-pressed)] [--btn-overlay-hover:var(--comp-button-primary-outlined-outlined-hover)] disabled:border-[var(--comp-button-primary-outlined-outlined-stroke-disabled)] disabled:bg-[var(--comp-button-primary-outlined-outlined-disabled)] disabled:text-[var(--comp-button-primary-text-disabled)]',
      },
      {
        color: 'secondary',
        style: 'filled',
        class:
          'bg-[var(--color-brand-secondary)] text-[var(--color-text-and-icon-inverse)] [--btn-overlay-active:var(--comp-button-secondary-filled-filled-pressed)] [--btn-overlay-hover:var(--comp-button-secondary-filled-filled-hover)] disabled:bg-[var(--comp-button-secondary-filled-filled-disabled)] disabled:text-[var(--comp-button-secondary-text-disabled)]',
      },
      {
        color: 'secondary',
        style: 'outlined',
        class:
          'border-[var(--comp-button-secondary-outlined-outlined-stroke-enabled)] text-[var(--color-brand-secondary)] [--btn-overlay-active:var(--comp-button-secondary-outlined-outlined-pressed)] [--btn-overlay-hover:var(--comp-button-secondary-outlined-outlined-hover)] disabled:border-[var(--comp-button-secondary-outlined-outlined-stroke-disabled)] disabled:bg-[var(--comp-button-secondary-outlined-outlined-disabled)] disabled:text-[var(--comp-button-secondary-text-disabled)]',
      },
    ],
    defaultVariants: {
      color: 'primary',
      style: 'filled',
      size: 'lg',
    },
  }
)

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
  return (
    <button
      className={cn(buttonVariants({ color, style, size, className }))}
      {...props}>
      {leftIcon && (
        <span
          aria-hidden='true'
          className='flex h-[1em] w-[1em] shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full [&>svg_*]:fill-current'>
          {leftIcon}
        </span>
      )}
      {children}
      {rightIcon && (
        <span
          aria-hidden='true'
          className='flex h-[1em] w-[1em] shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full [&>svg_*]:fill-current'>
          {rightIcon}
        </span>
      )}
    </button>
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
