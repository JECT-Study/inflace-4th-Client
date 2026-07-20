import { useState } from 'react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { UPLOAD_PERIOD_OPTIONS } from '../model/filterOptions'

/* 업로드 주기 드롭다운 */
type UploadPeriodDropdownProps = {
  defaultValue?: string[]
  onChange: (output: string, values: string[]) => void
}

function UploadPeriodDropdown({
  defaultValue = [],
  onChange,
}: UploadPeriodDropdownProps) {
  const [selected, setSelected] = useState<string[]>(defaultValue)

  function toggleOption(value: string) {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  /* 완료 버튼 클릭 시 DropdownTrigger로 값 반환 */
  function handleConfirm() {
    const selectedLabels = UPLOAD_PERIOD_OPTIONS.filter((o) =>
      selected.includes(o.value)
    ).map((o) => o.label)

    const output =
      selectedLabels.length === 0
        ? '전체'
        : selectedLabels.length === 1
          ? selectedLabels[0]
          : `${selectedLabels[0]} 외 ${selectedLabels.length - 1}`

    onChange(output, selected)
  }

  return (
    <div className='flex h-fit w-[22.8rem] flex-col rounded-6 bg-white p-16 shadow-[0px_8px_12px_0px_var(--primitivecolortrasparent-brand-deep-900-transparent-16),0px_4px_6px_0px_var(--primitivecolortrasparent-brand-deep-900-transparent-24)]'>
      {/* 정렬 조건 */}
      <ul className='flex h-fit w-full flex-col gap-2'>
        {UPLOAD_PERIOD_OPTIONS.map((option) => {
          const isSelected = selected.includes(option.value)
          return (
            <li key={option.value}>
              <button
                type='button'
                onClick={() => toggleOption(option.value)}
                className={cn(
                  'flex h-fit w-full cursor-pointer items-center gap-10 rounded-6 p-16 text-noto-label-md-normal text-text-and-icon-secondary',
                  isSelected &&
                    'bg-btn-secondary-outlined-hover text-text-and-icon-default'
                )}>
                {option.label}
              </button>
            </li>
          )
        })}
      </ul>

      <div className='flex justify-end'>
        <Button
          color='secondary'
          variant='filled'
          size='sm'
          disabled={
            selected.length === defaultValue.length &&
            selected.every((v) => defaultValue.includes(v))
          }
          onClick={handleConfirm}>
          완료
        </Button>
      </div>
    </div>
  )
}

export { UploadPeriodDropdown }
