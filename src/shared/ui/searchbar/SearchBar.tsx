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
  onClear,
  ...props
}: InputProps) {
  return (
    <div className='flex h-fit w-[58rem] items-center gap-16 rounded-16 border border-transparent bg-background-gray-stronger px-16 py-12 has-[input:focus]:border has-[input:focus]:border-brand-primary has-[input:focus]:bg-white'>
      <IconSearch className='size-24 text-text-and-icon-primary' />
      <Input
        type={type}
        data-slot='input'
        value={value}
        onChange={onChange}
        className={cn(
          'h-20 w-127 text-noto-body-xs-normal text-text-and-icon-secondary transition-colors outline-none focus:text-text-and-icon-primary',
          className
        )}
        {...props}
      />
      {value && (
        <button type='button' onClick={onClear}>
          <IconX className='size-20' />
        </button>
      )}
    </div>
  )
}
