'use client'

import * as React from 'react'
import Image from 'next/image'
import { cva } from 'class-variance-authority'
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui'

import { cn } from '@/shared/lib/utils'
import type { ToggleGroupProps, ToggleGroupItemProps } from './type'

const ToggleGroupContext = React.createContext<{
  size?: 'lg' | 'fit'
  spacing?: number
  type?: 'multiple' | 'single'
  orientation?: 'horizontal' | 'vertical'
}>({
  size: 'lg',
  spacing: 2,
  orientation: 'horizontal',
})

const toggleGroupItemVariants = cva(
  "relative inline-flex cursor-pointer items-center justify-center overflow-hidden border border-[#e6e6e6] bg-transparent font-default text-[length:var(--text-label-md)] [font-weight:var(--font-weight-label-normal)] whitespace-nowrap text-[var(--color-text-and-icon-secondary)] transition-colors select-none after:pointer-events-none after:absolute after:inset-0 after:content-[''] hover:border-[var(--comp-button-primary-outlined-outlined-stroke-enabled)] hover:bg-[var(--comp-button-primary-outlined-outlined-hover)] hover:after:bg-[var(--btn-overlay-hover,transparent)] active:after:bg-[var(--btn-overlay-active,transparent)] disabled:pointer-events-none disabled:opacity-50 data-[state=on]:border-[var(--comp-button-primary-outlined-outlined-stroke-enabled)] data-[state=on]:bg-[var(--comp-button-primary-outlined-outlined-pressed)] data-[state=on]:text-[var(--color-brand-primary)]",
  {
    variants: {
      size: {
        lg: 'h-[86px] w-[118px] gap-[var(--spacing-2xs)] rounded-[var(--radius-6)] py-[var(--spacing-xs)] leading-[var(--leading-label-md)] font-medium',
        fit: 'gap-[var(--spacing-4)] rounded-full px-[var(--spacing-2xs)] py-[var(--spacing-8)] leading-[var(--leading-label-md)]',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  }
)

function ToggleGroup({
  className,
  spacing = 2,
  orientation = 'horizontal',
  size = 'lg',
  children,
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot='toggle-group'
      data-orientation={orientation}
      className={cn(
        'flex w-fit flex-wrap items-center',
        orientation === 'vertical' ? 'flex-col items-stretch' : 'flex-row',
        className
      )}
      style={{ gap: `var(--spacing-${spacing})` }}
      {...(props as React.ComponentProps<typeof ToggleGroupPrimitive.Root>)}>
      <ToggleGroupContext.Provider value={{ size, spacing, orientation }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  size,
  iconPosition = 'left',
  imgSrc,
  imgAlt = '',
  children,
  ...props
}: ToggleGroupItemProps) {
  const context = React.useContext(ToggleGroupContext)
  const resolvedSize = size ?? context.size ?? 'lg'

  return (
    <ToggleGroupPrimitive.Item
      data-slot='toggle-group-item'
      data-size={resolvedSize}
      className={cn(
        toggleGroupItemVariants({ size: resolvedSize }),
        iconPosition === 'top' && 'flex-col',
        className
      )}
      {...props}>
      {imgSrc && (
        <div
          className={cn(
            'relative shrink-0 transition-all',
            resolvedSize === 'lg'
              ? 'h-(--spacing-md) w-(--spacing-md)'
              : 'flex h-(--spacing-xs) w-(--spacing-xs)'
          )}>
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            sizes={resolvedSize === 'lg' ? '24px' : '16px'}
            className='object-contain'
          />
        </div>
      )}
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem, toggleGroupItemVariants }
