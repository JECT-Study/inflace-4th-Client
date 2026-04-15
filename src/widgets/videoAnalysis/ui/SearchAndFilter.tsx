'use client'

import { SearchBar } from '@/shared/ui/searchbar'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'

export function SearchAndFilter() {
  return (
    <div className='flex h-fit w-full gap-16 p-24 pb-16'>
      <SearchBar placeholder='영상 제목으로 검색' />

      {/* Todo: select component 수정 */}
      <Select>
        <SelectTrigger>
          <SelectValue placeholder='정렬' />
        </SelectTrigger>
        <SelectContent></SelectContent>
      </Select>
    </div>
  )
}
