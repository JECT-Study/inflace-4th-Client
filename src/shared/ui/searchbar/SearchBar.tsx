import { useState } from 'react'
import { Input } from '@base-ui/react/input'
import IconSearch from '@/shared/assets/search-bold.svg?react'
import IconX from '@/shared/assets/round-x.svg'
import { cn } from '@/shared/lib/utils'
import type { InputProps } from './types'

export function SearchBar({
  className,
  type,
  value,
  onChange,
  ...props
}: InputProps) {
  /* x 버튼을 누르면 검색바에 있는 값 제거 */
  const [inputValue, setInputValue] = useState(value ?? '')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    onChange?.(e)
  }

  const handleClear = () => {
    setInputValue('')
  }

  return (
    <div className='flex h-fit w-140 items-center gap-16 rounded-16 border border-transparent bg-background-gray-stronger px-16 py-12 has-[input:focus]:border has-[input:focus]:border-brand-primary has-[input:focus]:bg-white'>
      <IconSearch className='size-24 text-text-and-icon-primary' />
      <Input
        type={type}
        data-slot='input'
        value={inputValue}
        onChange={handleChange}
        className={cn(
          'h-20 w-127 text-noto-body-xs-normal text-text-and-icon-secondary transition-colors outline-none focus:text-text-and-icon-primary',
          className
        )}
        {...props}
      />
      {inputValue && (
        <button type='button' onClick={handleClear}>
          <IconX className='size-20' />
        </button>
      )}
    </div>
  )
}
