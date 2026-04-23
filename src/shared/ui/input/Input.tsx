import { Input as InputPrimitive } from '@base-ui/react/input'
import IconSearch from '@/shared/assets/search-bold.svg?react'
import { cn } from '@/shared/lib/utils'
import type { InputProps } from './types'

function Input({ className, type, ...props }: InputProps) {
  return (
    <div className='relative w-full'>
      <IconSearch className='absolute top-1/2 left-16 size-24 -translate-y-1/2 text-text-and-icon-disabled [&_path]:fill-text-and-icon-default' />
      <InputPrimitive
        type={type}
        data-slot='input'
        className={cn(
          'w-full min-w-[48rem] rounded-full border border-stroke-border-gray-default bg-transparent py-12 pr-16 pl-56 text-base text-body-xs leading-body-xs text-text-and-icon-default shadow-[0_2px_4px_0_rgba(0,0,0,0.04)] transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-and-icon-disabled focus-visible:border-brand-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
          className
        )}
        {...props}
      />
    </div>
  )
}

export { Input }
