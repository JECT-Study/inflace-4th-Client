import { useState } from 'react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

const ENGAGEMENT_RATE_OPTIONS: {
  label: string
  from: string
  to: string
}[] = [
  { label: '1% 미만', from: '', to: '1' },
  { label: '1% ~ 2%', from: '1', to: '2' },
  { label: '2% ~ 3%', from: '2', to: '3' },
  { label: '3% ~ 5%', from: '3', to: '5' },
  { label: '5% 이상', from: '5', to: '' },
]

type SelectedOption = { from: string; to: string }

type EngagementRateSelectQuery = { selectedOptions: SelectedOption[] }
type EngagementRateRangeQuery = { from: string; to: string }
type EngagementRateQuery = EngagementRateSelectQuery | EngagementRateRangeQuery

type EngagementRateDropdownProps = {
  defaultSelectedOptions?: SelectedOption[]
  defaultFrom?: string
  defaultTo?: string
  onChange: (output: string, query: EngagementRateQuery) => void
}

function EngagementRateDropdown({
  defaultSelectedOptions = [],
  defaultFrom = '',
  defaultTo = '',
  onChange,
}: EngagementRateDropdownProps) {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>(
    defaultSelectedOptions
  )
  const [from, setFrom] = useState(defaultFrom)
  const [to, setTo] = useState(defaultTo)

  const isInputMode = from !== '' || to !== ''
  const isSelectMode = selectedOptions.length > 0

  function toggleOption(option: SelectedOption) {
    /* 직접 입력 모드일 때 select 선택 불가 */
    if (isInputMode) return

    setSelectedOptions((prev) => {
      const exists = prev.some(
        (o) => o.from === option.from && o.to === option.to
      )
      return exists
        ? prev.filter((o) => !(o.from === option.from && o.to === option.to))
        : [...prev, option]
    })
  }

  function handleFromChange(value: string) {
    /* 직접 입력 시 select 선택 초기화 */
    if (selectedOptions.length > 0) setSelectedOptions([])
    setFrom(value)
  }

  function handleToChange(value: string) {
    if (selectedOptions.length > 0) setSelectedOptions([])
    setTo(value)
  }

  function handleConfirm() {
    if (isInputMode) {
      const output = from || to ? `${from || '0'}% ~ ${to || ''}%` : '전체'
      onChange(output, { from, to })
      return
    }

    const labels = ENGAGEMENT_RATE_OPTIONS.filter((o) =>
      selectedOptions.some((s) => s.from === o.from && s.to === o.to)
    ).map((o) => o.label)

    const output =
      labels.length === 0
        ? '전체'
        : labels.length === 1
          ? labels[0]
          : `${labels[0]} 외 ${labels.length - 1}`

    onChange(output, { selectedOptions })
  }

  const isMinMaxInvalid =
    isInputMode && from !== '' && to !== '' && Number(from) > Number(to)

  const isConfirmDisabled =
    (selectedOptions.length === 0 && !isInputMode) || isMinMaxInvalid

  return (
    <div className='flex h-fit w-[32rem] flex-col rounded-6 bg-white p-16 shadow-[0px_8px_12px_0px_var(--primitivecolortrasparent-brand-deep-900-transparent-16),0px_4px_6px_0px_var(--primitivecolortrasparent-brand-deep-900-transparent-24)]'>
      {/* 선택 옵션 */}
      <ul className='flex h-fit w-full flex-col gap-2'>
        {ENGAGEMENT_RATE_OPTIONS.map((option) => {
          const isSelected = selectedOptions.some(
            (s) => s.from === option.from && s.to === option.to
          )
          return (
            <li key={option.label}>
              <button
                onClick={() => toggleOption(option)}
                disabled={isInputMode}
                className={cn(
                  'flex h-fit w-full items-center gap-10 rounded-6 p-16 text-noto-label-md-normal text-text-and-icon-secondary',
                  isSelected &&
                    'bg-btn-secondary-outlined-hover text-text-and-icon-default',
                  isInputMode && 'cursor-not-allowed opacity-40'
                )}>
                {option.label}
              </button>
            </li>
          )
        })}
      </ul>

      {/* 직접 입력 */}
      <div className='mt-2 flex h-fit w-full flex-col gap-10 rounded-b-6 border-t border-stroke-border-gray-default bg-background-gray-default p-16'>
        <span className='text-noto-label-md-normal text-text-and-icon-disabled'>
          5% 이상
        </span>

        <div className='flex h-fit w-full items-center gap-10'>
          <div className='flex h-fit w-full items-center gap-4'>
            <input
              type='number'
              min={5}
              max={100}
              placeholder='min'
              value={from}
              disabled={isSelectMode}
              onChange={(e) => handleFromChange(e.target.value)}
              className='flex h-fit w-full flex-1 [appearance:textfield] items-center rounded-6 border bg-white px-16 py-12 text-noto-label-md-normal text-text-and-icon-secondary outline-none placeholder:text-text-and-icon-tertiary disabled:cursor-not-allowed disabled:opacity-40 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
            />
            <span className='text-noto-label-md-normal text-text-and-icon-secondary'>
              %
            </span>
          </div>

          <span className='text-noto-label-md-normal text-text-and-icon-secondary'>
            ~
          </span>

          <div className='flex h-fit w-full items-center gap-4'>
            <input
              type='number'
              min={5}
              max={100}
              placeholder='max'
              value={to}
              disabled={isSelectMode}
              onChange={(e) => handleToChange(e.target.value)}
              className='flex h-fit w-full flex-1 [appearance:textfield] items-center rounded-6 border bg-white px-16 py-12 text-noto-label-md-normal text-text-and-icon-secondary outline-none placeholder:text-text-and-icon-tertiary disabled:cursor-not-allowed disabled:opacity-40 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
            />
            <span className='text-noto-label-md-normal text-text-and-icon-secondary'>
              %
            </span>
          </div>
        </div>
      </div>

      <div className='mt-16 flex justify-end'>
        <Button
          color='secondary'
          variant='filled'
          size='sm'
          disabled={isConfirmDisabled}
          onClick={handleConfirm}>
          완료
        </Button>
      </div>
    </div>
  )
}

export { EngagementRateDropdown }
export type { EngagementRateQuery, EngagementRateSelectQuery, EngagementRateRangeQuery, SelectedOption }
