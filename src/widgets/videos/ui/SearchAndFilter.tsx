'use client'

import { Suspense, useState, useEffect } from 'react'
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
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const sort = searchParams?.get('sort') ?? 'LATEST'
  const format = searchParams?.get('format')
  const isLong = format === 'LONG_FORM' || format === 'ALL'
  const isShort = format === 'SHORT_FORM' || format === 'ALL'
  const isAd = searchParams?.get('isAd') === 'true'

  /**
   * 검색값 반영
   * 검색창이 focused일 때만 500ms 간격으로 api 요청
   */
  const [query, setQuery] = useState(searchParams?.get('keyword') ?? '')
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (!isFocused) return
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams?.toString())
      if (query) {
        params.set('keyword', query)
      } else {
        params.delete('keyword')
      }
      router.replace(`${pathname}?${params.toString()}`)
    }, 500) //debounce 500ms
    return () => clearTimeout(timer)
  }, [query, isFocused, searchParams, router, pathname])

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams?.toString())
    if (value === null) {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  /* 정렬기준 선택 */
  function handleSortChange(value: string) {
    if (value === 'LATEST') {
      updateParam('sort', null)
    } else {
      updateParam('sort', value)
    }
  }

  /* 숏폼 / 롱폼 선택 */
  function handleFormatToggle(type: 'LONG_FORM' | 'SHORT_FORM') {
    if (format === 'ALL') {
      // 둘 다 선택 → 클릭한 것만 해제 (반대 타입만 남김)
      const opposite = type === 'LONG_FORM' ? 'SHORT_FORM' : 'LONG_FORM'
      updateParam('format', opposite)
    } else if (format === type) {
      // 이미 단독 선택 → 해제
      updateParam('format', null)
    } else if (format !== null) {
      // 반대 타입이 선택된 상태 → 둘 다 선택
      updateParam('format', 'ALL')
    } else {
      // 아무것도 선택 안 됨 → 단독 선택
      updateParam('format', type)
    }
  }

  /* 광고여부 선택 */
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
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
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
