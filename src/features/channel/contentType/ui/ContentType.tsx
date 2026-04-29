'use client'

import { cn } from '@/shared/lib/utils'

const FILTER_OPTIONS = [
  { label: '롱폼', isShort: false },
  { label: '숏폼', isShort: true },
] as const

interface Props {
  isShort: boolean
  onIsShortChange: (isShort: boolean) => void
}

export function ContentType({ isShort, onIsShortChange }: Props) {
  return (
    <div className='flex h-full w-fit gap-8 text-noto-label-sm-normal text-text-and-icon-disabled'>
      {FILTER_OPTIONS.map((option, index) => (
        <button
          key={option.label}
          onClick={() => onIsShortChange(option.isShort)}
          className={cn(
            'flex cursor-pointer items-center px-8 py-4',
            isShort === option.isShort && 'text-text-and-icon-primary',
            index > 0 &&
              'relative after:absolute after:top-1/2 after:-left-4 after:h-2 after:w-2 after:-translate-y-1/2 after:rounded-full after:bg-text-and-icon-disabled after:content-[""]'
          )}>
          {option.label}
        </button>
      ))}
    </div>
  )
}
