'use client'

import * as React from 'react'
import { Select as SelectPrimitive } from 'radix-ui'

import { cn } from '@/shared/lib/utils'
import IconDown from '@/shared/assets/down-bold.svg?react'
import type { SelectTriggerProps } from './type'

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot='select' {...props} />
}

function SelectGroup({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return (
    <SelectPrimitive.Group
      data-slot='select-group'
      className={cn('scroll-my-1', className)}
      {...props}
    />
  )
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot='select-value' {...props} />
}

function SelectTrigger({
  className,
  icon = 'right',
  children,
  ...props
}: SelectTriggerProps) {
  const showLeft = icon === 'left' || icon === 'all'
  const showRight = icon === 'right' || icon === 'all'

  return (
    <SelectPrimitive.Trigger
      data-slot='select-trigger'
      className={cn(
        "group flex w-fit cursor-pointer items-center gap-4 rounded-full border border-stroke-border-gray-default bg-transparent px-16 py-8 text-(length:--text-label-sm) leading-(--leading-label-sm) font-medium whitespace-nowrap text-text-and-icon-secondary transition-colors outline-none select-none not-data-placeholder:bg-brand-secondary not-data-placeholder:text-white hover:bg-(--comp-button-secondary-outlined-outlined-hover) hover:text-text-and-icon-secondary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-6 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}>
      {showLeft && (
        <IconDown className='pointer-events-none size-16 transition-transform group-data-[state=open]:rotate-180' />
      )}
      {children}
      <SelectPrimitive.Icon asChild>
        {showRight && (
          <IconDown className='pointer-events-none size-16 transition-transform group-data-[state=open]:rotate-180' />
        )}
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = 'popper',
  align = 'start',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot='select-content'
        data-align-trigger={position === 'item-aligned'}
        className={cn(
          'relative z-50 max-h-(--radix-select-content-available-height) min-w-[18rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-6 bg-popover text-popover-foreground shadow-[0_4px_12px_0_rgba(0,0,0,0.12)] duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        position={position}
        align={align}
        {...props}>
        <SelectPrimitive.Viewport
          data-position={position}
          className={cn(
            'data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)',
            position === 'popper' && ''
          )}>
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot='select-item'
      className={cn(
        "relative flex w-full cursor-pointer items-center rounded-6 p-16 text-(length:--text-label-sm) leading-(--leading-label-sm) font-medium text-text-and-icon-secondary outline-hidden select-none focus:bg-(--comp-button-secondary-outlined-outlined-hover) focus:text-text-and-icon-default data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}>
      <span className='pointer-events-none absolute right-2 flex size-4 items-center justify-center'>
        <SelectPrimitive.ItemIndicator>
          <IconDown className='pointer-events-none' />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
}
