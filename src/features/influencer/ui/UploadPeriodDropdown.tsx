import { useState } from 'react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

/* label: 화면 랜더링용, value: 쿼리값 */
const UPLOAD_PERIOD_OPTIONS: { label: string; value: string }[] = [
  { label: '1주일 미만', value: '7D' },
  { label: '1주일 ~ 1개월', value: '30D' },
  { label: '1개월 ~ 3개월', value: '31_90D' },
  { label: '3개월 ~ 6개월', value: '91_180D' },
  { label: '6개월 이상', value: '180D_PLUS' },
]

/* 업로드 주기 드롭다운 */
type UploadPeriodDropdownProps = {
  defaultValue?: string[]
  onChange: (output: string, outputQuery: string) => void
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

    onChange(output, selected.join(','))
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
                onClick={() => toggleOption(option.value)}
                className={cn(
                  'flex h-fit w-full items-center gap-10 rounded-6 p-16 text-noto-label-md-normal text-text-and-icon-secondary',
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
          disabled={selected.length === 0}
          onClick={handleConfirm}>
          완료
        </Button>
      </div>
    </div>
  )
}

export { UploadPeriodDropdown }
