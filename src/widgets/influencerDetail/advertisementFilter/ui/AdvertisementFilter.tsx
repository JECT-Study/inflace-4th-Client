'use client'

import { cn } from '@/shared/lib/utils'
import type { AdvertisementFilterQueryParams } from '@/features/influencerDetail'
import { Button } from '@/shared/ui/button'
import { CategoryDropdown } from './CategoryDropdown'
import { DateRangeField } from './DateRangeField'

interface AdvertisementFilterProps {
  filter: AdvertisementFilterQueryParams
  onFilterChange: (filter: AdvertisementFilterQueryParams) => void
  hasSearched: boolean
  onSearch: (filter: AdvertisementFilterQueryParams) => void
}

export function AdvertisementFilter({
  filter,
  onFilterChange,
  hasSearched,
  onSearch,
}: AdvertisementFilterProps) {
  const startDate = filter.startDate ? new Date(filter.startDate) : undefined
  const endDate = filter.endDate ? new Date(filter.endDate) : undefined

  function handleChange<K extends keyof AdvertisementFilterQueryParams>(
    key: K,
    value: AdvertisementFilterQueryParams[K]
  ) {
    onFilterChange({ ...filter, [key]: value })
  }

  return (
    <div
      className={cn(
        'flex w-full items-end justify-center gap-[6.4rem] bg-background-gray-default py-xl',
        !hasSearched ? 'pb-[60rem]' : ''
      )}>
      <div className='flex gap-[6rem]'>
        {/* 카테고리 */}
        <div className='flex flex-wrap items-start gap-64'>
          <CategoryDropdown
            value={filter.categoryId ?? ''}
            onChange={(v) => handleChange('categoryId', v || undefined)}
          />
        </div>
        {/* 업로드 날짜 */}
        <div className='flex flex-wrap items-start gap-x-64 gap-y-40'>
          <DateRangeField
            startDate={startDate}
            endDate={endDate}
            onStartChange={(d) => handleChange('startDate', d?.toISOString())}
            onEndChange={(d) =>
              handleChange(
                'endDate',
                d
                  ? new Date(new Date(d).setHours(23, 59, 59, 0)).toISOString()
                  : undefined
              )
            }
          />
        </div>
      </div>
      {/* 검색하기 버튼 */}
      <Button
        color='primary'
        size='lg'
        variant='filled'
        className='w-[20rem]'
        onClick={() => onSearch(filter)}>
        검색하기
      </Button>
    </div>
  )
}
