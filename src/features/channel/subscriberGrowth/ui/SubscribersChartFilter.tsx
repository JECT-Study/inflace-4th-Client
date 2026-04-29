'use client'

import { cn } from '@/shared/lib/utils'

export const FILTER_OPTIONS = ['1주일', '1개월', '3개월', '6개월', '1년'] as const

export type FilterOption = (typeof FILTER_OPTIONS)[number]

export const FILTER_TO_RANGE: Record<FilterOption, string> = {
  '1주일': '7D',
  '1개월': '30D',
  '3개월': '90D',
  '6개월': '180D',
  '1년': '1Y',
}

interface Props {
  active: FilterOption
  onActiveChange: (option: FilterOption) => void
}

export function SubscribersChartFilter({ active, onActiveChange }: Props) {
  return (
    <div className='flex h-full w-fit gap-8 text-noto-label-sm-normal text-text-and-icon-disabled'>
      {FILTER_OPTIONS.map((option, index) => (
        <button
          key={option}
          onClick={() => onActiveChange(option)}
          className={cn(
            'flex cursor-pointer items-center px-8 py-4',
            active === option && 'text-text-and-icon-primary',
            index > 0 &&
              'relative after:absolute after:top-1/2 after:-left-4 after:h-2 after:w-2 after:-translate-y-1/2 after:rounded-full after:bg-text-and-icon-disabled after:content-[""]'
          )}>
          {option}
        </button>
      ))}
    </div>
  )
}
