'use client'

import { cn } from '@/shared/lib/utils'
import {
  SORT_CRITERIA_OPTIONS,
  type SortCriteria,
} from '@/features/competitor'

interface CompetitorSortTabsProps {
  value: SortCriteria
  onChange: (next: SortCriteria) => void
}

export function CompetitorSortTabs({
  value,
  onChange,
}: CompetitorSortTabsProps) {
  return (
    <div className='flex items-center'>
      {SORT_CRITERIA_OPTIONS.map(({ value: v, label }, index) => {
        const isActive = v === value
        return (
          <div key={v} className='flex items-center'>
            {index > 0 && (
              <span
                aria-hidden='true'
                className='px-0 text-noto-label-xs-thin text-text-and-icon-tertiary'>
                ・
              </span>
            )}
            <button
              type='button'
              onClick={() => onChange(v)}
              className={cn(
                'cursor-pointer rounded-full px-8 py-4 transition-colors',
                isActive
                  ? 'text-noto-label-md-bold text-brand-secondary'
                  : 'text-noto-label-md-normal text-text-and-icon-tertiary hover:text-text-and-icon-secondary'
              )}>
              {label}
            </button>
          </div>
        )
      })}
    </div>
  )
}
