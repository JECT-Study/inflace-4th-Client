import { useState } from 'react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import type { YoutubeCategory } from '@/entities/youtubeCategory'

type CategoryNamesDropdownProps = {
  categories: YoutubeCategory[]
  defaultValue?: number[]
  onChange: (output: string, categoryIds: number[]) => void
}

function CategoryNamesDropdown({
  categories,
  defaultValue = [],
  onChange,
}: CategoryNamesDropdownProps) {
  const [selected, setSelected] = useState<number[]>(defaultValue)

  /* 최대 3개까지만 선택 가능 */
  function toggleOption(value: number) {
    setSelected((prev) => {
      if (prev.includes(value)) return prev.filter((v) => v !== value)
      if (prev.length >= 3) return prev
      return [...prev, value]
    })
  }

  function handleConfirm() {
    const selectedLabels = categories
      .filter((o) => selected.includes(o.id))
      .map((o) => o.title)

    const output =
      selectedLabels.length === 0
        ? '전체'
        : selectedLabels.length === 1
          ? selectedLabels[0]
          : `${selectedLabels[0]} 외 ${selectedLabels.length - 1}`

    onChange(output, selected)
  }

  return (
    <div className='flex h-fit w-[38rem] flex-col rounded-6 bg-white p-16 shadow-[0px_8px_12px_0px_var(--primitivecolortrasparent-brand-deep-900-transparent-16),0px_4px_6px_0px_var(--primitivecolortrasparent-brand-deep-900-transparent-24)]'>
      <ul className='grid grid-cols-2 gap-2'>
        {categories.map((option) => {
          const isSelected = selected.includes(option.id)
          return (
            <li key={option.id}>
              <button
                onClick={() => toggleOption(option.id)}
                className={cn(
                  'flex h-fit w-full items-center gap-10 rounded-6 p-16 text-noto-label-md-normal text-text-and-icon-secondary',
                  isSelected &&
                    'bg-btn-secondary-outlined-hover text-text-and-icon-default'
                )}>
                {option.title}
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

export { CategoryNamesDropdown }
