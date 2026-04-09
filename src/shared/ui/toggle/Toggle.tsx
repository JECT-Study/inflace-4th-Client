'use client'

import * as React from 'react'
import { Toggle as TogglePrimitive } from 'radix-ui'
import IconDelete from '@/shared/assets/x-bold.svg?react'

import { cn } from '@/shared/lib/utils'

const toggleClass =
  'group cursor-pointer inline-flex items-center rounded-full border border-stroke-border-gray-default bg-transparent px-16 py-8 text-(length:--text-label-sm) leading-(--leading-label-sm) font-medium whitespace-nowrap text-text-and-icon-secondary transition-all outline-none select-none hover:bg-(--comp-button-secondary-outlined-outlined-hover) hover:text-text-and-icon-secondary disabled:pointer-events-none disabled:opacity-50 data-[state=on]:border-primary data-[state=on]:bg-brand-secondary data-[state=on]:text-white'

type ToggleProps = React.ComponentProps<typeof TogglePrimitive.Root>

function Toggle({ className, children, ...props }: ToggleProps) {
  return (
    <TogglePrimitive.Root
      data-slot='toggle'
      className={cn(toggleClass, className)}
      {...props}>
      {children}
      <span
        className='flex w-0 shrink-0 items-center overflow-hidden opacity-0 transition-all duration-200 group-data-[state=on]:ml-4 group-data-[state=on]:w-12 group-data-[state=on]:opacity-100'>
        <IconDelete className='size-12 shrink-0 [&_path]:fill-white' />
      </span>
    </TogglePrimitive.Root>
  )
}

export { Toggle }
