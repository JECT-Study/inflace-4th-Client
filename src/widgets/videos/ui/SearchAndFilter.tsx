'use client'

import { Suspense, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { SearchBar } from '@/shared/ui/search-bar'
import {
  FilterSelect,
  FilterSelectContent,
  FilterSelectTrigger,
  FilterSelectValue,
  FilterSelectItem,
} from '@/shared/ui/filter-select'
import { Toggle } from '@/shared/ui/toggle'
import { CalendarFilter } from './CalendarFilter'

export function SearchAndFilter() {
  return (
    <Suspense fallback={<></>}>
      <SearchAndFilterInner />
    </Suspense>
  )
}

/* 필터를 쿼리 파라미터에 반영 */
function SearchAndFilterInner() {
  const [query, setQuery] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const sort = searchParams?.get('sort') ?? 'LATEST'
  const isLong = searchParams?.get('LONG_FORM') === 'true'
  const isShort = searchParams?.get('SHORT_FORM') === 'true'
  const isAd = searchParams?.get('isAd') === 'true'

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams?.toString())
    if (value === null) {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  function handleSortChange(value: string) {
    if (value === 'LATEST') {
      updateParam('sort', null)
    } else {
      updateParam('sort', value)
    }
  }

  function handleFormatToggle(type: 'LONG_FORM' | 'SHORT_FORM') {
    const current = type === 'LONG_FORM' ? isLong : isShort
    updateParam(type, current ? null : 'true')
  }

  function handleIsAdToggle() {
    updateParam('isAd', isAd ? null : 'true')
  }

  return (
    <div className='flex h-fit w-full items-center gap-16 p-24 pb-16'>
      {/* 검색바 */}
      <SearchBar
        placeholder='영상 제목으로 검색'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClear={() => setQuery('')}
      />

      <div className='flex size-fit items-center gap-6'>
        {/* 정렬기준 선택 Drop down */}
        <FilterSelect value={sort} onValueChange={handleSortChange}>
          <FilterSelectTrigger>
            <FilterSelectValue />
          </FilterSelectTrigger>
          <FilterSelectContent>
            <FilterSelectItem value='LATEST'>최신순</FilterSelectItem>
            <FilterSelectItem value='VIEWS'>조회수순</FilterSelectItem>
            <FilterSelectItem value='LIKES'>좋아요순</FilterSelectItem>
            <FilterSelectItem value='VPH'>VPH순</FilterSelectItem>
            <FilterSelectItem value='OUTLIER'>Outlier순</FilterSelectItem>
          </FilterSelectContent>
        </FilterSelect>

        {/* 기간 선택 */}
        <CalendarFilter />

        {/* 롱폼 / 숏폼 / 광고 포함 토글 */}
        <Toggle
          label='롱폼'
          pressed={isLong}
          onClick={() => handleFormatToggle('LONG_FORM')}
        />
        <Toggle
          label='숏폼'
          pressed={isShort}
          onClick={() => handleFormatToggle('SHORT_FORM')}
        />
        <Toggle label='광고 포함' pressed={isAd} onClick={handleIsAdToggle} />
      </div>
    </div>
  )
}
