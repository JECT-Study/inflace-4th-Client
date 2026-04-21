'use client'

import { useState } from 'react'
import { SearchBar } from '@/shared/ui/searchbar'
import {
  FilterSelect,
  FilterSelectContent,
  FilterSelectTrigger,
  FilterSelectValue,
  FilterSelectItem,
} from '@/shared/ui/filter-select'

export function SearchAndFilter() {
  const [query, setQuery] = useState('')

  return (
    <div className='flex h-fit w-full items-center gap-16 p-24 pb-16'>
      <SearchBar
        placeholder='영상 제목으로 검색'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClear={() => setQuery('')}
      />

      <FilterSelect defaultValue='최신순'>
        <FilterSelectTrigger>
          <FilterSelectValue />
        </FilterSelectTrigger>
        <FilterSelectContent>
          <FilterSelectItem value='최신순'>최신순</FilterSelectItem>
          <FilterSelectItem value='조회수순'>조회수순</FilterSelectItem>
          <FilterSelectItem value='좋아요순'>좋아요순</FilterSelectItem>
          <FilterSelectItem value='VPH순'>VPH순</FilterSelectItem>
          <FilterSelectItem value='Outlier순'>Outlier순</FilterSelectItem>
        </FilterSelectContent>
      </FilterSelect>
    </div>
  )
}
