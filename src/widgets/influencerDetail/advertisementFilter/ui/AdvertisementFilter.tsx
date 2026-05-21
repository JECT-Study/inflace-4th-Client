'use client'

import { useState, useRef, useEffect } from 'react'
import { Select } from 'radix-ui'
import { cn } from '@/shared/lib/utils'
import { formatDate } from '@/shared/lib/format'
import { Calendar } from '@/shared/ui/calendar'
import { mockYoutubeCategories } from '@/entities/youtubeCategory/mock/mockYoutubeCategories'
import type { AdvertisementFilterQueryParams } from '@/features/influencerDetail'
import { Button } from '@/shared/ui/button'
import IconCalendar from '@/shared/assets/calendar-bold.svg'
import IconDown from '@/shared/assets/down-bold.svg'

type SelectOption = { value: string; label: string }

const CATEGORY_OPTIONS: SelectOption[] = mockYoutubeCategories.map(
  ({ id, title }) => ({ value: String(id), label: title })
)

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
        !hasSearched ? 'pb-[63.2rem]' : ''
      )}>
      <div className='flex gap-[6rem]'>
        {/* 카테고리 */}
        <div className='flex flex-wrap items-start gap-64'>
          <DropdownField
            label='카테고리'
            value={filter.categoryId ?? ''}
            onChange={(v) => handleChange('categoryId', v || undefined)}
            options={CATEGORY_OPTIONS}
            placeholder='카테고리 선택'
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

/* ───────── 내부 컴포넌트 ───────── */

function DropdownField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: SelectOption[]
  placeholder: string
}) {
  return (
    <div className='flex flex-col gap-12'>
      <p className='text-noto-label-md-bold text-text-and-icon-primary'>
        {label}
      </p>
      <Select.Root
        key={value || 'empty'}
        value={value || undefined}
        onValueChange={(v) => onChange(v)}>
        <Select.Trigger
          className={cn(
            'group flex w-[22.4rem] cursor-pointer items-center justify-between gap-10 rounded-6 border border-stroke-border-gray-stronger bg-white px-16 py-12 text-left text-noto-label-md-normal transition-colors outline-none',
            'hover:bg-btn-secondary-outlined-hover',
            'data-placeholder:text-text-and-icon-disabled',
            'not-data-placeholder:text-text-and-icon-primary'
          )}>
          <Select.Value placeholder={placeholder} />
          <Select.Icon asChild>
            <IconDown className='size-20 text-text-and-icon-secondary transition-transform group-data-[state=open]:rotate-180' />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position='popper'
            side='bottom'
            avoidCollisions={false}
            sideOffset={8}
            className={cn(
              'z-50 flex h-fit w-[38rem] flex-col rounded-6 bg-white p-16 shadow-[0px_8px_12px_0px_var(--primitivecolortrasparent-brand-deep-900-transparent-16),0px_4px_6px_0px_var(--primitivecolortrasparent-brand-deep-900-transparent-24)]',
              'data-open:animate-in data-open:fade-in-0',
              'data-closed:animate-out data-closed:fade-out-0'
            )}>
            <Select.Viewport className='grid grid-cols-2 gap-2'>
              {options.map(({ value: v, label }) => (
                <Select.Item
                  key={v}
                  value={v}
                  className={cn(
                    'flex cursor-pointer items-center rounded-4 px-12 py-10 text-noto-label-md-normal text-text-and-icon-secondary outline-none select-none',
                    'hover:bg-btn-secondary-outlined-hover hover:text-text-and-icon-default'
                  )}>
                  <Select.ItemText>{label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}

function DateRangeField({
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
      <div ref={containerRef} className='relative w-[22.4rem] flex-1'>
        <button
          type='button'
          onClick={() => setIsOpen((p) => !p)}
          className={cn(
            'flex w-full cursor-pointer items-center gap-10 rounded-6 border border-stroke-border-gray-stronger bg-white px-16 py-12 text-left text-noto-label-md-normal transition-colors',
            value ? 'text-text-and-icon-primary' : 'text-text-and-icon-disabled'
          )}>
          <IconCalendar className='size-20 text-text-and-icon-secondary' />
          <span className='flex-1'>{displayText}</span>
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
