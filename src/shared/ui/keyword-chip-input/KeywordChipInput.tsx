'use client'

import { useState, useRef, type KeyboardEvent } from 'react'
import { toast } from 'sonner'
import { cn } from '@/shared/lib/utils'
import IconX from '@/shared/assets/round-x.svg'

type ChipVariant = 'primary' | 'secondary'

interface KeywordChipInputProps {
  chips: string[]
  onChange: (chips: string[]) => void
  placeholder?: string
  maxChips?: number
  className?: string
  variant?: ChipVariant
}

const chipStyles: Record<ChipVariant, { chip: string; icon: string }> = {
  primary: {
    chip: 'bg-background-brand-default text-brand-primary',
    icon: 'text-brand-primary',
  },
  secondary: {
    chip: 'bg-brand-secondary text-white',
    icon: 'text-white',
  },
}

const focusBorderByVariant: Record<ChipVariant, string> = {
  primary: 'has-[input:focus]:border-brand-primary',
  secondary: 'has-[input:focus]:border-brand-secondary',
}

export function KeywordChipInput({
  chips,
  onChange,
  placeholder = '키워드를 입력해주세요.',
  maxChips = 5,
  className,
  variant = 'primary',
}: KeywordChipInputProps) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const styles = chipStyles[variant]
  const isAddDisabled = input.trim().length === 0 || chips.length >= maxChips

  function addChip() {
    const trimmed = input.trim()
    if (!trimmed) return
    if (chips.includes(trimmed)) {
      toast.error('이미 추가된 키워드입니다.')
      return
    }
    if (chips.length >= maxChips) {
      toast.error(`키워드는 최대 ${maxChips}개까지 추가할 수 있습니다.`)
      return
    }
    onChange([...chips, trimmed])
    setInput('')
    inputRef.current?.focus()
  }

  function removeChip(target: string) {
    onChange(chips.filter((c) => c !== target))
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      addChip()
    }
  }

  return (
    <div className={cn('flex w-full flex-col gap-12', className)}>
      <div
        className={cn(
          'flex w-full items-center gap-24 rounded-6 border border-stroke-border-gray-stronger bg-white px-16 py-12',
          focusBorderByVariant[variant]
        )}>
        <input
          ref={inputRef}
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className='flex-1 text-noto-label-md-normal text-text-and-icon-primary outline-none placeholder:text-text-and-icon-disabled'
        />
        <button
          type='button'
          onClick={addChip}
          disabled={isAddDisabled}
          className={cn(
            'shrink-0 rounded-6 px-12 py-8 text-noto-label-sm-normal transition-colors',
            isAddDisabled
              ? 'cursor-not-allowed bg-btn-secondary-filled-disabled text-btn-secondary-text-disabled'
              : 'cursor-pointer bg-brand-secondary text-white hover:opacity-90'
          )}>
          추가
        </button>
      </div>

      {chips.length > 0 && (
        <div className='flex flex-wrap gap-12'>
          {chips.map((chip) => (
            <span
              key={chip}
              className={cn(
                'flex items-center gap-4 rounded-full px-16 py-6 text-noto-label-md-normal',
                styles.chip
              )}>
              {chip}
              <button
                type='button'
                onClick={() => removeChip(chip)}
                aria-label={`${chip} 제거`}
                className='flex cursor-pointer items-center'>
                <IconX className={cn('size-16', styles.icon)} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
