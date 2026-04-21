'use client'

import * as React from 'react'
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
  type DateRange,
} from 'react-day-picker'
import { subMonths } from 'date-fns'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/shadcn/button'
import { Button as ConfirmButton } from '@/shared/ui/button'
import { Toggle } from '@/shared/ui/toggle'
import IconLeftArrow from './assets/leftwards-triangle-bold.svg?react'
import IconRightArrow from './assets/rightwards-triangle-bold.svg?react'

function formatDate(date: Date) {
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
}

function CalendarRangePicker({ label = '기간' }: { label?: string }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    undefined
  )
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

  const rangeText =
    dateRange?.from && dateRange?.to
      ? `${formatDate(dateRange.from)} ~ ${formatDate(dateRange.to)}`
      : dateRange?.from
        ? formatDate(dateRange.from)
        : null

  function handleToggleClick() {
    if (dateRange) {
      setDateRange(undefined)
      setIsOpen(false)
    } else {
      setIsOpen((prev) => !prev)
    }
  }

  const baseMonth = dateRange?.from
    ? subMonths(dateRange.from, 1)
    : subMonths(new Date(), 1)

  return (
    <div ref={containerRef} className='relative'>
      <Toggle pressed={!!dateRange} onClick={handleToggleClick}>
        {rangeText ?? label}
      </Toggle>

      {isOpen && (
        <div className='absolute top-full right-0 z-50 mt-8 overflow-hidden rounded-16 border border-sidebar-border bg-white shadow-lg'>
          <Calendar
            mode='range'
            defaultMonth={baseMonth}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            disabled={(date) =>
              date > new Date() || date < new Date('1900-01-01')
            }
            onConfirm={() => setIsOpen(false)}
            confirmDisabled={!dateRange}
          />
        </div>
      )}
    </div>
  )
}

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  captionLayout = 'label',
  locale,
  formatters,
  components,
  onConfirm,
  confirmDisabled,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  onConfirm?: () => void
  confirmDisabled?: boolean
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'group/calendar bg-background p-24 pb-72 [--cell-radius:var(--radius-16)] [--cell-size:--spacing(6)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatCaption: (date) => {
          const year = date.getFullYear()
          const month = String(date.getMonth() + 1).padStart(2, '0')
          return `${year}년 ${month}월`
        },
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, {
            month: 'short',
          }),
        formatWeekdayName: (date) =>
          date.toLocaleString('ko-KR', { weekday: 'short' }),

        ...formatters,
      }}
      classNames={{
        root: cn('relative w-fit', defaultClassNames.root),
        months: cn(
          'relative flex flex-col gap-64 md:flex-row',
          defaultClassNames.months
        ),
        month: cn('flex w-full flex-col gap-y-[14px]', defaultClassNames.month),
        nav: cn(
          'absolute inset-x-0 top-0 flex size-4.5 w-full items-center justify-between pr-[54px] pl-[54px] after:absolute after:top-0 after:left-[50%] after:text-sm after:content-["~"]',
          defaultClassNames.nav
        ),

        button_previous: cn(
          'group/nav size-[18px] p-0 select-none aria-disabled:opacity-50',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          'group/nav size-[18px] p-0 select-none aria-disabled:opacity-50',
          defaultClassNames.button_next
        ),
        month_caption: cn(
          'flex h-20 w-full items-center justify-center px-(--cell-size) text-(length:--text-label-sm) leading-label-sm',
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          'flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-(length:--text-label-sm) font-medium',
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          'relative rounded-(--cell-radius)',
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          'absolute inset-0 bg-popover opacity-0',
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          'leading-body-xxs font-medium text-text-and-icon-default select-none',
          captionLayout === 'label'
            ? 'text-(length:--text-label-sm)'
            : 'flex items-center gap-1 rounded-(--cell-radius) text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground',
          defaultClassNames.caption_label
        ),
        table: 'w-full border-collapse ',
        // weekdays: cn('flex', defaultClassNames.weekdays), // 요일
        weekdays: cn('hidden', defaultClassNames.weekdays), // 요일 hidden
        weekday: cn(
          'flex-1 rounded-(--cell-radius) text-[0.8rem] font-normal text-muted-foreground select-none',
          defaultClassNames.weekday
        ),
        week: cn('mt-6 flex size-28 w-full gap-6', defaultClassNames.week),
        week_number_header: cn(
          'w-(--cell-size) select-none',
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          'gap-6 text-[0.8rem] text-muted-foreground select-none',
          defaultClassNames.week_number
        ),
        day: cn(
          'group/day relative aspect-square h-full w-full cursor-pointer! rounded-(--cell-radius) p-0 text-center [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)',
          defaultClassNames.day
        ),
        range_start: cn(
          'relative isolate z-0 rounded-l-(--cell-radius) after:absolute after:inset-y-0 after:right-0 after:w-4',
          defaultClassNames.range_start
        ),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn(
          'relative isolate z-0 rounded-r-(--cell-radius) after:absolute after:inset-y-0 after:left-0 after:w-4',
          defaultClassNames.range_end
        ),
        today: cn(
          'rounded-(--cell-radius) text-foreground data-[selected=true]:rounded-none',
          defaultClassNames.today
        ),
        outside: cn(
          'text-muted-foreground aria-selected:text-muted-foreground',
          defaultClassNames.outside
        ),
        disabled: cn(
          'text-muted-foreground opacity-50',
          defaultClassNames.disabled
        ),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, children, ...props }) => {
          return (
            <div
              data-slot='calendar'
              ref={rootRef}
              className={cn(className)}
              {...props}>
              {children}
              {onConfirm && (
                <div className='absolute right-0 bottom-0 left-0 flex justify-end px-24 pb-24'>
                  <ConfirmButton
                    variant={'filled'}
                    color='secondary'
                    size={'xs'}
                    disabled={confirmDisabled}
                    onClick={onConfirm}>
                    완료
                  </ConfirmButton>
                </div>
              )}
            </div>
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return (
              <IconLeftArrow
                className={cn(
                  'size-4.5 gap-0 group-hover/nav:text-brand-secondary',
                  className
                )}
                {...props}
              />
            )
          }

          if (orientation === 'right') {
            return (
              <IconRightArrow
                className={cn(
                  'size-4.5 group-hover/nav:text-brand-secondary',
                  className
                )}
                {...props}
              />
            )
          }

          return <span></span>
        },

        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className='flex size-(--cell-size) items-center justify-center text-center'>
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant='ghost'
      size='icon'
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) cursor-pointer! flex-col rounded-full! border-0 text-(length:--text-label-sm) leading-none font-normal text-text-and-icon-secondary! group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 not-data-[selected-single=true]:not-data-[range-start=true]:not-data-[range-end=true]:not-data-[range-middle=true]:hover:bg-(--comp-button-secondary-outlined-outlined-hover)! not-data-[selected-single=true]:not-data-[range-start=true]:not-data-[range-end=true]:not-data-[range-middle=true]:hover:text-brand-secondary data-[range-end=true]:bg-brand-secondary data-[range-end=true]:text-white! data-[range-start=true]:bg-brand-secondary data-[range-start=true]:text-white! data-[selected-single=true]:bg-primary dark:hover:text-foreground [&>span]:text-(length:--text-label-sm) [&>span]:opacity-70',
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton, CalendarRangePicker }
