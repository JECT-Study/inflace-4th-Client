'use client'

import { useState } from 'react'
import { cn } from '@/shared/lib/utils'
import type { AdvertisementFilterQueryParams } from '@/features/influencerDetail'
import { Button } from '@/shared/ui/button'
import { CategoryDropdown } from './CategoryDropdown'
import { DateRangeField } from './DateRangeField'

export function AdvertisementFilter({
  onSearch,
}: {
  onSearch: (filter: AdvertisementFilterQueryParams) => void
}) {
  const [filter, setFilter] = useState<AdvertisementFilterQueryParams>({
    videoFormat: 'ALL',
  })

  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [hasSearched, setHasSearched] = useState(false)

  function handleChange<K extends keyof AdvertisementFilterQueryParams>(
    key: K,
    value: AdvertisementFilterQueryParams[K]
  ) {
    setFilter((prev) => ({ ...prev, [key]: value }))
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
            onStartChange={(d) => {
              setStartDate(d)
              handleChange('startDate', d?.toISOString().replace('.000Z', 'Z'))
            }}
            onEndChange={(d) => {
              setEndDate(d)
              handleChange(
                'endDate',
                d
                  ? new Date(new Date(d).setHours(23, 59, 59, 0))
                      .toISOString()
                      .replace('.000Z', 'Z')
                  : undefined
              )
            }}
          />
        </div>
      </div>
      {/* 검색하기 버튼 */}
      <Button
        color='primary'
        size='lg'
        variant='filled'
        className='w-[20rem]'
        onClick={() => {
          setHasSearched(true)
          onSearch(filter)
        }}>
        검색하기
      </Button>
    </div>
  )
}
