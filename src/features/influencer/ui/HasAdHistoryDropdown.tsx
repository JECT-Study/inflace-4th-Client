import { cn } from '@/shared/lib/utils'

/* label: 화면 랜더링용, value: 쿼리값 */
const HAS_AD_HISTORY_OPTIONS: { label: string; value: string }[] = [
  { label: '있음', value: 'true' },
  { label: '없음', value: 'false' },
]

/* 광고 이력 드롭다운 */
type HasAdHistoryDropdownProps = {
  defaultValue?: string
  onChange: (output: string, outputQuery: string) => void
}

function HasAdHistoryDropdown({
  defaultValue = '',
  onChange,
}: HasAdHistoryDropdownProps) {
  function handleSelect(option: { label: string; value: string }) {
    onChange(option.label, option.value)
  }

  return (
    <div className='flex h-fit w-[18rem] flex-col rounded-6 bg-white p-16 shadow-[0px_8px_12px_0px_var(--primitivecolortrasparent-brand-deep-900-transparent-16),0px_4px_6px_0px_var(--primitivecolortrasparent-brand-deep-900-transparent-24)]'>
      <ul className='flex h-fit w-full flex-col gap-2'>
        {HAS_AD_HISTORY_OPTIONS.map((option) => {
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

export { HasAdHistoryDropdown }
