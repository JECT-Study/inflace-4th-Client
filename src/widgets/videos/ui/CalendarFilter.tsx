'use client'

import * as React from 'react'
import { type DateRange } from 'react-day-picker'
import { subMonths, format } from 'date-fns'
import { formatDate } from '@/shared/lib/format'
import { Toggle } from '@/shared/ui/toggle'
import { Calendar } from '@/shared/ui/calendar'

interface CalendarFilterProps {
  onRangeChange: (startDate: string | null, endDate: string | null) => void
}

/* 기간 범위 선택 토글 + 캘린더 드롭다운 복합 컴포넌트 */
export function CalendarFilter({ onRangeChange }: CalendarFilterProps) {
  /* 캘린더 드롭다운 열림/닫힘 상태 */
  const [isOpen, setIsOpen] = React.useState(false)
  /* 선택된 날짜 범위 (ex. 2026.04.12 ~ 2026.04.13) */
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    undefined
  )

  /* 컨테이너 외부 클릭 시 캘린더 닫기 */
  const containerRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  /* 토글 클릭: 날짜 범위가 모두 선택된 상태면 초기화, 아니면 캘린더 열기/닫기 */
  function handleToggleClick() {
    if (dateRange?.from && dateRange?.to) {
      setDateRange(undefined)
      setIsOpen(false)
      onRangeChange(null, null)
    } else {
      setIsOpen((prev) => !prev)
    }
  }

  /* 확인 버튼: 선택된 범위를 상위로 전달하고 캘린더 닫기 */
  function handleConfirm() {
    setIsOpen(false)
    if (dateRange?.from) {
      const startDate = format(dateRange.from, 'yyyy-MM-dd')
      const endDate = dateRange.to
        ? format(dateRange.to, 'yyyy-MM-dd')
        : startDate
      onRangeChange(startDate, endDate)
    }
  }

  return (
    <div ref={containerRef} className='relative'>
      {/* 기간 선택 토글 버튼 */}
      <Toggle
        pressed={isOpen || !!(dateRange?.from && dateRange?.to)}
        onClick={handleToggleClick}>
        {dateRange?.from && dateRange?.to
          ? dateRange.from.toDateString() === dateRange.to.toDateString()
            ? /* 시작일, 종료일이 같으면 단일 날짜만 표시 (ex. 2026.04.12) */
              `${formatDate(dateRange.from.toISOString()).year}.${formatDate(dateRange.from.toISOString()).month}.${formatDate(dateRange.from.toISOString()).day}`
            : /* 시작일, 종료일이 다르면 기간 표시 (ex. 2026.04.12 ~ 2026.04.23) */
              `${formatDate(dateRange.from.toISOString()).year}.${formatDate(dateRange.from.toISOString()).month}.${formatDate(dateRange.from.toISOString()).day} ~ ${formatDate(dateRange.to.toISOString()).year}.${formatDate(dateRange.to.toISOString()).month}.${formatDate(dateRange.to.toISOString()).day}`
          : dateRange?.from
            ? `${formatDate(dateRange.from.toISOString()).year}.${formatDate(dateRange.from.toISOString()).month}.${formatDate(dateRange.from.toISOString()).day}`
            : '기간'}
      </Toggle>

      {/* 캘린더 드롭다운 */}
      {isOpen && (
        <div className='top absolute z-50 mt-8'>
          <Calendar
            mode='range'
            defaultMonth={subMonths(dateRange?.from ?? new Date(), 1)}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            disabled={(date) =>
              date > new Date() || date < new Date('1900-01-01')
            }
            onConfirm={handleConfirm}
            confirmDisabled={!dateRange?.from}
          />
        </div>
      )}
    </div>
  )
}
