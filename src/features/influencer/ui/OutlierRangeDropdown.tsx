import { cn } from '@/shared/lib/utils'

/* label: 화면 랜더링용, value: 쿼리값 */
const OUTLIER_RANGE_OPTIONS: { label: string; value: string }[] = [
  { label: '1.0x', value: '1.0X' },
  { label: '1.5x', value: '1.5X' },
  { label: '2.0x', value: '2.0X' },
  { label: '3.0x', value: '3.0X' },
]

/* 이상값 범위 드롭다운 */
type OutlierRangeDropdownProps = {
  defaultValue?: string
  onChange: (output: string, outputQuery: string) => void
}

function OutlierRangeDropdown({
  defaultValue = '',
  onChange,
}: OutlierRangeDropdownProps) {
  function handleSelect(option: { label: string; value: string }) {
    onChange(option.label, option.value)
  }

  return (
    <div className='flex h-fit w-[18rem] flex-col rounded-6 bg-white p-16 shadow-[0px_8px_12px_0px_var(--primitivecolortrasparent-brand-deep-900-transparent-16),0px_4px_6px_0px_var(--primitivecolortrasparent-brand-deep-900-transparent-24)]'>
      <ul className='flex h-fit w-full flex-col gap-2'>
        {OUTLIER_RANGE_OPTIONS.map((option) => {
          const isSelected = defaultValue === option.value
          return (
            <li key={option.value}>
              <button
                onClick={() => handleSelect(option)}
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
    </div>
  )
}

export { OutlierRangeDropdown }
