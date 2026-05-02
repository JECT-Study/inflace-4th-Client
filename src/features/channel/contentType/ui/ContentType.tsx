'use client'

import { cn } from '@/shared/lib/utils'

interface FilterOption<T> {
  label: string
  filter: T
}

interface Props<T> {
  options: FilterOption<T>[]
  filter: T
  onFilterChange: (filter: T) => void
  className?: string
}

export function ContentType<T>({
  options,
  filter,
  onFilterChange,
  className,
}: Props<T>) {
  return (
    <div
      className={cn(
        'flex h-full w-fit gap-8 text-noto-label-sm-normal text-text-and-icon-disabled',
        className
      )}>
      {options.map((option, index) => (
        <button
          key={String(option.filter)}
          onClick={() => onFilterChange(option.filter)}
          className={cn(
            'flex cursor-pointer items-center px-8 py-4',
            filter === option.filter && 'text-text-and-icon-primary',
            index > 0 &&
              'relative after:absolute after:top-1/2 after:-left-4 after:h-2 after:w-2 after:-translate-y-1/2 after:rounded-full after:bg-text-and-icon-disabled after:content-[""]'
          )}>
          {option.label}
        </button>
      ))}
    </div>
  )
}
