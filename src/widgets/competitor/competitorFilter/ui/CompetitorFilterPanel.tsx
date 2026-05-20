'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/shared/lib/utils'
import { formatDate } from '@/shared/lib/format'
import { Button } from '@/shared/ui/button'
import { Calendar } from '@/shared/ui/calendar'
import { KeywordChipInput } from '@/shared/ui/keyword-chip-input'
import IconCalendar from '@/shared/assets/calendar-bold.svg'
import IconChevronDown from '@/shared/assets/down-bold.svg'
import {
  VIDEO_FORMAT_OPTIONS,
  type CompetitorFilterState,
  type VideoFormat,
} from '@/features/competitor'

import { CompetitorFilterDetailFields } from './CompetitorFilterDetailFields'

interface CompetitorFilterPanelProps {
  filter: CompetitorFilterState
  onChange: <K extends keyof CompetitorFilterState>(
    key: K,
    value: CompetitorFilterState[K]
  ) => void
  onReset: () => void
  onSearch: () => void
}

export function CompetitorFilterPanel({
  filter,
  onChange,
  onReset,
  onSearch,
}: CompetitorFilterPanelProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  return (
    <div className='flex w-full flex-col gap-24 bg-background-gray-default py-24'>
      {/* 헤더: 타이틀 + 초기화/검색하기 */}
      <div className='flex items-center justify-between px-32'>
        <h2 className='text-noto-title-sm-normal text-text-and-icon-default'>
          경쟁 채널 영상 검색 필터
        </h2>
        <div className='flex items-center gap-12'>
          <Button
            color='primary'
            variant='outlined'
            size='lg'
            onClick={onReset}
            className='w-[20rem]'>
            초기화
          </Button>
          <Button
            color='primary'
            variant='filled'
            size='lg'
            onClick={onSearch}
            className='w-[20rem]'>
            검색하기
          </Button>
        </div>
      </div>

      <div className='h-px w-full bg-stroke-border-gray-default' />

      {/* 콘텐츠 */}
      <div className='mx-auto flex w-full max-w-[86.4rem] flex-col gap-40 px-32'>
        {/* 영상 형태 + 업로드 날짜 */}
        <div className='flex flex-wrap items-start gap-x-64 gap-y-40'>
          <FormatField
            value={filter.videoFormat}
            onChange={(v) => onChange('videoFormat', v)}
          />
          <DateRangeField
            startDate={filter.startDate}
            endDate={filter.endDate}
            onStartChange={(d) => onChange('startDate', d)}
            onEndChange={(d) => onChange('endDate', d)}
          />
        </div>

        {/* 포함 키워드 */}
        <FieldRow label='포함 키워드'>
          <KeywordChipInput
            chips={filter.includeKeywords}
            onChange={(chips) => onChange('includeKeywords', chips)}
            placeholder='검색에 포함할 키워드를 입력해주세요 (최대 5개)'
            maxChips={5}
            variant='secondary'
          />
        </FieldRow>

        {/* 상세 필터 */}
        {isDetailOpen && (
          <CompetitorFilterDetailFields filter={filter} onChange={onChange} />
        )}
      </div>

      <div className='h-px w-full bg-stroke-border-gray-default' />

      {/* 상세 검색 토글 */}
      <div className='flex justify-center'>
        <button
          type='button'
          onClick={() => setIsDetailOpen((prev) => !prev)}
          className='flex cursor-pointer items-center gap-4 rounded-full px-16 py-6 text-noto-label-md-normal text-text-and-icon-secondary transition-colors hover:bg-background-gray-default'>
          상세 검색
          <IconChevronDown
            className={cn(
              'size-16 transition-transform',
              isDetailOpen && 'rotate-180'
            )}
          />
        </button>
      </div>
    </div>
  )
}

/* ───────── 내부 컴포넌트 ───────── */

function FieldRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className='flex w-full flex-col gap-12'>
      <p className='text-noto-label-md-bold text-text-and-icon-primary'>
        {label}
      </p>
      {children}
    </div>
  )
}

function FormatField({
  value,
  onChange,
}: {
  value: VideoFormat
  onChange: (v: VideoFormat) => void
}) {
  return (
    <div className='flex flex-col gap-12'>
      <p className='text-noto-label-md-bold text-text-and-icon-primary'>
        영상 형태
      </p>
      <div className='flex overflow-hidden rounded-4 border border-stroke-border-gray-default'>
        {VIDEO_FORMAT_OPTIONS.map(({ value: v, label }) => {
          const isSelected = v === value
          return (
            <button
              key={v}
              type='button'
              onClick={() => onChange(v)}
              className={cn(
                'cursor-pointer px-20 py-12 text-noto-label-md-normal transition-colors',
                isSelected
                  ? 'bg-brand-secondary text-white'
                  : 'bg-white text-text-and-icon-secondary hover:bg-background-gray-default'
              )}>
              {label}
            </button>
          )
        })}
      </div>
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
    <div className='flex min-w-[40rem] flex-1 flex-col gap-12'>
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
