import { cva } from 'class-variance-authority'

import { cn } from '@/shared/lib/utils'
import type { ButtonProps } from './type'

const buttonVariants = cva(
  "font-sans relative flex size-fit items-center justify-center gap-6 overflow-hidden whitespace-nowrap transition-colors select-none after:pointer-events-none after:absolute after:inset-0 after:content-[''] hover:after:bg-[var(--btn-overlay-hover,transparent)] active:after:bg-[var(--btn-overlay-active,transparent)] disabled:pointer-events-none",
  {
    variants: {
      color: {
        primary: '',
        secondary: '',
        gray: '',
      },
      size: {
        lg: 'gap-10 rounded-6 px-20 py-10 text-noto-label-lg-normal',
        md: 'gap-10 rounded-6 px-16 py-8 text-noto-label-md-normal',
        sm: 'gap-10 rounded-6 px-12 py-8 text-noto-label-sm-normal',
        xs: 'gap-10 rounded-6 px-12 py-6 text-noto-label-xs-normal',
      },
      variant: {
        filled: '',
        outlined: 'border bg-transparent',
      },
    },
    compoundVariants: [
      {
        color: 'gray',
        variant: 'filled',
        class:
          'bg-background-gray-stronger text-text-and-icon-primary [--btn-overlay-active:var(--color-btn-primary-filled-pressed)] [--btn-overlay-hover:var(--color-btn-primary-filled-hover)] disabled:bg-background-gray-stronger disabled:text-text-and-icon-disabled',
      },
      {
        color: 'primary',
        variant: 'filled',
        class:
          'bg-brand-primary text-text-and-icon-inverse [--btn-overlay-active:var(--color-btn-primary-filled-pressed)] [--btn-overlay-hover:var(--color-btn-primary-filled-hover)] disabled:bg-btn-primary-filled-disabled disabled:text-btn-primary-text-disabled',
      },
      {
        color: 'primary',
        variant: 'outlined',
        class:
          'border-brand-primary/60 bg-white text-brand-primary [--btn-overlay-active:var(--color-btn-primary-outlined-pressed)] [--btn-overlay-hover:var(--color-btn-primary-outlined-hover)] disabled:border-brand-primary/24 disabled:bg-btn-primary-outlined-disabled disabled:text-btn-primary-text-disabled',
      },
      {
        color: 'secondary',
        variant: 'filled',
        class:
          'bg-brand-secondary text-text-and-icon-inverse [--btn-overlay-active:var(--color-btn-secondary-filled-pressed)] [--btn-overlay-hover:var(--color-btn-secondary-filled-hover)] disabled:bg-btn-secondary-filled-disabled disabled:text-btn-secondary-text-disabled',
      },
      {
        color: 'secondary',
        variant: 'outlined',
        class:
          'border-brand-secondary/50 text-brand-secondary [--btn-overlay-active:var(--color-btn-secondary-outlined-pressed)] [--btn-overlay-hover:var(--color-btn-secondary-outlined-hover)] disabled:border-brand-secondary/24 disabled:bg-btn-secondary-outlined-disabled disabled:text-btn-secondary-text-disabled',
      },
    ],
    defaultVariants: {
      color: 'primary',
      variant: 'filled',
      size: 'lg',
    },
  }
)

function Button({
  className,
  color,
  size,
  variant,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ color, variant, size, className }))}
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
