'use client'

import { Toggle as TogglePrimitive } from 'radix-ui'
import IconDelete from '@/shared/assets/x-bold.svg?react'

import { cn } from '@/shared/lib/utils'

type ToggleProps = {
  label?: string
  pressed?: boolean
  onClick?: () => void
  className?: string
  children?: React.ReactNode
}

function Toggle({ label, pressed, onClick, className, children }: ToggleProps) {
  return (
    <TogglePrimitive.Root
      data-slot='toggle'
      pressed={pressed}
      className={cn(
        /* 레이아웃 */
        'group inline-flex items-center',

        /* 크기 & 간격 */
        'size-fit rounded-[50rem] px-16 py-10',

        /* 타이포그래피 */
        'text-noto-label-sm-thin text-text-and-icon-secondary',

        /* 색상 */
        'border border-stroke-border-gray-default bg-transparent',

        /* 기본 상태 */
        'cursor-pointer transition-all outline-none select-none',

        /* hover */
        'hover:bg-btn-secondary-outlined-hover hover:text-text-and-icon-secondary',

        /* disabled */
        'disabled:pointer-events-none disabled:opacity-50',

        /* selected */
        'data-[state=on]:bg-brand-secondary data-[state=on]:text-noto-label-sm-normal data-[state=on]:text-white',

        className
      )}
      onClick={onClick}>
      <div className='flex size-fit items-center gap-4'>
        {children ?? label}
        <IconDelete className='my-auto w-0 overflow-hidden transition-all duration-200 group-data-[state=on]:w-[1em] [&_path]:fill-white' />
      </div>
    </TogglePrimitive.Root>
  )
}

export { Toggle }
