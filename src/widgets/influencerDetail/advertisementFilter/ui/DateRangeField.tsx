import { useState, useRef, useEffect } from 'react'
import { cn } from '@/shared/lib/utils'
import { formatDate } from '@/shared/lib/format'
import { Calendar } from '@/shared/ui/calendar'
import IconCalendar from '@/shared/assets/calendar-bold.svg'

export function DateRangeField({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
}: {
  startDate: Date | undefined
  endDate: Date | undefined
  onStartChange: (d: Date | undefined) => void
  onEndChange: (d: Date | undefined) => void
}) {
  return (
    <div className='flex flex-1 flex-col gap-12'>
      <p className='text-noto-label-md-bold text-text-and-icon-primary'>
        업로드 날짜
      </p>
      <div className='flex items-center gap-20'>
        <DatePicker
          label='시작'
          value={startDate}
          onChange={onStartChange}
          maxDate={endDate}
        />
        <DatePicker
          label='종료'
          value={endDate}
          onChange={onEndChange}
          minDate={startDate}
        />
      </div>
    </div>
  )
}

function DatePicker({
  label,
  value,
  onChange,
  minDate,
  maxDate,
}: {
  label: string
  value: Date | undefined
  onChange: (d: Date | undefined) => void
  minDate?: Date
  maxDate?: Date
}) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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

  const displayText = value
    ? (() => {
        const { year, month, day } = formatDate(value.toISOString())
        return `${year}.${month}.${day}`
      })()
    : '날짜를 선택하세요'

  return (
    <div className='flex flex-1 items-center gap-10'>
      <span className='shrink-0 text-noto-label-md-bold text-text-and-icon-secondary'>
        {label}
      </span>
      <div ref={containerRef} className='relative flex-1'>
        <button
          type='button'
          onClick={() => setIsOpen((p) => !p)}
          className='flex h-fit w-full cursor-pointer items-center gap-10 rounded-6 border border-stroke-border-gray-stronger bg-white px-16 py-12 text-left'>
          <IconCalendar className='size-20 text-text-and-icon-secondary' />
          <span
            className={cn(
              'w-[15rem] flex-1 text-noto-label-md-normal transition-colors',
              value
                ? 'text-text-and-icon-primary'
                : 'text-text-and-icon-disabled'
            )}>
            {displayText}
          </span>
        </button>
        {isOpen && (
          <div className='absolute top-full left-0 z-50 mt-8'>
            <Calendar
              mode='single'
              selected={value}
              onSelect={(d) => {
                onChange(d)
                if (d) setIsOpen(false)
              }}
              disabled={(date) => {
                if (date > new Date()) return true
                if (minDate && date < minDate) return true
                if (maxDate && date > maxDate) return true
                return false
              }}
              defaultMonth={value ?? new Date()}
            />
          </div>
        )}
      </div>
    </div>
  )
}
