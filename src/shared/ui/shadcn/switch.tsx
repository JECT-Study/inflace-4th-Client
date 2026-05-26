'use client'

import * as React from 'react'
import { Switch as SwitchPrimitive } from 'radix-ui'

import { cn } from '@/shared/lib/utils'

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {}) {
  return (
    <SwitchPrimitive.Root
      data-slot='switch'
      className={cn(
        'peer group/switch relative inline-flex shrink-0 items-center rounded-full p-4 transition-all outline-none',
        // size
        'h-fit w-[5.2rem]',
        // color
        'data-checked:bg-brand-primary data-unchecked:bg-gray-200',
        className
      )}
      {...props}>
      <SwitchPrimitive.Thumb
        data-slot='switch-thumb'
        className={cn(
          'pointer-events-none block rounded-full transition-transform',
          // size
          'size-20',
          // position
          'translate-x-[calc(100%+4px)] data-unchecked:translate-x-0',
          // color
          'bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.08)]'
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
